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
submit[0].addEventListener('click', () => {
    form.classList.add('hidden');
    main.classList.remove('hidden');
    console.log(form.classList.contains('hidden'));
    console.log(event)
})
submit[1].addEventListener('click', () => {
    form.classList.remove('hidden');
    main.classList.add('hidden');
console.log(form.classList.contains('hidden'));
})

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
// function toggleForm() {
//     if(form.classList.contains('hidden')) {
//         form.classList.remove('hidden');
//         main.classList.add('hidden');
//         console.log('activate FORM!');
//     } else {
//         form.classList.add('hidden');
//         main.classList.remove('hidden');
//         console.log('activate OUTPUT!');
//     }
// }