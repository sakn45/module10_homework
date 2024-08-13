document.addEventListener("DOMContentLoaded", () => {
    const wsUrl = 'wss://echo-ws-service.herokuapp.com';
    const socket = new WebSocket(wsUrl);

    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const geoButton = document.getElementById('geo-button');

    socket.onmessage = (event) => {
        if (!event.data.startsWith('Моя локация')) {
            addMessageToChatBox(`Сервер: ${event.data}`);
        }
    };

    sendButton.addEventListener('click', () => {
        const message = messageInput.value;
        if (message) {
            socket.send(message);
            addMessageToChatBox(`Вы: ${message}`);
            messageInput.value = '';
        }
    });

    geoButton.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                const geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
                addMessageToChatBox(`Ваша локация: <a href="${geoLink}" target="_blank">OpenStreetMap</a>`);
                socket.send(`Моя локация: ${geoLink}`);
            }, () => {
                addMessageToChatBox('Не удалось получить вашу локацию.');
            });
        } else {
            addMessageToChatBox('Геолокация не поддерживается вашим браузером.');
        }
    });

    function addMessageToChatBox(message) {
        const messageElement = document.createElement('p');
        messageElement.innerHTML = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
