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
    if(element.id) {
        document.querySelector('[data-name]').innerText = element.name;
        document.querySelector('[data-description]').innerText = element.description;
        document.querySelector('[data-pic]').src = element.pic;
        document.querySelector('[data-position]').innerText = element.position;
        return `https://neto-api.herokuapp.com/profile/${element.id}/technologies`;
    }
    if(Array.isArray(element)) {
    // <span class="devicons devicons-django"></span>
        const node = element.reduce((emptyElement, el) => {
            const span = document.createElement('span');
            span.className = `devicons devicons-${el}`
            emptyElement.appendChild(span);
            return emptyElement;
        }, document.createDocumentFragment())
        document.querySelector('[data-technologies]').appendChild(node);
    }
}

loadData('https://neto-api.herokuapp.com/profile/me')
    .then(showElement)
    .then(loadData)
    .then(showElement)
    .then(() => document.querySelector('.content').style.display = 'initial');