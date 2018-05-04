'use strict';
const buttons = document.getElementsByClassName('add');
const items = document.querySelectorAll('.add');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const priceArray = [];
function addToCart() {
    priceArray.push(parseInt(this.getAttribute('data-price')));
    cartCount.innerHTML = priceArray.length.toString();
    cartTotalPrice.innerHTML = getPriceFormatted(priceArray.reduce((a, b) => a+b));
}
for(let button of buttons) {
    button.addEventListener('click', addToCart)
}