'use strict';
const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');
const PI = Math.PI;

canvas.addEventListener('click', generateStar);

generateStar();

function generateStar() {
    ctx.beginPath();
    const colors = [ '#ffffff', '#ffe9c4', '#d4fbff'];
    const randomQuanity = parseInt(Math.random() * (400 - 200) + 200);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    for (let i = 0; i < randomQuanity; i++) {
        const rectPoistion = [
            Math.random() * (canvas.width - 1) + 1,
            Math.random() * (canvas.height - 1) + 1
        ];
        const size = [
            Math.random() * (1.1),
            Math.random() * (1.1)
        ];
        ctx.fillStyle = colors[parseInt(Math.random() * (3))];
        ctx.globalAlpha = Math.random() * (1 - 0.8) + 0.8;
        ctx.fillRect(...rectPoistion, ...size);
    }
}