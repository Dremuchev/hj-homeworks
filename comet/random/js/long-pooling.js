'use strict';
window.addEventListener('load', subscribe);

function subscribe() {
    const longPooling = new XMLHttpRequest();

    longPooling.addEventListener('load', () => {
        const flipIt = document.querySelector('.long-pooling .flip-it');
        if (flipIt) {
            flipIt.classList.remove('flip-it');
        }
        document.querySelector('.long-pooling').children[parseInt(longPooling.responseText)].classList.add('flip-it');
        subscribe();
    })
    longPooling.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling');
    longPooling.send();
}