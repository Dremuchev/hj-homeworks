'use strict';
let counter = 0;
const counterInfo = document.getElementById('counter');
window.addEventListener('load', () => {
    counterInfo.innerText = (!localStorage.getItem('counter')) ? counter : localStorage.getItem('counter');
    counter = (!localStorage.getItem('counter')) ? 0 : parseInt(localStorage.getItem('counter'));
});
document.getElementsByClassName('wrap-btns')[0].addEventListener('click', changeCounter);
function changeCounter(event) {
    switch(event.target.id) {
        case 'increment':
            counter++;
            break;
        case 'decrement':
            counter--;
            break;
        case 'reset':
            localStorage.clear();
            counter = 0;
            break;
    }
    counterInfo.innerText = counter;
    localStorage.counter = counter;
}