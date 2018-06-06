'use strict';
const BRUSH_RADIUS = 6;
const canvas = document.getElementById('draw');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let brushWidth = 100;
let curves = [];
let drawing = false;
let hslDecrease = false;
let hue = 0;
let weird = false;

function changeSize() {
    console.log(canvas.width, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

ctx.clearRect(0, 0, canvas.width, canvas.height)

window.addEventListener('resize', changeSize);

function smoothCurveBetween (p1, p2) {
    // Bezier control point
    const cp = p1.map((coord, idx) => (coord + p2[idx]) / 2);
    ctx.quadraticCurveTo(...p1, ...cp);
}

function smoothCurve(points) {
    ctx.beginPath();
    ctx.lineWidth = BRUSH_RADIUS;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.moveTo(...points[0]);

    for(let i = 1; i < points.length - 1; i++) {
        smoothCurveBetween(points[i], points[i + 1]);
    }

    ctx.stroke();
}

// events
function makePoint(x, y) {
    return [x, y];
};

canvas.addEventListener('click', event => {
    console.log(event.clientX, event.clientY);
    console.log(event.offsetX, event.offsetY);
})

canvas.addEventListener('dblclick', () => ctx.clearRect(0, 0, canvas.width, canvas.height))


canvas.addEventListener("mousedown", (evt) => {
    drawing = true;
    ctx.beginPath();
    ctx.lineWidth = BRUSH_RADIUS;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    // weird = evt.shiftKey; // press shift to make things weird =)

    ctx.moveTo(evt.clientX, evt.clientY);
    console.log(evt.clientX, evt.clientY);

});

canvas.addEventListener("mouseup", evt => {
    drawing = false;
    ctx.closePath();
});

canvas.addEventListener("mouseleave", evt => drawing = false);

canvas.addEventListener("mousemove", evt => {
    if (drawing) {
        // add a point
        ctx.lineTo(evt.offsetX, evt.offsetY);
        ctx.strokeStyle = palette(true);
        ctx.stroke();
        console.log(evt.offsetX, evt.offsetY);
    }
});

// rendering
function repaint () {
    // clear before repainting
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    curves.forEach((curve) => {
        // the body is compraised of lines
        smoothCurve(curve);
    });
}

// function tick () {
//     window.requestAnimationFrame(tick);
// }

function hslToRgb(h, s, l) {
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    function colorToHex(color) {
        let hex = Math.round(color * 255).toString(16);
        return hex.length < 2 ? `0${hex}` : hex;
    }

    console.log(r, g, b)
    const color = [r, g, b].map(colorToHex).join('');
    return `#${color}`;
}

function palette(hslDecrease) {
    hslDecrease ? hue += 1/360 : hue -= 1/360;
    if(hue > 1) {
        hue = 0;
        return hslToRgb(hue, 1, 0.5);
    }
    if (hue < 0) {
        hue = 359;
        return hslToRgb(hue, 1, 0.5);
    }
    console.log(hue);
    return hslToRgb(hue, 1, 0.51)
}

// tick();