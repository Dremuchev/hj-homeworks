'use strict';

function loadData(url) {
    const functionName = `callback${parseInt(Math.random() * (100 - 1) + 1)}`;
    return new Promise(done => {
        window[functionName] = done;
        const script = document.createElement('script');
        script.src = `${url}?jsonp=${functionName}`;
        document.body.appendChild(script);
    });
}

function showElement(element) {
    if (element.pic) {
        document.querySelector('.cover').setAttribute('style', `background-image: url(${element.pic})`);
        document.querySelector('[data-title]').innerText = element.title;
        document.querySelector('[data-ingredients]').innerText = element.ingredients;
        return `https://neto-api.herokuapp.com/food/42/rating`;
    }
    if (element.rating) {
        document.querySelector('[data-rating]').innerText = parseFloat(element.rating).toFixed(2);
        document.querySelector('[data-star]').style.width = `${parseFloat(element.rating) * 10}px`;
        document.querySelector('[data-votes]').innerText = `(${element.votes} оценок)`;
        return `https://neto-api.herokuapp.com/food/42/consumers`;
    }
    if (element.consumers) {
        let total = parseInt(element.total);
        const consumers = element.consumers.forEach(el => {
            const pic = document.createElement('img');
            pic.src = el.pic;
            pic.title = el.name;
            document.querySelector('[data-consumers]').appendChild(pic);
            total--;
        })
        const span = document.createElement('span');
        span.innerText = `+(${total})`;
        document.querySelector('[data-consumers]').appendChild(span)
    }
}

loadData('https://neto-api.herokuapp.com/food/42')
    .then(showElement)
    .then(loadData)
    .then(showElement)
    .then(loadData)
    .then(showElement);