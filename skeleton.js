function drawSkeleton(x, y) {
    // Skull
    ctx.fillStyle = '#d0d0c0';
    ctx.fillRect(x + 8, y, 20, 18);

    // Eye sockets (dark)
    ctx.fillStyle = '#111';
    ctx.fillRect(x + 10, y + 5, 6, 6);
    ctx.fillRect(x + 20, y + 5, 6, 6);

    // Glowing red eyes
    ctx.fillStyle = '#ff2200';
    ctx.shadowBlur = 6;
    ctx.shadowColor = '#ff2200';
    ctx.fillRect(x + 11, y + 6, 4, 4);
    ctx.fillRect(x + 21, y + 6, 4, 4);
    ctx.shadowBlur = 0;

    // Jaw
    ctx.fillStyle = '#d0d0c0';
    ctx.fillRect(x + 10, y + 14, 16, 6);
    ctx.fillStyle = '#111';
    ctx.fillRect(x + 12, y + 16, 3, 4);
    ctx.fillRect(x + 17, y + 16, 3, 4);
    ctx.fillRect(x + 22, y + 16, 3, 4);

    // Spine/body
    ctx.fillStyle = '#d0d0c0';
    ctx.fillRect(x + 16, y + 20, 4, 20);

    // Ribs
    ctx.fillRect(x + 8,  y + 22, 8, 3);
    ctx.fillRect(x + 20, y + 22, 8, 3);
    ctx.fillRect(x + 9,  y + 28, 7, 3);
    ctx.fillRect(x + 20, y + 28, 7, 3);
    ctx.fillRect(x + 10, y + 34, 6, 3);
    ctx.fillRect(x + 20, y + 34, 6, 3);

    // Arms
    ctx.fillRect(x + 2,  y + 22, 6, 3);
    ctx.fillRect(x + 28, y + 22, 6, 3);
    ctx.fillRect(x,      y + 28, 6, 3);
    ctx.fillRect(x + 30, y + 28, 6, 3);

    // Legs
    ctx.fillRect(x + 11, y + 40, 4, 20);
    ctx.fillRect(x + 21, y + 40, 4, 20);

    // Feet
    ctx.fillRect(x + 8,  y + 58, 8, 4);
    ctx.fillRect(x + 20, y + 58, 8, 4);
}

class Skeleton {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 36;
        this.height = 62;
        this.alive = true;
    }
    draw() {
        drawSkeleton(this.x, this.y);
    }
    update() {
        // stationary
    }
}
