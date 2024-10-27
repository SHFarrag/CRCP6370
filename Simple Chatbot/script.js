document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevents a new line in the input box
        sendMessage();
    }
});

async function sendMessage() {
    const userInput = document.getElementById('user-input').value.toLowerCase();
    appendMessage('user', userInput);

    const apiKey = 'YOUR_OPENAI_API_KEY_HERE'; // Replace with your actual API key.

    let botReply;

    if (userInput.includes("period") || userInput.includes("menstruation")) {
        botReply = "Periods are a natural part of growing up! You can feel more comfortable by using pads, tampons, or period underwear and practicing good hygiene. It’s okay to feel tired or crampy—warm baths, gentle exercise, and plenty of water can help relieve discomfort. 💖";
    } else if (userInput.includes("acne") || userInput.includes("pimples")) {
        botReply = "Acne is common during puberty. Keeping your skin clean and avoiding picking at pimples can help. Try using a gentle face wash once or twice a day and drinking lots of water. If acne bothers you a lot, you could talk to a doctor for extra tips!";
    } else if (userInput.includes("body changes") || userInput.includes("breasts") || userInput.includes("growth")) {
        botReply = "Your body changes in many ways during puberty, like breast development and growth spurts. It's all normal, and everyone grows at their own pace. 🌸";
    } else if (userInput.includes("mood swings") || userInput.includes("emotions")) {
        botReply = "Mood swings can happen due to changing hormones during puberty. Talking to someone about your feelings, journaling, or practicing relaxation exercises like deep breathing can help.";
    } else if (userInput.includes("self-care") || userInput.includes("relax") || userInput.includes("well-being")) {
        botReply = "Self-care is super important! Taking time to relax, eat well, and do activities you enjoy can keep you feeling good. 🌻";
    } else if (userInput.includes("hygiene") || userInput.includes("clean") || userInput.includes("washing")) {
        botReply = "Keeping up with hygiene during puberty is helpful! Washing daily, especially areas that sweat more, can keep you fresh. Remember to brush your teeth and wash your hands regularly!";
    } else {
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
                botReply = 'Sorry, something went wrong: ' + response.statusText;
            } else {
                const data = await response.json();
                botReply = data.choices[0].message.content.trim();
            }
        } catch (error) {
            botReply = 'Sorry, there was an issue with the network or server.';
        }
    }

    appendMessage('bot', botReply);
    document.getElementById('user-input').value = '';
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
}
