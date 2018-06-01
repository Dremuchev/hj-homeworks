'use strict';

function loadData(url) {
    const functionName = 'callback' + parseInt(Math.random() * (100 - 1) + 1);
    return new Promise((done, fail) => {
        window[functionName] = done;
        const script = document.createElement('script');
        script.src = `${url}?jsonp=${functionName}`;
        document.body.appendChild(script);
});
}

function showElement(element) {
    console.log(element);
    document.querySelector('[data-wallpaper]').src = element.wallpaper;
    document.querySelector('[data-username]').innerText = element.username;
    document.querySelector('[data-description]').innerText = element.description;
    document.querySelector('[data-pic]').src = element.pic;
    document.querySelector('[data-tweets]').innerText = element.tweets;
    document.querySelector('[data-followers]').innerText = element.followers;
    document.querySelector('[data-following]').innerText = element.following;
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp').then(showElement);
