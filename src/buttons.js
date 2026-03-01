import { symbols } from './symbols.js';

const square_btn = document.getElementById("square");
const triang_btn = document.getElementById("triangle");
const circle_btn = document.getElementById("circle");
const losang_btn = document.getElementById("losangle");
const clean_btn = document.getElementById("clean");
const run_btn = document.getElementById("run");

const curr_shape = {
    name: null,
    shape: null
};

square_btn.addEventListener("click", () => {
    if(curr_shape.name == square_btn.textContent) {
        curr_shape.shape.a++;
    } else {
        curr_shape.name = square_btn.textContent
        curr_shape.shape = { a: 1, e: 0 };
        symbols.add_symbol(curr_shape.shape);
    }
});

triang_btn.addEventListener("click", () => {
    if(curr_shape.name == triang_btn.textContent) {
        curr_shape.shape.a++;
    } else {
        curr_shape.name = triang_btn.textContent
        curr_shape.shape = { a: -1, e: 0 };
        symbols.add_symbol(curr_shape.shape);
    }
});

circle_btn.addEventListener("click", () => {
    if(curr_shape.name == circle_btn.textContent) {
        curr_shape.shape.a++;
    } else {
        curr_shape.name = circle_btn.textContent
        curr_shape.shape = { a: 1, e: 1 };
        symbols.add_symbol(curr_shape.shape);
    }
});

losang_btn.addEventListener("click", () => {
    if(curr_shape.name == losang_btn.textContent) {
        curr_shape.shape.a++;
    } else {
        curr_shape.name = losang_btn.textContent
        curr_shape.shape = { a: -1, e: 1 };
        symbols.add_symbol(curr_shape.shape);
    }
});

clean_btn.addEventListener("click", () => {
    curr_shape.name = null;
    curr_shape.shape = null;
    symbols.cleanup();
});

run_btn.addEventListener("click", () => {
    for(let i = 0; i < 10; i++) {
        console.log(i, symbols(i));
    }
    symbols.polys.length = 0;
});