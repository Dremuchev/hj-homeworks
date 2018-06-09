'use strict';
const eye = document.querySelector('.big-book__eye');
const pupil = document.querySelector('.big-book__pupil');
const mousePos = { x: 0, y: 0 };
let eyeCenter = { x: 0, y: 0 };
let timer = null;

document.addEventListener('mousemove', getCords);

function getCords(event) {
    mousePos.x = event.clientX;
    mousePos.y = event.clientY;
}

function tick() {
    const offset = getOffsetPupil();
    getEyeCenter();
    pupil.style.setProperty('--pupil-size', getSizePupil());
    pupil.style.setProperty('--pupil-x', `${offset.x}px`);
    pupil.style.setProperty('--pupil-y', `${offset.y}px`);
    timer = requestAnimationFrame(tick);
}

timer = requestAnimationFrame(tick);

function getEyeCenter() {
    const cords = eye.getBoundingClientRect();
    eyeCenter = {
        x: cords.left + (cords.right - cords.left) / 2,
        y: cords.top + (cords.bottom - cords.top) / 2
    };
}

function getSizePupil() {
    const distance = getDistance(mousePos, eyeCenter);
    return Math.max((1 - Math.min(distance / eyeCenter.x, 1)) * 3, 1);
}

function getDistance(p1, p2) {
    return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
}

function getOffsetPupil() {
    const offset = { x: 0, y: 0 };
    offset.x = getOffset(mousePos.x, eyeCenter.x, document.documentElement.clientWidth);
    offset.y = getOffset(mousePos.y, eyeCenter.y, document.documentElement.clientHeight);
    return offset;
}

function getOffset(c1, c2, axis) {
    const offset = c1 > c2
        ? (c1 - c2) / (axis - c2) * 30
        : (c1 - c2) / c2 * 30;
    return Math.min(offset, 30);
}