'use strict';
let instant;
const quickCart = document.getElementById('quick-cart');
const addToCart = document.getElementById('AddToCartForm');
const sendForm = document.getElementById('AddToCart');
const colorSwatch = document.getElementById('colorSwatch');
const sizeSwatch = document.getElementById('sizeSwatch');
window.addEventListener('load', () => {
    sendRequest('color');
    sendRequest('size');
    sendRequest('getCart');
})
function sendRequest(swatch) {
    const xhr = new XMLHttpRequest();
    if (swatch === 'color') {
        xhr.open('GET', 'https://neto-api.herokuapp.com/cart/colors');
        xhr.send();
        xhr.addEventListener('load', () => {
            const result = JSON.parse(xhr.responseText);
            createColorSwatch(result);
            if (localStorage.colorChecked) {
                document.querySelector(`input[id=${localStorage.colorChecked}]`).setAttribute('checked', true);
            }
            console.log(result);
        })
    }
    if (swatch === 'size') {
        xhr.open('GET', 'https://neto-api.herokuapp.com/cart/sizes');
        xhr.send();
        xhr.addEventListener('load', () => {
            const result = JSON.parse(xhr.responseText);
            createSizeSwatch(result);
            if (localStorage.sizeChecked) {
                document.querySelector(`input[id=${localStorage.sizeChecked}]`).setAttribute('checked', true);
            }
            console.log(result);
        })
    }
    if (swatch === 'getCart') {
        const formData = new FormData(addToCart);
        formData.set('productId', `${addToCart.dataset.productId}`);
        xhr.open('GET', 'https://neto-api.herokuapp.com/cart');
        xhr.send();
        xhr.addEventListener('load', getCart);
    }
    if (swatch === 'deleteItem') {
        const formData = new FormData();
        formData.set('productId', `${addToCart.dataset.productId}`);
        xhr.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
        xhr.send(formData);
        xhr.addEventListener('load', getCart);
    }
}
sendForm.addEventListener('click', sendData);
addToCart.addEventListener('click', swatchHandler);
function createColorSwatch(result) {
    for (let i = 0; i < result.length; i++) {
        const div = document.createElement('div');
        const tooltip = document.createElement('div');
        const input = document.createElement('input');
        const label = document.createElement('label');
        const span = document.createElement('span');
        const img = document.createElement('img');
        div.dataset.value = result[i].code;
        div.classList.add('swatch-element');
        div.classList.add('color');
        div.classList.add(`${result[i].code}`);
        if(result[i].isAvailable) {
            div.classList.add('available');
        } else {
            div.classList.add('soldout');
            input.setAttribute('disabled', true);
            img.src = 'https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886';
        }
        tooltip.classList.add('tooltip');
        tooltip.innerText = `${result[i].title}`;
        input.setAttribute('quickbeam', 'color');
        input.id = `swatch-1-${result[i].code}`;
        input.type = 'radio';
        input.name = 'color';
        input.value = `${result[i].code}`;
        label.setAttribute('for', `swatch-1-${result[i].code}`);
        label.style = `border-color: ${result[i].code};`;
        span.style = `border-color: ${result[i].code};`;
        img.classList.add('crossed-out');
        colorSwatch.appendChild(div);
        div.appendChild(tooltip);
        div.appendChild(input);
        div.appendChild(label);
        label.appendChild(span);
        label.appendChild(img);
        console.log(div);
    }
}
function createSizeSwatch(result) {
    for (let i = 0; i < result.length; i++) {
        const div = document.createElement('div');
        const input = document.createElement('input');
        const label = document.createElement('label');
        const img  = document.createElement('img');
        div.dataset.value = `${result[i].type}`;
        div.classList.add('swatch-element')
        div.classList.add('plain');
        div.classList.add(`${result[i].type}`);
        if(result[i].isAvailable) {
            div.classList.add('available');
        } else {
            div.classList.add('soldout');
            input.setAttribute('disabled', true);
            img.src = 'https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886';
        }
        input.id = `swatch-0-${result[i].type}`;
        input.type = 'radio';
        input.name = 'size';
        input.value = `${result[i].type}`;
        label.setAttribute('for', `swatch-0-${result[i].type}`);
        label.innerText = `${result[i].title}`
        img.classList.add('crossed-out');
        sizeSwatch.appendChild(div);
        div.appendChild(input);
        div.appendChild(label);
        label.appendChild(img);
    }
}
function getCart(result) {
    quickCart.innerHTML = '';
    for (let i = 0; i < result.length; i++) {
        const outerDiv = document.createElement('div');
        const innerDiv = document.createElement('div');
        const img = document.createElement('img');
        const s1 = document.createElement('span');
        const s2 = document.createElement('span');
        const count = document.createElement('span');
        const remove = document.createElement('span');
        outerDiv.classList.add('quick-cart-product');
        outerDiv.classList.add('quick-cart-product-static');
        outerDiv.id = `quick-cart-product-${result[i].id}`;
        outerDiv.setAttribute('style', 'opacity: 1;');
        innerDiv.classList.add('quick-cart-product-wrap');
        img.src = result[i].pic;
        img.title = result[i].title;
        s1.classList.add('s1');
        s1.setAttribute('style', 'background-color: #000; opacity: .5');
        s1.innerText = `$${result[i].price}`;
        s2.classList.add('s2');
        count.classList.add('count');
        count.classList.add('hide');
        count.classList.add('fadeUp');
        count.id = `quick-cart-product-count-${result[i].id}`;
        count.innerText = result[i].quantity;
        remove.classList.add('quick-cart-product-remove');
        remove.classList.add('remove');
        remove.dataset.id = result[i].id;
        quickCart.appendChild(outerDiv);
        outerDiv.appendChild(innerDiv);
        innerDiv.appendChild(img);
        innerDiv.appendChild(s1);
        innerDiv.appendChild(s2);
        outerDiv.appendChild(count);
        outerDiv.appendChild(remove);
    }
    if (document.querySelector('.remove')) {
        document.querySelector('.remove').addEventListener('click', () => {
            const remove = document.querySelector('.remove');
            remove.parentElement.removeChild(remove);
            sendRequest('deleteItem');
        })
    }
    getSum(result);
}
function getSum(result) {
    const a = document.createElement('a');
    const span = document.createElement('span');
    const strong = document.createElement('strong');
    const price = document.createElement('span');
    a.id = 'quick-cart-pay';
    a.setAttribute('quickbeam', 'cart-pay');
    a.classList.add('cart-ico');
    if (result[0]) {
        a.classList.add('open');
        price.innerText = '$' + result[0].quantity * result[0].price;
    }
    strong.classList.add('quick-cart-text');
    strong.innerText = 'Оформить заказ';
    strong.appendChild(document.createElement('br'));
    price.id = 'quick-cart-price';
    quickCart.appendChild(a);
    a.appendChild(span);
    span.appendChild(strong);
    span.appendChild(price);
}
// function showCart() {
//     const result = JSON.parse(this.responseText);
//     getCart(result);
//     if (document.querySelector('.remove')) {
//         document.querySelector('.remove').addEventListener('click', () => {
//             const remove = document.querySelector('.remove');
//             remove.parentElement.removeChild(remove);
//             sendRequest('deleteItem');
//         })
//     }
//     getSum(result);
//     console.log(result);
// }
function swatchHandler(event) {
    if (event.target.name === 'size' || event.target.name === 'color') {
        console.log('da');
        const sizeChecked = sizeSwatch.querySelector('input[checked]');
        const colorChecked = colorSwatch.querySelector('input[checked]');
        if (event.target.name === 'size') {
            if (sizeChecked) {
                sizeChecked.removeAttribute('checked');
            }
            localStorage.sizeChecked = event.target.id;
        }
        if(event.target.name === 'color') {
            if (colorChecked) {
                colorChecked.removeAttribute('checked');
            }
            localStorage.colorChecked = event.target.id;
        }
        event.target.setAttribute('checked', true);
    } else {
        return;
    }
}
function sendData(event) {
    event.preventDefault();
    if (document.querySelector('input[checked]')) {
        const xhr = new XMLHttpRequest();
        const formData = new FormData(addToCart);
        formData.set('productId', `${addToCart.dataset.productId}`);
        // console.log(colorSwatch.querySelector('input[checked]').value);
        const sizeChecked = sizeSwatch.querySelector('input[checked]');
        const colorChecked = colorSwatch.querySelector('input[checked]');
        if(sizeChecked) {
            formData.append('size', `${sizeChecked.value}`);
        }
        if(colorChecked) {
            formData.append('color', `${colorChecked.value}`);
        }
        xhr.open('POST', 'https://neto-api.herokuapp.com/cart');
        xhr.send(formData);
        xhr.addEventListener('load', () => {
            const result = JSON.parse(xhr.responseText);;
            console.log(result);
            sendRequest('getCart')
        })
    }
}