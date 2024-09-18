// script.js

let selectedFrame = '';
let cropper;

function selectFrame(frame) {
    selectedFrame = frame;
    const thumbnails = document.querySelectorAll('.frame-thumbnail');
    thumbnails.forEach(img => img.style.borderColor = 'transparent');
    document.querySelector(`img[src="${frame}"]`).style.borderColor = '#007bff';

    // تحديث المعاينة الحية عند اختيار الإطار
    updateLivePreview();
}

function loadImage(event) {
    const imageToCrop = document.getElementById('imageToCrop');
    imageToCrop.src = URL.createObjectURL(event.target.files[0]);

    if (cropper) {
        cropper.destroy(); // إزالة أي مثيل سابق لـ Cropper
    }

    cropper = new Cropper(imageToCrop, {
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 1,
        crop: function() {
            updateLivePreview(); // تحديث المعاينة الحية عند تحرير الصورة
        }
    });
}

function updateLivePreview() {
    if (!selectedFrame || !cropper) return;

    const previewCanvas = document.getElementById('previewCanvas');
    const ctx = previewCanvas.getContext('2d');
    const frameImage = new Image();
    frameImage.src = selectedFrame;

    frameImage.onload = function () {
        const croppedCanvas = cropper.getCroppedCanvas();
        previewCanvas.width = frameImage.width;
        previewCanvas.height = frameImage.height;

        ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        ctx.drawImage(croppedCanvas, 0, 0, previewCanvas.width, previewCanvas.height);
        ctx.drawImage(frameImage, 0, 0, previewCanvas.width, previewCanvas.height);
    };
}

function applyFrame() {
    if (!selectedFrame) {
        alert('يرجى اختيار إطار.');
        return;
    }

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const downloadLink = document.getElementById('downloadLink');
    const frameImage = new Image();
    frameImage.src = selectedFrame;

    frameImage.onload = function () {
        const croppedCanvas = cropper.getCroppedCanvas();
        canvas.width = frameImage.width;
        canvas.height = frameImage.height;

        ctx.drawImage(croppedCanvas, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

        downloadLink.href = canvas.toDataURL();
    };
}
