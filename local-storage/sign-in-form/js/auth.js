'use strict';
const xhr = new XMLHttpRequest();
const signIn = document.querySelector('.sign-in-htm');
signIn.addEventListener('click', loginIn);
const check = document.getElementById('check');
const outputIn = signIn.querySelector('.error-message');
check.addEventListener('click', () => {
    if(checkboxToggle()) {
    localStorage.clear();
    outputIn.innerText = '';
    check.value = 0;
    checkboxToggle();
} else {
    check.value = 1;
    checkboxToggle();
}
})
const inputs = signIn.querySelectorAll('.input');
for(let input of inputs) {
    input.addEventListener('change', inputHandler);
}
checkboxToggle();
function inputHandler() {
    if(parseInt(check.value) === 1) {
        localStorage[this.name] = this.value;
    }
}
function checkboxToggle() {
    check.checked = (parseInt(check.value) === 1) ? true : false;
    if (check.checked) {
        signIn.email.value = (localStorage.email) ? localStorage.email : '';
        signIn.password.value = (localStorage.password) ? localStorage.password : '';
        return true;
    } else {
        signIn.email.value = '';
        signIn.password.value = '';
        return false;
    }
}
function loginIn(event) {
    outputIn.innerText = '';
    if (event.target.classList.contains('button')) {
        event.preventDefault();
        xhr.addEventListener('load', (event) => {
            if (200 <= xhr.status && xhr.status < 300) {
                outputIn.innerText = JSON.parse(xhr.responseText).message;
            }
            checkboxToggle();
        })
        const loginForm = new FormData(signIn);
        if (loginForm.get('email') !== '' && loginForm.get('password') !== '') {
            xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
            xhr.send(loginForm);
        } else {
            outputIn.innerText = 'Заполните поля!'
            return;
        }
    }
}
const signUp = document.querySelector('.sign-up-htm');
const outputUP = signUp.querySelector('.error-message');
signUp.addEventListener('click', loginUp);
function loginUp(event) {
    outputUP.innerText = '';
    if(event.target.classList.contains('button')) {
        event.preventDefault();
        event.stopPropagation();
        xhr.addEventListener('load', (event) => {
            if (200 <= xhr.status && xhr.status < 300) {
            outputUP.innerText = JSON.parse(xhr.responseText).message;
        } else {
            outputUP.innerText = 'Произошла ошибка! Повторите процедуру позднее... Приносим свои извенения!';
            throw new Error('Ошибка: ' + xhr.status + ' : ' + xhr.statusText);
        }
    });
        const signUpForm = new FormData(signUp);
        const newUser = {};
        for (const [key, value] of signUpForm) {
            newUser[key] = value;
        }
        const str = JSON.stringify(newUser);
        xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(str);
    }
}
