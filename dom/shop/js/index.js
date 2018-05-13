'use strict';
const buttons = document.getElementsByClassName('add');
const items = document.querySelectorAll('.add');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
let counter = 0;
let sum = 0;
function addToCart() {
    counter++;
    sum += parseInt(this.getAttribute('data-price'));
    cartCount.innerHTML = counter;
    cartTotalPrice.innerHTML = getPriceFormatted(sum);
}
for(let button of buttons) {
    button.addEventListener('click', addToCart)
}