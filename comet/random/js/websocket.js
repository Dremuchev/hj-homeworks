'use strict';
const socket = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
socket.addEventListener('message', event => {
    const flipIt = document.querySelector('.websocket .flip-it');
    if (flipIt) {
        flipIt.classList.remove('flip-it');
    }
    document.querySelector('.websocket').children[parseInt(event.data)].classList.add('flip-it');
})