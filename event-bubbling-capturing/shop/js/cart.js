'use strict';
const main = document.querySelector('.items-list');
main.addEventListener('click', eventHandler);
function eventHandler(event) {
    if(event.target.classList.contains('add-to-cart')) {
        const result = items.find((el) => el.title === event.target.dataset.title);
        addToCart(result);
        event.preventDefault();
    }
}