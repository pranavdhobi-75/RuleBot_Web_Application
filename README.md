# RuleBot — Rule-Based Chatbot Web App

A simple web chatbot built with Python, Flask, HTML, CSS and JavaScript. It matches user messages against predefined keywords and returns a corresponding response. If no rule matches, it returns a fallback message.

## Features
- Responsive chat interface
- Python keyword and rule matching
- Multiple predefined responses
- Fallback response for unknown messages
- Typing indicator and clear-chat control

## Requirements
- Python 3.9 or newer
- pip

## Run locally

1. Extract the project ZIP and open the project folder in a terminal.
2. (Recommended) Create and activate a virtual environment:

   **Windows**
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

   **macOS / Linux**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install Flask:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the app:

   ```bash
   python app.py
   ```

5. Open this address in your browser:

   `http://127.0.0.1:5000`

## How it works
1. The browser sends the user's message to the Flask `/chat` endpoint.
2. Python converts the message to lowercase and checks it against predefined keyword groups.
3. The first matching rule returns one of its predefined responses.
4. If no keyword matches, the chatbot returns a fallback response.
5. JavaScript displays the response in the chat window.

## Project structure

```text
rule_based_chatbot_web/
├── app.py
├── requirements.txt
├── README.md
├── templates/
│   └── index.html
└── static/
    ├── style.css
    └── script.js
```

## Note
This is a rule-based chatbot, not a machine-learning model. It does not train or learn from conversations. The Flask development server is intended for local development, not production deployment.
