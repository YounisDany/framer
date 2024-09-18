// script.js

let selectedFrame = '';

function selectFrame(frame) {
    selectedFrame = frame;
    const thumbnails = document.querySelectorAll('.frame-thumbnail');
    thumbnails.forEach(img => img.style.borderColor = 'transparent');
    document.querySelector(`img[src="${frame}"]`).style.borderColor = '#007bff';
}

function applyFrame() {
    const imageInput = document.getElementById('imageInput');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const downloadLink = document.getElementById('downloadLink');

    if (!selectedFrame) {
        alert('يرجى اختيار إطار.');
        return;
    }

    const frameImage = new Image();
    frameImage.src = selectedFrame;

    const reader = new FileReader();
    reader.onload = function (event) {
        const userImage = new Image();
        userImage.onload = function () {
            const scaleFactor = Math.min(canvas.width / userImage.width, canvas.height / userImage.height);
            const x = (canvas.width - userImage.width * scaleFactor) / 2;
            const y = (canvas.height - userImage.height * scaleFactor) / 2;

            canvas.width = frameImage.width;
            canvas.height = frameImage.height;

            ctx.drawImage(userImage, x, y, userImage.width * scaleFactor, userImage.height * scaleFactor);
            ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

            downloadLink.href = canvas.toDataURL();
        };
        userImage.src = event.target.result;
    };

    if (imageInput.files[0]) {
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        alert('يرجى اختيار صورة.');
    }
}
