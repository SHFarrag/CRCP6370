// script.js
require('dotenv').config(); // Load environment variables from .env file

document.getElementById('send-button').addEventListener('click', sendMessage);

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    appendMessage('user', userInput);

    const apiKey = process.env.API_KEY;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-0125',
                messages: [{ role: 'user', content: userInput }],
                max_tokens: 150,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error:', errorText);
            appendMessage('bot', 'Sorry, something went wrong: ' + response.statusText);
        } else {
            const data = await response.json();
            const botReply = data.choices[0].message.content.trim();
            appendMessage('bot', botReply);
        }
    } catch (error) {
        console.error('Error:', error);
        appendMessage('bot', 'Sorry, there was an issue with the network or server.');
    }

    document.getElementById('user-input').value = '';
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
