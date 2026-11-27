from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

RESPONSES = {
    "greeting": {
        "keywords": ["hello", "hi", "hey", "good morning", "good evening"],
        "replies": [
            "Hello! How can I help you today?",
            "Hi there! What would you like to talk about?",
            "Hey! I'm here to help."
        ]
    },
    "how_are_you": {
        "keywords": ["how are you", "how are things", "how do you feel"],
        "replies": [
            "I'm doing well, thanks for asking!",
            "I'm ready to help. How are you?"
        ]
    },
    "name": {
        "keywords": ["your name", "who are you", "what are you"],
        "replies": [
            "I'm RuleBot, a simple rule-based chatbot built with Python."
        ]
    },
    "help": {
        "keywords": ["help", "assist", "support"],
        "replies": [
            "Of course! You can ask me about my name, say hello, or ask how I'm doing."
        ]
    },
    "creator": {
        "keywords": ["who made you", "your creator", "created you"],
        "replies": [
            "I was created using Python, Flask, HTML, CSS and JavaScript."
        ]
    },
    "thanks": {
        "keywords": ["thank you", "thanks", "thx"],
        "replies": [
            "You're welcome!",
            "Happy to help!"
        ]
    },
    "time": {
        "keywords": ["time", "current time"],
        "replies": [
            "I can't read your device clock yet, but you can check the time on your device."
        ]
    },
    "goodbye": {
        "keywords": ["bye", "goodbye", "see you"],
        "replies": [
            "Goodbye! Have a great day.",
            "See you soon. Take care!"
        ]
    }
}


def get_bot_response(message):
    """Return a response based on the first matching predefined rule."""
    cleaned_message = message.lower().strip()

    if not cleaned_message:
        return "Please type a message so I can respond."

    # Check each rule's keywords against the user's message.
    for rule in RESPONSES.values():
        if any(keyword in cleaned_message for keyword in rule["keywords"]):
            return random.choice(rule["replies"])

    # Fallback when no predefined keyword is found.
    return "I'm not sure I understand. Try saying hello or asking for help."


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    message = data.get("message", "")

    if not isinstance(message, str):
        return jsonify({"reply": "Please send a text message."}), 400

    return jsonify({"reply": get_bot_response(message)})


if __name__ == "__main__":
    app.run(debug=True)
