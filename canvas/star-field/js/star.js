'use strict';
const canvas = document.getElementsByTagName('canvas')[0];
canvas.addEventListener('click', generateStar);
const ctx = canvas.getContext('2d');
const PI = Math.PI;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomFloat(min, max, toFix) {
    return ((Math.random() * (max - min)) + min).toFixed(toFix);
}

function generateStar() {
    const colors = [ '#ffffff', '#ffe9c4', '#d4fbff'];
    const randomQuanity = getRandomInt(200, 400);
    ctx.fillStyle = '#000';
    ctx.rect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fill();
    for (let i = 0; i < randomQuanity; i++) {
        const radius = getRandomFloat(0, 0.55, 2);
        const arcPosition = [
            getRandomFloat(0.55, canvas.clientWidth - 0.55, 1),
            getRandomFloat(0.55, canvas.clientHeight - 0.55, 1)
        ];
        ctx.beginPath();
        ctx.fillStyle = colors[getRandomInt(0, 3)];
        ctx.globalAlpha = getRandomFloat(0.8, 1, 1);
        ctx.arc(...arcPosition, radius, 0, 2 * PI);
        ctx.fill();
    }
}