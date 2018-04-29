'use strict';
const allImages = document.getElementsByTagName('a');
const fullImage = document.getElementById('view')
function checkThisImage(event) {
    event.preventDefault();
    for (let img of allImages) {
        if (img.classList.contains('gallery-current')) {
            img.classList.remove('gallery-current');
        }
    }
    this.classList.add('gallery-current');
    fullImage.src = this.href;
}
for (let img of allImages) {
    img.addEventListener('click', checkThisImage)
}
