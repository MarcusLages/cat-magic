const catSorcererImage = new Image();
catSorcererImage.src = 'cat-sorcerer.png';

function drawSorcerer(x, y) {

    // === STAFF (drawn behind body) ===
    // Wooden staff
    ctx.fillStyle = '#6b4a1a';
    ctx.fillRect(x + 42, y + 18, 5, 52);
    // Staff knots
    ctx.fillStyle = '#8b6914';
    ctx.fillRect(x + 41, y + 28, 7, 3);
    ctx.fillRect(x + 41, y + 38, 7, 3);
    // Blue crystal on top
    ctx.fillStyle = '#60d0ff';
    ctx.shadowBlur = 14;
    ctx.shadowColor = '#00cfff';
    ctx.beginPath();
    ctx.moveTo(x + 44, y + 5);
    ctx.lineTo(x + 38, y + 18);
    ctx.lineTo(x + 50, y + 18);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#b8eeff';
    ctx.beginPath();
    ctx.moveTo(x + 44, y + 7);
    ctx.lineTo(x + 40, y + 17);
    ctx.lineTo(x + 44, y + 14);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    // === WIZARD HAT ===
    // Wide brim
    ctx.fillStyle = '#5a1a8a';
    ctx.fillRect(x + 4, y + 8, 38, 6);
    // Hat body (tall pointy)
    ctx.fillStyle = '#6a2a9a';
    ctx.beginPath();
    ctx.moveTo(x + 22, y - 22);
    ctx.lineTo(x + 8, y + 8);
    ctx.lineTo(x + 36, y + 8);
    ctx.closePath();
    ctx.fill();
    // Hat band (gold)
    ctx.fillStyle = '#c8a000';
    ctx.fillRect(x + 9, y + 7, 26, 4);
    // Star decorations on hat
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(x + 17, y - 5, 3, 3);
    ctx.fillRect(x + 15, y - 3, 7, 1);
    ctx.fillRect(x + 18, y - 7, 1, 7);
    ctx.fillRect(x + 26, y + 1, 2, 2);
    ctx.fillRect(x + 25, y + 2, 4, 1);
    ctx.fillRect(x + 26, y, 2, 4);
    // Left cat ear poking through hat
    ctx.fillStyle = '#cc7a30';
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 8);
    ctx.lineTo(x + 7, y - 4);
    ctx.lineTo(x + 16, y + 3);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ffaa70';
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 6);
    ctx.lineTo(x + 8, y - 1);
    ctx.lineTo(x + 15, y + 3);
    ctx.closePath();
    ctx.fill();

    // === CAT HEAD ===
    ctx.fillStyle = '#d4892a';
    ctx.beginPath();
    ctx.arc(x + 22, y + 22, 14, 0, Math.PI * 2);
    ctx.fill();
    // Tabby stripes on head
    ctx.fillStyle = '#b06818';
    ctx.fillRect(x + 16, y + 10, 3, 6);
    ctx.fillRect(x + 23, y + 9, 3, 5);
    ctx.fillRect(x + 30, y + 11, 2, 5);
    // Face lighter muzzle
    ctx.fillStyle = '#f0b870';
    ctx.beginPath();
    ctx.ellipse(x + 22, y + 26, 7, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    // Eyes (green cat eyes)
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.ellipse(x + 16, y + 20, 4, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + 28, y + 20, 4, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#3aaa5a';
    ctx.beginPath();
    ctx.ellipse(x + 16, y + 20, 3, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + 28, y + 20, 3, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    // Slit pupils
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(x + 15, y + 17, 2, 6);
    ctx.fillRect(x + 27, y + 17, 2, 6);
    // Eye shine
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + 17, y + 18, 2, 2);
    ctx.fillRect(x + 29, y + 18, 2, 2);
    // Nose
    ctx.fillStyle = '#c05050';
    ctx.beginPath();
    ctx.arc(x + 22, y + 26, 2, 0, Math.PI * 2);
    ctx.fill();
    // Mouth
    ctx.strokeStyle = '#804040';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x + 19, y + 29); ctx.lineTo(x + 22, y + 31); ctx.lineTo(x + 25, y + 29);
    ctx.stroke();
    // Whiskers
    ctx.strokeStyle = 'rgba(255,220,180,0.8)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x + 5, y + 25); ctx.lineTo(x + 17, y + 27); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 5, y + 28); ctx.lineTo(x + 17, y + 29); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 39, y + 25); ctx.lineTo(x + 27, y + 27); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 39, y + 28); ctx.lineTo(x + 27, y + 29); ctx.stroke();

    // === ROBE BODY ===
    ctx.fillStyle = '#5a1a8a';
    ctx.beginPath();
    ctx.moveTo(x + 6, y + 34);
    ctx.lineTo(x + 2, y + 70);
    ctx.lineTo(x + 38, y + 70);
    ctx.lineTo(x + 34, y + 34);
    ctx.closePath();
    ctx.fill();
    // Robe inner lighter panel
    ctx.fillStyle = '#c8a000';
    ctx.beginPath();
    ctx.moveTo(x + 18, y + 34);
    ctx.lineTo(x + 14, y + 70);
    ctx.lineTo(x + 26, y + 70);
    ctx.lineTo(x + 22, y + 34);
    ctx.closePath();
    ctx.fill();
    // Gem brooch
    ctx.fillStyle = '#40d8c0';
    ctx.beginPath();
    ctx.arc(x + 20, y + 38, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#aafff0';
    ctx.fillRect(x + 19, y + 35, 2, 3);
    // Robe star details
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(x + 8, y + 44, 3, 3); ctx.fillRect(x + 7, y + 45, 5, 1); ctx.fillRect(x + 9, y + 43, 1, 5);
    ctx.fillRect(x + 28, y + 50, 3, 3); ctx.fillRect(x + 27, y + 51, 5, 1); ctx.fillRect(x + 29, y + 49, 1, 5);
    // Robe edge trim (gold)
    ctx.fillStyle = '#c8a000';
    ctx.fillRect(x + 2, y + 68, 36, 3);

    // === SLEEVES ===
    ctx.fillStyle = '#5a1a8a';
    ctx.fillRect(x - 4, y + 34, 12, 22);
    ctx.fillRect(x + 32, y + 34, 12, 22);
    // Sleeve cuffs
    ctx.fillStyle = '#c8a000';
    ctx.fillRect(x - 4, y + 54, 12, 3);
    ctx.fillRect(x + 32, y + 54, 12, 3);
    // Paws (orange, with toe lines)
    ctx.fillStyle = '#d4892a';
    ctx.beginPath();
    ctx.arc(x + 2, y + 60, 6, 0, Math.PI * 2);
    ctx.fill();
    // Right paw holds staff
    ctx.fillStyle = '#d4892a';
    ctx.beginPath();
    ctx.arc(x + 38, y + 60, 6, 0, Math.PI * 2);
    ctx.fill();
    // Toe marks
    ctx.fillStyle = '#b06818';
    ctx.fillRect(x - 1, y + 57, 2, 2);
    ctx.fillRect(x + 2, y + 56, 2, 2);
    ctx.fillRect(x + 5, y + 57, 2, 2);
    ctx.fillRect(x + 35, y + 57, 2, 2);
    ctx.fillRect(x + 38, y + 56, 2, 2);
    ctx.fillRect(x + 41, y + 57, 2, 2);

    // === TAIL ===
    ctx.strokeStyle = '#d4892a';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x + 6, y + 68);
    ctx.quadraticCurveTo(x - 12, y + 58, x - 8, y + 42);
    ctx.stroke();
    // Tail tip
    ctx.fillStyle = '#f0c070';
    ctx.beginPath();
    ctx.arc(x - 8, y + 40, 5, 0, Math.PI * 2);
    ctx.fill();
    // Tabby stripe on tail
    ctx.strokeStyle = '#b06818';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + 2, y + 66);
    ctx.quadraticCurveTo(x - 8, y + 58, x - 6, y + 50);
    ctx.stroke();
}
