'use strict';
const app = document.getElementsByClassName('app')[0];
const video = document.createElement('video');
const controls = document.getElementsByClassName('controls')[0];
const button = document.getElementById('take-photo');
const message = document.getElementById('error-message');
const main = document.getElementsByClassName('container')[0];
const errorMessage = document.getElementById('error-message');
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const list = document.getElementsByClassName('list')[0];
const shootSound = document.createElement('audio');
const figure = document.querySelectorAll('figure');

app.appendChild(video);

if (!navigator.mediaDevices) {
    errorMessage.innerText = 'Media Device is not available!';
}

navigator.mediaDevices.getUserMedia({video: true})
    .then(stream => streaming.call(stream))
    .catch (e => console.warn(e.message))

function streaming() {
    controls.classList.add('visible');
    video.src = URL.createObjectURL(this);
    shootSound.src = 'audio/click.mp3';
}

function takePhoto(event) {
    console.log(event.target.id);
    shootSound.play();
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    const src = canvas.toDataURL();
    addPhoto(src);
}

function addPhoto(path) {
    console.log('add');
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');
    const download = document.createElement('a');
    const downloadDescription = document.createElement('i');
    const upload = download.cloneNode();
    const uploadDescription = downloadDescription.cloneNode();
    const deleteBtn = download.cloneNode();
    const deleteBtnDescription = downloadDescription.cloneNode();

    img.src = path;
    download.href = path;
    download.setAttribute('download', 'snapshot.png');
    downloadDescription.className = 'material-icons';
    downloadDescription.innerText = 'file_download';
    uploadDescription.className = 'material-icons';
    uploadDescription.innerText = 'file_upload';
    deleteBtnDescription.className = 'material-icons';
    deleteBtnDescription.innerText = 'delete';

    figure.appendChild(img);
    figure.appendChild(figcaption);
    figcaption.appendChild(download);
    figcaption.appendChild(upload);
    figcaption.appendChild(deleteBtn);
    download.appendChild(downloadDescription);
    upload.appendChild(uploadDescription);
    deleteBtn.appendChild(deleteBtnDescription);

    if (list.children.length === 0) {
        list.appendChild(figure);
    } else {
        list.children[0].parentNode.insertBefore(figure, list.children[0]);
    }

}

function actions(event) {
    event.stopPropagation();
    const currentElement = event.target.parentNode.parentNode.parentNode;
    if (event.target.innerText === 'delete') {
        list.removeChild(currentElement);
    }
    if (event.target.innerText === 'file_upload') {
        const pic = currentElement.firstChild;
        const imgCanvas = document.createElement('canvas');
        const imgContext = imgCanvas.getContext('2d');
        const form = new FormData();
        imgCanvas.width = pic.naturalWidth;
        imgCanvas.height = pic.naturalHeight;
        imgContext.drawImage(pic, 0, 0);
        imgCanvas.toBlob((blob) => {
            form.append('image', blob);
            fetch('https://neto-api.herokuapp.com/photo-booth', {
                method: 'POST',
                body: form
            })
            .then(event.target.parentNode.style.display = 'none')
            .catch(e => console.warn(e.message));
        });
        console.log(form.get('image'))
    }
    if (event.target.innerText = 'file_download') {
        event.target.parentNode.style.display = 'none';
    }
}

list.addEventListener('click', actions);

button.addEventListener('click', takePhoto);