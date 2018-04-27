'use strict'
const wrapperDropdown = document.getElementsByClassName('wrapper-dropdown');
wrapperDropdown[0].onclick = () => {
    wrapperDropdown[0].classList.toggle('active');
}
