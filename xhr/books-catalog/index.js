'use strict';
const xhr = new XMLHttpRequest();
xhr.addEventListener('load', onLoad);
xhr.open('GET', 'https://neto-api.herokuapp.com/book/', true);
xhr.send();
let str = '';
function onLoad() {
    const books = JSON.parse(xhr.responseText);
    for (let book of books) {
        str += `<li data-title = "${book.title}"
                    data-author="${book.author.name}" 
                    data-info="${book.info}" 
                    data-price="${book.price}">
                <img src="${book.cover.small}">
                </li>`;
    }
    document.getElementById('content').innerHTML = str;
}