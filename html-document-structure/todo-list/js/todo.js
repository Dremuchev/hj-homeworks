'use strict';
const labels = document.querySelectorAll('label');
for (let label of labels) {
    label.addEventListener('click', toggleCheckbox);
}
function toggleCheckbox() {
    console.log(this)
}