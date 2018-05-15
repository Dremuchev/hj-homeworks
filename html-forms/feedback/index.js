'use strict';
const form = document.querySelector('.contentform');

const inputs = document.querySelectorAll('input');
for(let input of inputs) {
    if (input.name === 'zip') {
        input.type = "number";
    }
    input.addEventListener('change', validateForm);
}

const textArea = document.querySelector('textarea');
textArea.addEventListener('input', validateMessage);

const main = document.querySelector('#output');

const submit = document.querySelectorAll('.button-contact');
submit[0].addEventListener('click', toMain);
submit[1].addEventListener('click', toForm);

let counter = 0;
function validateForm() {
    if (counter < inputs.length) {
        if (this.value !== "") {
            counter++;
            validateMessage();
        }
        console.log(this.name !== 'email' && this.name !== 'phone', this.name);
        if (this.name !== 'email' && this.name !== 'phone') {
            document.querySelector(`#${this.name}`).innerHTML = this.value;
        }
    }
}
function validateMessage() {
    if(textArea.value !== "") {
        submit[0].disabled = false;
        if(this.name !== 'email' && this.name !== 'phone') {
            console.log('messageToOutput');
            document.querySelector(`#${this.name}`).innerHTML = this.value;
        }
    }
}

function toForm() {
    form.classList.remove('hidden');
    main.classList.add('hidden');
}

function toMain(event) {
    event.preventDefault();
    form.classList.add('hidden');
    main.classList.remove('hidden');
}
