'use strict';
const inputs = document.querySelectorAll('input');
const done = document.querySelector('.done');
const undone = document.querySelector('.undone');
for (let input of inputs) {
    input.addEventListener('click', toggleCheckbox);
}
function toggleCheckbox() {
    if(this.checked) {
        done.appendChild(this.parentElement);
    } else {
        undone.appendChild(this.parentElement);
    }
}