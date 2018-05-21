'use strict';
let counter= 0;
const counterInfo = document.getElementById('counter');
window.addEventListener('load', () => {
    counterInfo.innerText = localStorage.getItem('counter');
    counter = parseInt(localStorage.getItem('counter'));
});
document.addEventListener('click', changeCounter);
function changeCounter(event) {
    switch(event.target.id) {
        case 'increment':
            counter++;
            counterInfo.innerText = counter;
            localStorage.counter = counter;
            break;
        case 'decrement':
            counter--;
            counterInfo.innerText = counter;
            localStorage.counter = counter;
            break;
        case 'reset':
            localStorage.clear();
            counter = 0;
            localStorage.counter = counter;
            counterInfo.innerText = counter;
            break;
    }
}

