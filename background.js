const bgImage = new Image();
bgImage.src = 'background.png';

function drawBackground() {
    if (bgImage.complete && bgImage.naturalWidth > 0) {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = '#1a5a5a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
