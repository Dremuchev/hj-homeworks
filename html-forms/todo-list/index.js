'use strict';
const result = document.querySelector('output');
const list = document.querySelectorAll('input');
let counter = 0;
for(let task of list) {
    if (task.checked) {
        counter++;
        result.value = `${counter} из ${list.length}`;
    }
    task.addEventListener('click', tasksCounter);
}
function tasksCounter() {
    (this.checked) ? counter++ : counter--;
    if (counter === list.length) {
        document.querySelector('.list-block').classList.add('complete');
    } else {
        document.querySelector('.list-block').classList.remove('complete');
    }
    result.value = `${counter} из ${list.length}`;
}