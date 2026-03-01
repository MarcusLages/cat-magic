import { symbols } from './symbols.js';

const square_btn = document.getElementById("square");
const triang_btn = document.getElementById("triangle");
const circle_btn = document.getElementById("circle");
const losang_btn = document.getElementById("losangle");

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