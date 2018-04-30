'use strict';
const menu = document.getElementsByTagName('nav');
function secretCombination(event) {
    if (!event.ctrlKey && !event.altKey) {
        return;
    }
    switch (event.code) {
        case 'KeyT':
            menu[0].classList.toggle('visible');
            break;
    }
}
const theSecret = document.getElementsByClassName('secret');
const promo = [89, 84, 78, 74, 75, 74, 85, 66, 90]
var step = 0;
function secretWord(event) {
    let result = event.keyCode;
    if(result === promo[step]) {
        step++;
        if(step === promo.length) {
            theSecret[0].classList.add('visible');
        }
        return;
    } else {
        step = 0;
    }
}
document.addEventListener('keydown', secretCombination);
document.addEventListener('keydown', secretWord);
