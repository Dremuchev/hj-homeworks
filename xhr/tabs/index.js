'use strict';
const buttons =  document.querySelectorAll('nav a');
const xhr = new XMLHttpRequest();
function showContent(event) {
    event.preventDefault();
    xhr.addEventListener('load', () => document.getElementById('content').innerHTML = xhr.responseText);
    xhr.addEventListener('loadstart', () => document.getElementById('preloader').classList.remove('hidden'));
    xhr.addEventListener('loadend', () => document.getElementById('preloader').classList.add('hidden'));
    xhr.open("GET", this.href, true);
    xhr.send();
    document.querySelector('.active').classList.remove('active');
    this.classList.add('active');
}
for (let btn of buttons) {
    btn.addEventListener('click', showContent);
}