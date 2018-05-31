'use strict';
// const xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://neto-api.herokuapp.com/twitter/json');
// xhr.send();
// xhr.addEventListener('load', () => console.log(xhr.responseText));

function loadData(url) {
    return new Promise((done, fail) => {
        window.parseElement = done;

        const script = document.scripts[0].cloneNode();
        script.src = url;
        document.body.appendChild(script);
    })
}

function showElement(element) {
    const target = document.querySelector('.content');
    console.log(JSON.parse((element)));
    target.innerHTML = JSON.parse(element);
    console.log(element);
}

loadData('https://neto-api.herokuapp.com/twitter/json').then(showElement);
