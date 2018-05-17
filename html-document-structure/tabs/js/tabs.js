'use strict';
const tabsNav = document.querySelector('.tabs-nav');
for(let i = 0; i < 3; i++) {
    const copy = document.querySelector('.tabs-nav li').cloneNode(true);
    tabsNav.appendChild(copy);
}
const forRemove = document.querySelector('.tabs-nav li');
forRemove.parentNode.removeChild(forRemove);
const content = document.querySelector('.tabs-content').children;
Array.from(document.querySelectorAll('.tabs-nav li a')).forEach((el, i) => {
    el.addEventListener('click', toggleTab);
    el.innerText = content[i].dataset.tabTitle;
    el.classList.add(content[i].dataset.tabIcon);
    if(i === 0) {
        el.parentElement.classList.add('ui-tabs-active');
    } else {
        content[i].classList.add('hidden');
    }
})
function toggleTab() {
    if(this.parentElement.classList.contains('ui-tabs-active')) {
        return;
    } else {
        document.querySelector('.ui-tabs-active').classList.remove('ui-tabs-active')
        this.parentElement.classList.add('ui-tabs-active');
        for (let article of content) {
            if(this.innerText.toLowerCase() !== article.dataset.tabTitle.toLowerCase()) {
                article.classList.add('hidden');
            } else {
                article.classList.remove('hidden');
            }
        }
    }
}