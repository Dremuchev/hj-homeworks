'use strict';
const higherSounds = [
    "sounds/higher/first.mp3",
    "sounds/higher/second.mp3",
    "sounds/higher/third.mp3",
    "sounds/higher/fourth.mp3",
    "sounds/higher/fifth.mp3"
];
const lowerSounds = [
    "sounds/lower/first.mp3",
    "sounds/lower/second.mp3",
    "sounds/lower/third.mp3",
    "sounds/lower/fourth.mp3",
    "sounds/lower/fifth.mp3"
];
const middleSounds = [
    "sounds/middle/first.mp3",
    "sounds/middle/second.mp3",
    "sounds/middle/third.mp3",
    "sounds/middle/fourth.mp3",
    "sounds/middle/fifth.mp3"
];
const keys = Array.from(document.getElementsByTagName('li'));
const players = document.getElementsByTagName('audio');
const mode = document.getElementsByClassName('set');
document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyUnpressed);
for(var index = 0; index < keys.length; index++) {
    players[index].src = middleSounds[index];
    keys[index].addEventListener('click', playKey);
}
function keyPressed(event) {
    if(event.shiftKey) {
        mode[0].classList.remove('middle');
        mode[0].classList.remove('higher');
        mode[0].classList.add('lower');
    }
    if(event.altKey) {
        mode[0].classList.remove('middle');
        mode[0].classList.remove('lower');
        mode[0].classList.add('higher');
    }
}
function keyUnpressed() {
    mode[0].classList.remove('higher');
    mode[0].classList.remove('lower');
    mode[0].classList.add('middle');
    let step = 0;
    for(let player of players) {
        player.src = middleSounds[step]
        step++;
    }
}
function playKey() {
    let step = 0;
    if(mode[0].classList.contains('lower')) {
        for(let player of players) {
            player.src = lowerSounds[step]
            step++;
        }
    }
    if(mode[0].classList.contains('higher')) {
        for(let player of players) {
            player.src = higherSounds[step]
            step++;
        }
    }
    const playMe = this.getElementsByTagName('audio');
    playMe[0].currentTime = 0;
    playMe[0].play();
}
