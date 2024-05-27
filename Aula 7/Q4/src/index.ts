import { add } from "./mathFunctions";
import { substract } from "./mathFunctions";
import { multiply } from "./mathFunctions";
import { divide } from "./mathFunctions";
import "./index.css";

const buttonAdd = <HTMLButtonElement>document.querySelector("#button-add");
const buttonSubstract = <HTMLButtonElement>document.querySelector("#button-substract");
const buttonMultiply = <HTMLButtonElement>document.querySelector("#button-multiply");
const buttonDivide = <HTMLButtonElement>document.querySelector("#button-divide");
const buttonClear = <HTMLButtonElement>document.querySelector("#button-clear");

const num1 = <HTMLInputElement>(document.querySelector("input[name='firstnumber']"));
const num2 = <HTMLInputElement>(document.querySelector("input[name='secondnumber']"));

function init(): void { 
    buttonAdd.addEventListener("click", addFunction);
    buttonSubstract.addEventListener("click", subFunction);
    buttonMultiply.addEventListener("click", multiFunction);
    buttonDivide.addEventListener("click", divideFunction);
    buttonClear.addEventListener("click", clearResult);
}

function addFunction(e: Event):void {
    e.preventDefault();

    const result = add(Number(num1.value), Number(num2.value));
    const resultElement = <HTMLSpanElement>document.querySelector("#display");
    if(resultElement){
        resultElement.textContent = result.toString();
    }
}

function subFunction(e: Event):void {
    e.preventDefault();

    const result = substract(Number(num1.value), Number(num2.value));
    const resultElement = <HTMLSpanElement>document.querySelector("#display");
    if(resultElement){
        resultElement.textContent = result.toString();
    }
}

function multiFunction(e: Event):void {
    e.preventDefault();

    const result = multiply(Number(num1.value), Number(num2.value));
    const resultElement = <HTMLSpanElement>document.querySelector("#display");
    if(resultElement){
        resultElement.textContent = result.toString();
    }
}

function divideFunction(e: Event):void {
    e.preventDefault();

    const result = divide(Number(num1.value), Number(num2.value));
    const resultElement = <HTMLSpanElement>document.querySelector("#display");
    if(resultElement){
        resultElement.textContent = result.toString();
    }
}

function clearResult(e: Event):void{
    e.preventDefault();

    const resultElement = <HTMLSpanElement>document.querySelector("#display");
    resultElement.innerText = "";

    num1.value = "";
    num2.value = "";
}


init();