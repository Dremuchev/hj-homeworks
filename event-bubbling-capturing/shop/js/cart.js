'use strict';
const main = document.querySelector('.items-list');
main.addEventListener('click', eventHandler);
function eventHandler(event) {
    console.log(event.target)
    if(event.target.classList.contains('add-to-cart')) {
        const result = { title: event.target.dataset.title, price: event.target.dataset.price };
        addToCart(result);
    }
}