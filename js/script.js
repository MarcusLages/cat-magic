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
        const containerWidth = this.container.offsetWidth;
        const containerHeight = this.container.offsetHeight;
        const targetWidth = this.target.offsetWidth;
        const targetHeight = this.target.offsetHeight;

        const maxLeft = containerWidth - targetWidth;
        const maxTop = containerHeight - targetHeight;

        const randomLeft = Math.floor(Math.random() * (maxLeft + 1));
        const randomTop = Math.floor(Math.random() * (maxTop + 1));

        this.target.style.left = `${randomLeft}px`;
        this.target.style.top = `${randomTop}px`;
    }
}

function get_y(m, b, x) {
    return m * x + b
}

function move(element, x, y) {
    let elStyle = window.getComputedStyle(element);
    let horizontalValue = elStyle.getPropertyValue("left").replace("px", "");
    let verticleValue = elStyle.getPropertyValue("top").replace("px", "");
    element.style.left = (Number(horizontalValue) + x) + "px";
    element.style.top = (Number(verticleValue) + y) + "px";
}

function shooting_bullet(container, bullet) {
    let x = 0;

    const startLeft = parseFloat(window.getComputedStyle(bullet).left);
    const startTop = parseFloat(window.getComputedStyle(bullet).top);

    bullet.hidden = false;

    let IntervalId = setInterval(() => {
        let y = get_y(2, 0, x);

        bullet.style.left = startLeft + x + "px";
        bullet.style.top = startTop - y + "px";
        x+=5;
        
        if(finish_shooting(container, bullet)) {
            move_bullet_to_start_point(bullet);
            clearInterval(IntervalId);
        }
    }, 20);
}

function finish_shooting(container, bullet) {
    let bulletRect = bullet.getBoundingClientRect();
    let containerRect = container.getBoundingClientRect();

    return bulletRect.right <= containerRect.left ||
    bulletRect.left >= containerRect.right ||
    bulletRect.bottom <= containerRect.top ||
    bulletRect.top >= containerRect.bottom;
}

function move_bullet_to_start_point(bullet) {
    bullet.style.top = "200px";
    bullet.style.left = "0px";
    bullet.hidden = true;
}



const container = document.getElementById("container");
const bullet = document.getElementById("bullet");
const startBtn = document.getElementById("startBtn");
const runBtn = document.getElementById("runBtn");

startBtn.addEventListener("click", (event) => {
    const targets = document.querySelectorAll(".targets");

    targets.forEach(target => {
        target.remove();
    });

    for (let i=0; i < 5; i++) {
        const target = new Target(container);
        target.placeTargetRandomly();
    }
});

runBtn.addEventListener("click", (event) => {
    shooting_bullet(container, bullet);
});

