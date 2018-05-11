'use strict';
const buttons =  document.querySelectorAll('nav a');
function showContent(event) {
    event.preventDefault();
    if (!this.classList.contains('active')) {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => document.getElementById('content').innerHTML = xhr.responseText);
        xhr.addEventListener('loadstart', () => document.getElementById('preloader').classList.remove('hidden'));
        xhr.addEventListener('loadend', () => document.getElementById('preloader').classList.add('hidden'));
        xhr.open("GET", this.href, true);
        xhr.send();
        document.querySelector('.active').classList.remove('active');
        this.classList.add('active');
    }
}
for (let btn of buttons) {
    btn.addEventListener('click', showContent);
}