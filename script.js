const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const chatContent = document.getElementById("chatContent");
const clearChatButton = document.getElementById("clearChat");
const sendButton = chatForm.querySelector("button");
const initialMessage = "Hey there! I'm RuleBot. I respond to messages using predefined rules. What would you like to ask?";

function scrollToBottom() {
    chatContent.scrollTop = chatContent.scrollHeight;
}

function addMessage(text, sender) {
    const row = document.createElement("div");
    row.className = `message-row ${sender === "user" ? "user-row" : "bot-row"}`;

    if (sender === "bot") {
        const avatar = document.createElement("div");
        avatar.className = "message-avatar";
        avatar.textContent = "R";
        row.appendChild(avatar);
    }

    const stack = document.createElement("div");
    stack.className = "message-stack";

    const label = document.createElement("span");
    label.className = "sender";
    label.textContent = sender === "user" ? "YOU" : "RULEBOT";

    const time = document.createElement("time");
    time.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    label.appendChild(time);

    const bubble = document.createElement("div");
    bubble.className = `message ${sender === "user" ? "user-message" : "bot-message"}`;
    // textContent keeps user messages as plain text instead of interpreting HTML.
    bubble.textContent = text;

    stack.append(label, bubble);
    row.appendChild(stack);
    chatContent.appendChild(row);
    scrollToBottom();
    return row;
}

function showTypingIndicator() {
    const row = document.createElement("div");
    row.className = "message-row bot-row";
    row.id = "typingIndicator";

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = "R";

    const bubble = document.createElement("div");
    bubble.className = "message bot-message typing";
    bubble.innerHTML = "<i></i><i></i><i></i>";
    row.append(avatar, bubble);
    chatContent.appendChild(row);
    scrollToBottom();
}

async function sendMessage(message) {
    const cleanMessage = message.trim();
    if (!cleanMessage) return;

    document.getElementById("suggestions")?.remove();
    addMessage(cleanMessage, "user");
    messageInput.value = "";
    sendButton.disabled = true;
    showTypingIndicator();

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: cleanMessage })
        });

        const data = await response.json();
        document.getElementById("typingIndicator")?.remove();

        if (!response.ok) {
            addMessage(data.reply || "Something went wrong. Please try again.", "bot");
        } else {
            addMessage(data.reply, "bot");
        }
    } catch (error) {
        document.getElementById("typingIndicator")?.remove();
        addMessage("I couldn't connect to the server. Please make sure the Flask app is running.", "bot");
    } finally {
        sendButton.disabled = false;
        messageInput.focus();
    }
}

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage(messageInput.value);
});

document.querySelectorAll(".suggestion-list button").forEach((button) => {
    button.addEventListener("click", () => sendMessage(button.dataset.message));
});

clearChatButton.addEventListener("click", () => {
    chatContent.innerHTML = `
        <div class="date-label"><span>YOUR CONVERSATION</span></div>
        <div class="message-row bot-row">
            <div class="message-avatar">R</div>
            <div class="message-stack">
                <span class="sender">RULEBOT <time>NOW</time></span>
                <div class="message bot-message"></div>
            </div>
        </div>
        <div class="suggestions" id="suggestions">
            <span>TRY ASKING</span>
            <div class="suggestion-list">
                <button type="button" data-message="Hello!">Say hello</button>
                <button type="button" data-message="What is your name?">Your name</button>
                <button type="button" data-message="Can you help me?">Ask for help</button>
            </div>
        </div>`;
    chatContent.querySelector(".bot-message").textContent = initialMessage;
    chatContent.querySelectorAll(".suggestion-list button").forEach((button) => {
        button.addEventListener("click", () => sendMessage(button.dataset.message));
    });
    messageInput.focus();
});
