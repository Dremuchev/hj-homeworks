'use strict'
const btnsArray = Array.from(document.getElementsByClassName('drum-kit__drum'));
const players = document.getElementsByTagName('audio');

btnsArray.forEach((el, index) => {
    el.onclick = () => {
        players[index].currentTime = 0;
        players[index].play();
    }
})
