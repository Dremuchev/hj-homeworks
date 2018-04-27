'use strict'
const playlist = {
    'LA Chill Tour': "https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA Chill Tour.mp3",
    'This is it band': "https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This is it band.mp3",
    'LA Fusion Jam': "https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA Fusion Jam.mp3"
}
const titleArray = [];
const srcArray = [];
for(let key in playlist) {
    titleArray.push(key);
    srcArray.push(playlist[key]);
}
const songTitle = document.getElementsByClassName('title');
const btnPlay = document.getElementsByClassName('playstate');
const btnPlayState = document.getElementsByClassName('mediaplayer');
const btnStop = document.getElementsByClassName('stop');
const btnNext = document.getElementsByClassName('next');
const btnBack = document.getElementsByClassName('back');
const player = document.getElementsByTagName('audio');
var timerId;
btnPlay[0].onclick = () => {
    btnPlayState[0].classList.toggle('play');
    if(isPlaying()) {
        player[0].play();
        timerId = setInterval(() => {
            if(player[0].ended) {
                stop();
            }
        }, 2000)
    } else {
        clearInterval(timerId);
        player[0].pause();
    }
}
function stop() {
    clearInterval(timerId);
    player[0].pause();
    player[0].currentTime = 0;
    if(isPlaying()) {
        btnPlayState[0].classList.toggle('play');
    }
}
btnStop[0].onclick = stop;
function isPlaying() {
    if(btnPlayState[0].classList.contains('play')) {
        return true;
    } else return false;
}
var step = 0;
btnNext[0].onclick = () => {
    step += 1;
    if(step === titleArray.length) {
        step = 0;
    }
    songTitle[0].title = titleArray[step];
    player[0].src = srcArray[step];
    if(isPlaying()) {
        player[0].play();
    }
}
btnBack[0].onclick = () => {
    if(step === 0) {
        step = titleArray.length - 1;
        songTitle[0].title = titleArray[step];
        player[0].src = srcArray[step];
    } else {
        step -= 1;
        songTitle[0].title = titleArray[step];
        player[0].src = srcArray[step];
    }
    if(isPlaying()) {
        player[0].play();
    }
}
