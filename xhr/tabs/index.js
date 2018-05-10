'use strict';
const buttons =  document.querySelectorAll('nav a');
const xhr = new XMLHttpRequest();
function showLoader() {
    if(!arguments[0].classList.contains('active')) {
        document.getElementById('preloader').classList.remove('hidden');
    }
}
function showContent(event) {
    event.preventDefault();
    xhr.addEventListener('load', () => document.getElementById('content').innerHTML = xhr.responseText);
    xhr.addEventListener('loadstart', showLoader(this));
    xhr.addEventListener('loadend', () => document.getElementById('preloader').classList.add('hidden'));
    xhr.open("GET", this.href, true);
    xhr.send();
    document.querySelector('.active').classList.remove('active');
    this.classList.add('active');
}
for (let btn of buttons) {
    btn.addEventListener('click', showContent);
}