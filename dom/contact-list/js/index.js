'use strict';
const contacts = JSON.parse(loadContacts());
const contactList = document.querySelector('.contacts-list');
let str = '';
for(let contact of contacts) {
    str += `<li 
            data-email="${contact.email}" 
            data-phone="${contact.phone}">
            <strong>${contact.name}</strong>
            </li>`;
}
contactList.innerHTML = str;