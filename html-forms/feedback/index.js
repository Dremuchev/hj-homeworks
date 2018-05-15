'use strict';
const form = document.querySelector('.contentform');

const inputs = document.querySelectorAll('input');
for(let input of inputs) {
    if (input.name === 'zip') {
        input.type = "number";
    }
    input.addEventListener('change', validateForm);
    input.addEventListener('input', checkCounter);
    input.addEventListener('focus', checkCounter);
}

const textArea = document.querySelector('textarea');
textArea.addEventListener('input', validateMessage);

const main = document.querySelector('#output');

const submit = document.querySelectorAll('.button-contact');
submit[0].addEventListener('click', (e) => {
    form.classList.add('hidden');
    main.classList.remove('hidden');
    e.preventDefault();
})
submit[1].addEventListener('click', (e) => {
    form.classList.remove('hidden');
    main.classList.add('hidden');
    e.preventDefault();
})

let counter = 0;
function validateForm() {
    if (counter <= inputs.length) {
        if (this.value !== "") {
            if(counter !== inputs.length) {
                counter++;
            }
        }
        if (this.name !== 'email' && this.name !== 'phone') {
            document.querySelector(`#${this.name}`).innerHTML = this.value;
        }
        console.log(counter)
        checkCounter.call(this);
    }
    if (this.value === '') {
        counter--;
        checkCounter.call(this);
    }
}
function checkCounter() {
    if(counter >= inputs.length - 1 &&  this.value !== '') {
        if(textArea.value !== "") {
            submit[0].disabled = false;
        }
    } else {
        submit[0].disabled = true;
    }
}
function validateMessage() {
    if(textArea.value !== "") {
        if(this.name !== 'email' && this.name !== 'phone') {
            document.querySelector(`#${this.name}`).innerHTML = this.value;
        }
    }
    if(counter >= inputs.length - 1) {
        submit[0].disabled = false;
    }
    checkCounter.call(this);
}