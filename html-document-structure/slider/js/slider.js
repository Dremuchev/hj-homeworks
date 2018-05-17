'use strict';
let currentSlide = document.querySelectorAll('.slides')[0].firstElementChild;
currentSlide.classList.add('slide-current');
const slides = document.querySelector('.slides');
const buttons = Array.from(document.querySelectorAll('.slider-nav a'));
const next = buttons.find((el) => el.dataset.action === 'next');
const last = buttons.find((el) => el.dataset.action === 'last');
const prev = buttons.find((el) => el.dataset.action === 'prev');
const first = buttons.find((el) => el.dataset.action === 'first');
for (let button of buttons) {
    button.addEventListener('click', moveSlide);
    toggleButtons();
}
function toggleButtons() {
    currentSlide = document.querySelector('.slide-current');
    if (currentSlide.nextElementSibling && currentSlide.previousElementSibling) {
        next.classList.remove('disabled');
        last.classList.remove('disabled');
        prev.classList.remove('disabled');
        first.classList.remove('disabled');
    }
    if (!currentSlide.nextElementSibling) {
        next.classList.add('disabled');
        last.classList.add('disabled');
        prev.classList.remove('disabled');
        first.classList.remove('disabled');
    }
    if (!currentSlide.previousElementSibling) {
        prev.classList.add('disabled');
        first.classList.add('disabled');
        next.classList.remove('disabled');
        last.classList.remove('disabled');
    }

}
function moveSlide() {
    if (this.dataset.action === 'next') {
        nextSlide();
    }
    if (this.dataset.action === 'prev') {
        prevSlide();
    }
    if (this.dataset.action === 'last') {
        lastSlide();
    }
    if (this.dataset.action === 'first') {
        firstSlide();
    }
}
function nextSlide() {
    currentSlide = document.querySelector('.slide-current');
    if (currentSlide.nextElementSibling) {
        currentSlide.classList.remove('slide-current');
        const nextSlide = currentSlide.nextElementSibling;
        nextSlide.classList.add('slide-current');
    }
    toggleButtons();
}
function prevSlide() {
    currentSlide = document.querySelector('.slide-current');
    if (currentSlide.previousElementSibling) {
        currentSlide.classList.remove('slide-current');
        const nextSlide = currentSlide.previousElementSibling;
        nextSlide.classList.add('slide-current');
    }
    toggleButtons();
}
function lastSlide() {
    currentSlide = document.querySelector('.slide-current');
    if (currentSlide.nextElementSibling) {
        currentSlide.classList.remove('slide-current');
        const nextSlide = slides.lastElementChild;
        nextSlide.classList.add('slide-current');
    }
    toggleButtons();
}
function firstSlide() {
    currentSlide = document.querySelector('.slide-current');
    if (currentSlide.previousElementSibling) {
        currentSlide.classList.remove('slide-current');
        const nextSlide = slides.firstElementChild;
        nextSlide.classList.add('slide-current');
    }
    toggleButtons();
}
