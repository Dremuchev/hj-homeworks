'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');
const counter =document.getElementsByClassName('counter')[0];
const errors = document.getElementsByClassName('errors')[0];
connection.addEventListener('open', () => {
    connection.send(JSON.stringify({connections: '', errors: ''}));
})
connection.addEventListener('message', event => {
    const result = JSON.parse(event.data);
    counter.innerText = result.connections;
    errors.innerText = result.errors;
})
window.addEventListener('beforeunload', () => {
    connection.close(1000, 'Connection closed!');
});