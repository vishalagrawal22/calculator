function operate (num1, num2, operator) {
    if (operator === '+') {
        return add (num1,num2);
    } else if (operator === '-') {
        return subtract (num1, num2);
    } else if (operator === '*') {
        return multiply (num1, num2);
    } else if (operator === '/') {
        return divide (num1, num2);
    }
}

function add (num1, num2) {
    return num1 + num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    return num1 / num2;
}

const numberButtonsList = document.querySelectorAll(".numbers");
const clearButtonsList = document.querySelectorAll(".clear");
const operatorButtonsList = document.querySelectorAll(".operators");
const equalsButton = document.querySelector(".equals");
const preSolutionDisplay = document.querySelector(".presolution");
const postSolutionDisplay = document.querySelector(".postsolution");

let num1 = null;
let num2 = null;
let operator = "";

numberButtonsList.forEach(numberButton => numberButton.addEventListener("click", (event) => {
    preSolutionDisplay.textContent += event.target.value;
}));

clearButtonsList.forEach(clearButton => clearButton.addEventListener("click", (event) => {
    if (event.target.value === "clear") {
        let currentText = preSolutionDisplay.textContent;
        preSolutionDisplay.textContent = currentText.substring(0, currentText.length - 1);
    } else if (event.target.value === "clear all") {
        clearVariables();
        preSolutionDisplay.textContent = "";
        postSolutionDisplay.textContent = "";
    }
}));

operatorButtonsList.forEach(operatorButton => operatorButton.addEventListener("click", (event) => {
    num1 = Number(preSolutionDisplay.textContent);
    operator =  event.target.value;
    preSolutionDisplay.textContent += event.target.value;
}));

equalsButton.addEventListener("click", (event) => {
    currentText = preSolutionDisplay.textContent;
    numString = currentText.substring(currentText.indexOf(operator) + 1);
    if (numString !== "") {
        num2 = Number(numString);
    }
    if (num1 !== null && num2 !== null && operator) {
        postSolutionDisplay.textContent = currentText;
        let result = +operate(num1,num2,operator).toFixed(9);
        preSolutionDisplay.textContent = result;
        clearVariables();
    }
});

function clearVariables() {
    num1 = null;
    num2 = null;
    operator = "";
}