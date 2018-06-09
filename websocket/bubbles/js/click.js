'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

window.addEventListener('beforeunload', () => {
    connection.onclose = function () {};
    connection.close()
});

showBubbles(connection);

document.addEventListener('click', event => {
    const cords = {};
    cords.x = event.pageX;
    cords.y = event.pageY;
    connection.send(JSON.stringify(cords));
});