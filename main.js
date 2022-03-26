const operationField = document.querySelector('.calculator');
const display = document.querySelector('.display');
const resultButton = document.querySelector('.result-button');
let firstOperand = '';
let secondOperand = '';
let operator = '';
let intermediateResult = 0;
let operationHistory = '';
display.innerText = intermediateResult;

operationField.addEventListener('click', getValueOfPressedButton);

function getValueOfPressedButton(event) {
    let pressedButton = event.target;
    console.log(intermediateResult);
    if (firstOperand.length < 9 && pressedButton.classList.contains('operand') && !operator) {
        firstOperand += pressedButton.innerText;
        display.innerText = firstOperand;
    } else if (intermediateResult && !secondOperand) {
        firstOperand = intermediateResult;
        console.log(firstOperand);
    }

    if (pressedButton.classList.contains('operator') && secondOperand) {
        getIntermediateResult();
        operator = pressedButton.innerText;
        console.log(operator);
        display.innerText += operator;
    }

    if (!!firstOperand && pressedButton.classList.contains('operator') && !secondOperand) {
        operator = '';
        operator = pressedButton.innerText;
        display.innerText = firstOperand + operator;
    } 

    if (!!firstOperand && operator && pressedButton.classList.contains('operand')) {
        secondOperand += pressedButton.innerText;
        console.log(secondOperand);
        display.innerText = firstOperand + operator + secondOperand;
    }
    

    if (pressedButton.classList.contains('result-button')) {
        if (!secondOperand) {
            display.innerText = firstOperand;
        } else {
        getIntermediateResult();
        display.innerText = intermediateResult.toFixed(8);
        firstOperand = '';
        }
    }

    if (pressedButton.classList.contains('clear-button')) {
        dataReset();
        display.innerText = 0;
    }

    if (pressedButton.classList.contains('square-root') && !secondOperand) {
        display.innerText = Math.sqrt(firstOperand);
        dataReset();
    } else if (pressedButton.classList.contains('square-root') && secondOperand) {
        display.innerText = 'Error';
    }

    if (firstOperand && !secondOperand && pressedButton.classList.contains('delete-number')) {
        firstOperand = firstOperand.slice(0, -1);
        display.innerText = firstOperand;
    }

    if (secondOperand && pressedButton.classList.contains('delete-number')) {
        secondOperand = secondOperand.slice(0, -1);
        display.innerText = firstOperand + operator + secondOperand;
    }

    if (firstOperand && !secondOperand && pressedButton.classList.contains('digital-inversion')) {
        firstOperand = firstOperand * (-1);
        intermediateResult = intermediateResult * (-1);
        display.innerText = firstOperand;
    }

    if (secondOperand && pressedButton.classList.contains('digital-inversion')) {
        secondOperand = secondOperand * (-1);
        display.innerText = firstOperand + operator + secondOperand;
    }
}

function dataReset() {
    firstOperand = '';
    secondOperand = '';
    intermediateResult = 0;
    operator = '';
}

function getIntermediateResult() {
    console.log(firstOperand, secondOperand, operator);
    switch (operator) {
        case '+':
            intermediateResult = Number(firstOperand) + Number(secondOperand);
            break;
        case '−':
            intermediateResult = firstOperand - secondOperand;
            break;
        case '∗':
            intermediateResult = firstOperand * secondOperand;
            break;
        case '÷':
            intermediateResult = firstOperand / secondOperand;
            break;
    }

    operator = '';
    secondOperand = '';
    console.log(intermediateResult);
}