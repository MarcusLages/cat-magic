function get_y(m, e, b, x) {
    return m * x**e + b
}

function move(element, x, y) {
    let elStyle = window.getComputedStyle(element);
    let horizontalValue = elStyle.getPropertyValue("left").replace("px", "");
    let verticleValue = elStyle.getPropertyValue("top").replace("px", "");
    element.style.left = (Number(horizontalValue) + x) + "px";
    element.style.top = (Number(verticleValue) + y) + "px";
}

function shooting_bullet() {
    let x = 0;
    let IntervalId = setInterval(() => {
        let y = get_y(2, 2, 0, x);

        move(bullet, x, y);
        x++;
        
        if(finish_shooting()) {
            clearInterval(IntervalId);
            bullet.hidden = true;
        }
    }, 500);
}

function finish_shooting() {
    let bulletRect = bullet.getBoundingClientRect();
    let containerRect = container.getBoundingClientRect();

    return bulletRect.right <= containerRect.left ||
    bulletRect.left >= containerRect.right ||
    bulletRect.bottom <= containerRect.top ||
    bulletRect.top >= containerRect.bottom;
}



let bullet = document.getElementById("bullet");
let button = document.getElementById("button");

button.addEventListener("click", shooting_bullet);
