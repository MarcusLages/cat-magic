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

        const randomLeft = Math.random() * (containerWidth - targetWidth);
        const randomTop = Math.random() * (containerHeight - targetHeight);

        this.target.style.left = `${randomLeft}px`;
        this.target.style.top = `${randomTop}px`;
        this.m = Math.random() * 4 - 2;
        this.b = Math.random() * 100;
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

function store_target_variables(tagetVars) {
    const m = Math.random() * (10);
    const b = Math.random() * (10);
    tagetVars.push([m, b]);
}

function move_targets(targets, x) {
    console.log(targets);

    targets.forEach(targetObj => {
        const m = targetObj.m;
        const b = targetObj.b;

        const y = get_y(m, b, x);
        move(targetObj.target, x, y);
    });
}

function shooting_bullet(container, bullet, targets) {
    let x = 0;

    const startLeft = parseFloat(window.getComputedStyle(bullet).left);
    const startTop = parseFloat(window.getComputedStyle(bullet).top);

    bullet.hidden = false;

    let IntervalId = setInterval(() => {
        let y = get_y(2, 0, x);

        bullet.style.left = startLeft + x + "px";
        bullet.style.top = startTop - y + "px";
        x+=1;
        
        if(finish_shooting(container, bullet)) {
            move_bullet_to_start_point(bullet);
            move_targets(targets, x);
            clearInterval(IntervalId);
        }
    }, 5);
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
const targetVars = [];
let targets = [];
const x = 0;

startBtn.addEventListener("click", (event) => {
    targets.length = 0;
    container.querySelectorAll(".targets").forEach(t => t.remove());

    for (let i=0; i < 5; i++) {
        const target = new Target(container);
        target.placeTargetRandomly();
        store_target_variables(targetVars);
        targets.push(target);
    }

});

runBtn.addEventListener("click", (event) => {
    shooting_bullet(container, bullet, targets);
});

