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
const decimal = document.querySelector(".decimal");
const preSolutionDisplay = document.querySelector(".presolution");
const postSolutionDisplay = document.querySelector(".postsolution");
const operationOrder = ['*','/','+','-'];

let numbers = [];
let operators = [];
let startIndex = 0;

numberButtonsList.forEach(numberButton => numberButton.addEventListener("click", (event) => {
    preSolutionDisplay.textContent += event.target.value;
}));

clearButtonsList.forEach(clearButton => clearButton.addEventListener("click", (event) => {
    if (event.target.value === "clear") {
        let currentText = preSolutionDisplay.textContent;
        preSolutionDisplay.textContent = currentText.substring(0, currentText.length - 1);
        let deleted = currentText.charAt(currentText.length - 1);
        if (deleted === ".") {
            decimal.addEventListener("click", addDecimal);
        }
        else if (deleted === "*" || deleted === "/" || deleted === "+" ||deleted === "-") {
            numbers.pop();
            operators.pop();
            startIndex = preSolutionDisplay.textContent.lastIndexOf(operators[operators.length - 1]) + 1;
        }
    } else if (event.target.value === "clear all") {
        clearVariables();
        clearScreen();
    }
}));

operatorButtonsList.forEach(operatorButton => operatorButton.addEventListener("click", (event) => {
    let currentText = preSolutionDisplay.textContent.trim();
    let currentNum = currentText.substring(startIndex);
    if (currentNum !== "") {
        numbers.push(Number(currentNum));
        operators.push(event.target.value);
        startIndex = currentText.length + 1;
        preSolutionDisplay.textContent += event.target.value;
    }
    decimal.addEventListener("click", addDecimal);
}));

equalsButton.addEventListener("click", (event) => {
    let currentText = preSolutionDisplay.textContent.trim();
    let currentNum = currentText.substring(startIndex);
    let exit = 0;
    if (currentNum !== "" && operators.length !== 0) {
        numbers.push(Number(currentNum));
        outer: for (let i = 0; i < operationOrder.length; i++) {
            for (let j = 0; j < operators.length; j++) {
                if (operationOrder[i] === operators[j]) {
                    if (operators[j] === "/" && numbers[j+1] === 0) {
                        exit = 1;
                        break outer;
                    }
                    let tempResult = operate(numbers[j], numbers[j+1], operators[j]);
                    operators.splice(j, 1);
                    numbers.splice(j, 2, tempResult);
                }
            }
        }   
        if (exit === 0) {
            let finalResult = +numbers[0].toFixed(5);
            postSolutionDisplay.style.color = "grey"
            postSolutionDisplay.textContent = preSolutionDisplay.textContent;
            preSolutionDisplay.textContent = finalResult;
            resultString = finalResult.toString();
            if (resultString.indexOf(".") === -1) {
                decimal.addEventListener("click", addDecimal);
            }
        }
        else {
            postSolutionDisplay.style.color = "#f00"
            postSolutionDisplay.textContent = "can't divide by 0";
            preSolutionDisplay.textContent = "";
        }
        clearVariables();
    }
});

decimal.addEventListener("click", addDecimal);

function addDecimal() {
    if (preSolutionDisplay.textContent.substring(startIndex).trim() !== "") {
        preSolutionDisplay.textContent += ".";
        decimal.removeEventListener("click", addDecimal);
    }
}

function clearVariables() {
    numbers = [];
    operators = [];
    startIndex = 0;
}

function clearScreen() {
    decimal.addEventListener("click", addDecimal);
    preSolutionDisplay.textContent = "";
    postSolutionDisplay.textContent = "";
}

document.addEventListener('keydown', function(event) {
    const buttonList = document.querySelectorAll('input');
    buttonList.forEach(button => {
        if (button.value === event.key) {
            button.click();
        }
        if (event.key === "Enter" && button.value === "=") {
            button.click();
        }
        if (event.key === "Backspace" && button.value === "clear") {
            button.click();
        }
        if (event.key === "Backspace" && button.value === "clear all" && event.repeat) {
            button.click();
        }
    });

});