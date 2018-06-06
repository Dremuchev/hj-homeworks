'use strict';
const pooling = new XMLHttpRequest();
window.addEventListener('load', poolingReqest);
function poolingReqest() {
    setInterval( () => {
        pooling.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
        pooling.send();
    }, 5000)
}
pooling.addEventListener('load', flipPoolingDiv);

function flipPoolingDiv() {
    const flipIt = document.querySelector('.pooling .flip-it');
    if (flipIt) {
        flipIt.classList.remove('flip-it');
    }
    document.querySelector('.pooling').children[parseInt(pooling.responseText)].classList.add('flip-it');
}