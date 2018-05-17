'use strict';
const slides = document.querySelector('.slides');
let currentSlide = slides.firstElementChild;
currentSlide.classList.add('slide-current');
const buttons = document.querySelectorAll('.slider-nav a');
for(let button of buttons) {
    button.addEventListener('click', moveSlide);
}
const next = document.querySelector('[data-action = "next"]');
const last = document.querySelector('[data-action = "last"]');
const prev = document.querySelector('[data-action = "prev"]');
const first = document.querySelector('[data-action = "first"]');
toggleButtons();
function toggleButtons() {
    currentSlide = document.querySelector('.slide-current');
    if (!currentSlide.nextElementSibling) {
        next.classList.add('disabled');
        last.classList.add('disabled');
        prev.classList.remove('disabled');
        first.classList.remove('disabled');
    } else if (!currentSlide.previousElementSibling) {
        prev.classList.add('disabled');
        first.classList.add('disabled');
        next.classList.remove('disabled');
        last.classList.remove('disabled');
    } else {
        next.classList.remove('disabled');
        last.classList.remove('disabled');
        prev.classList.remove('disabled');
        first.classList.remove('disabled');
    }
}
function moveSlide() {
    switch (this.dataset.action) {
        case 'next':
            if (currentSlide.nextElementSibling) {
                currentSlide.classList.remove('slide-current');
                const nextSlide = currentSlide.nextElementSibling;
                nextSlide.classList.add('slide-current');
            }
            break;
        case 'prev':
            if (currentSlide.previousElementSibling) {
                currentSlide.classList.remove('slide-current');
                const nextSlide = currentSlide.previousElementSibling;
                nextSlide.classList.add('slide-current');
            }
            break;
        case 'last':
            if (currentSlide.nextElementSibling) {
                currentSlide.classList.remove('slide-current');
                const nextSlide = slides.lastElementChild;
                nextSlide.classList.add('slide-current');
            }
            break;
        case 'first':
            if (currentSlide.previousElementSibling) {
                currentSlide.classList.remove('slide-current');
                const nextSlide = slides.firstElementChild;
                nextSlide.classList.add('slide-current');
            }
            break;
    }
    toggleButtons();
}