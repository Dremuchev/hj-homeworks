'use strict';
const signIn = document.querySelector('.sign-in-htm');
const signUp = document.querySelector('.sign-up-htm');
const check = document.getElementById('check');
const output = document.getElementsByClassName('error-message');
const buttons = document.getElementsByClassName('button');

for(let button of buttons){
    button.addEventListener('click', sendRequest);
}

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

function sendRequest(event){
    event.preventDefault();
    const userInfo = {};
    const xhr = new XMLHttpRequest();
    let formData;

    if (this.value === 'Войти'){
        formData = new FormData(signIn);
        xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
    } else {
        formData = new FormData(signUp);
        xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
    }

    for (const [key, value] of formData) {
        userInfo[key] = value;
    }

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(userInfo));
    xhr.addEventListener("load", () => {
        try {
            const getServerData = JSON.parse(xhr.responseText);
            if (200 <= xhr.status && xhr.status < 300){
                if (getServerData.error){
                    output[0].textContent = getServerData.message;
                    output[1].textContent = getServerData.message;
                } else {
                    output[0].textContent = `Пользователь ${getServerData.name} успешно авторизован`;
                    output[1].textContent = `Пользователь ${getServerData.name} успешно зарегистрирован`;
                }
            }
        } catch (err) {
                console.log(err.message, err.message);
            }
    });
}