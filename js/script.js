class Target {
    constructor(container) {
        this.target = document.createElement("div");
        this.target.classList.add("targets");
        this.target.style.position = "absolute";
        this.target.style.width = "50px";
        this.target.style.height = "50px";
        this.container = container;
        this.target.style.backgroundColor = "red";
        this.container.appendChild(this.target);
    }

    placeTargetRandomly() {
        const containerWidth = this.container.clientWidth;
        const containerHeight = this.container.clientWidth;

        const targetWidth = this.target.offsetWidth;
        const targetHeight = this.target.offsetHeight;

        const randomTop = Math.random() * (containerHeight - targetHeight);

        this.target.style.left = `${containerWidth - targetWidth}px`;
        this.target.style.top = `${randomTop}px`;
        this.m = Math.random() * 4 - 2;
        this.b = Math.random() * 100;
    }
}

function getY(m, b, x) {
    return m * x + b
}

function move(element, x, y) {
    let elStyle = window.getComputedStyle(element);
    let horizontalValue = elStyle.getPropertyValue("left").replace("px", "");
    let verticleValue = elStyle.getPropertyValue("top").replace("px", "");
    element.style.left = (Number(horizontalValue) + x) + "px";
    element.style.top = (Number(verticleValue) + y) + "px";
}

function moveTargets(targets) {
    targets.forEach(targetObj => {
        move(targetObj.target, -50, 0);
    });
}

function shootingBullet(container, bullet, targets) {
    let x = 0;

    const startLeft = parseFloat(window.getComputedStyle(bullet).left);
    const startTop = parseFloat(window.getComputedStyle(bullet).top);

    bullet.hidden = false;

    let IntervalId = setInterval(() => {
        let y = getY(1, -2, x);

        bullet.style.left = startLeft + x + "px";
        bullet.style.top = startTop - y + "px";
        x+=1;

        if(isTouching(bullet, targets)) {
            numTargetRemoved++;
            console.log(`Number of targets removed: ${numTargetRemoved}`)

        }

        if(finishShooting(container, bullet)) {
            moveBulletToStartPoint(bullet);
            moveTargets(targets);
            clearInterval(IntervalId);
        }
    }, 5);
}

function isTouching(bullet, targets) {
    const bulletRect = bullet.getBoundingClientRect();

    for (let i = targets.length - 1; i>=0; i--) {
        const targetObj = targets[i];
        const targetRect = targetObj.target.getBoundingClientRect();
        const horizontalOverlap = bulletRect.right > targetRect.left && bulletRect.left < targetRect.right;
        const verticalOverlap = bulletRect.bottom > targetRect.top && bulletRect.top < targetRect.bottom;

        if (horizontalOverlap && verticalOverlap) {
            targetObj.target.remove();
            targets.splice(i, 1);
            return true;
        }
    };

    return false;
}

function finishShooting(container, bullet) {
    let bulletRect = bullet.getBoundingClientRect();
    let containerRect = container.getBoundingClientRect();

    return bulletRect.right <= containerRect.left ||
    bulletRect.left >= containerRect.right ||
    bulletRect.bottom <= containerRect.top ||
    bulletRect.top >= containerRect.bottom;
}

function moveBulletToStartPoint(bullet) {
    bullet.style.top = "200px";
    bullet.style.left = "0px";
    bullet.hidden = true;
}



const container = document.getElementById("container");
const bullet = document.getElementById("bullet");
const startBtn = document.getElementById("startBtn");
const runBtn = document.getElementById("runBtn");
let targets = [];
const x = 0;
let numTargetRemoved = 0;

startBtn.addEventListener("click", (event) => {
    targets.length = 0;
    numTargetRemoved = 0;
    container.querySelectorAll(".targets").forEach(t => t.remove());

    for (let i=0; i < 5; i++) {
        const target = new Target(container);
        target.placeTargetRandomly();
        targets.push(target);
    }

});

runBtn.addEventListener("click", (event) => {
    shootingBullet(container, bullet, targets, numTargetRemoved);
});