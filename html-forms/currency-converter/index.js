'use strict';
const options = document.querySelectorAll('select');
const result = document.querySelector('#result');
const from = document.querySelector('#from');
const to = document.querySelector('#to');
const source = document.querySelector('#source');
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://neto-api.herokuapp.com/currency", true);
xhr.addEventListener('load', getList);
xhr.addEventListener('loadstart', () => document.querySelector('#loader').classList.remove('hidden'));
xhr.send();
from.addEventListener('change', parseCurrency);
to.addEventListener('change', parseCurrency);
source.addEventListener('input', parseCurrency);
var currency;
function getList() {
    currency = JSON.parse(xhr.responseText);
    document.querySelector('#loader').classList.add('hidden');
    document.querySelector('#content').classList.remove('hidden');
    for (let option of options) {
        for (let unit of currency) {
            option.innerHTML += `<option>${unit.code}</option>`;
        }
    }
    parseCurrency();
    return currency;
}

function parseCurrency() {
    let valueFrom = currency.find((el) => el.code === from.value).value;
    let valueTo = currency.find((el) => el.code === to.value).value;
    result.value = parseFloat(source.value * valueFrom / valueTo).toFixed(2);
}