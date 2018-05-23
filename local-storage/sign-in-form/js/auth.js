'use strict';
const xhr = new XMLHttpRequest();

const signIn = document.querySelector('.sign-in-htm');
signIn.querySelector('.check').checked = true;
signIn.addEventListener('click', loginIn);

function loginIn(event) {
    if (event.target.classList.contains('button')) {
        event.preventDefault();
        xhr.addEventListener('load', (event) => {
            console.log(loginForm.get('email'), loginForm.get('password'));
            signIn.querySelector('.error-message').innerText = JSON.parse(xhr.responseText).message;
            if(parseInt(signIn.querySelector('.check').value) === 0) {
                signIn.email.value = '';
                signIn.password.value = '';
            } else {
                signIn.email.value = localStorage.email;
                signIn.password.value = localStorage.password;
            }
            });
        const loginForm = new FormData(signIn);
        xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
        xhr.send(loginForm);

    } else if (event.target.classList.contains('check')) {
        let isChecked = parseInt(event.target.value);
        event.target.value = (isChecked === 1) ? 0 : 1;
        if (isChecked === 1) {
            localStorage.clear();
            signIn.querySelector('.error-message').innerText = '';
            event.target.value = 0;
            signIn.email.value = '';
            signIn.password.value = '';
        } else {
            event.target.value = 1;
            if (signIn.email.value !== '') {
                signIn.email.value = localStorage.email;
            }
            if (signIn.password.value = '') {
                signIn.password.value = localStorage.password;
            }
        }
    } else {
        event.target.addEventListener('change', (event) => {
            if(event.currentTarget.value !== '') {
                if(parseInt(signIn.querySelector('.check').value) === 1) {
                    localStorage[event.currentTarget.name] = event.currentTarget.value;
                } else {
                    localStorage.clear();
                }
            } else {
            localStorage.clear();
            event.currentTarget.value = '';
            }
            console.log(event.currentTarget.value);
        });
    }
}

const signUp = document.querySelector('.sign-up-htm');
const newUser = {};
var str;
signUp.addEventListener('click', loginUp);

function loginUp(event) {
    if(event.target.classList.contains('button')) {
        event.preventDefault();
        event.stopPropagation();
        xhr.addEventListener('load', (event) => {
            if (200 <= xhr.status && xhr.status < 300) {
                signUp.querySelector('.error-message').innerText = JSON.parse(xhr.responseText).message;
            } else {
                signUp.querySelector('.error-message').innerText = 'Произошла ошибка! Повторите процедуру позднее... Приносим свои извенения!';
                throw new Error('Ошибка: ' + xhr.status + ' : ' + xhr.statusText);
            }
        });
        const signUpForm = new FormData(signUp);
        for (const [key, value] of signUpForm) {
                newUser[key] = value;
        }
        str = JSON.stringify(newUser);
        xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(str);
    } else {
        event.target.addEventListener('change', (event) => {
            if(event.currentTarget.value !== '') {
                // console.log(event.currentTarget.value);
                return;
            } else {
            console.log('Поле не должно быть пустым!!!');
        }
        console.log(event.currentTarget.value);
        });
    }
}