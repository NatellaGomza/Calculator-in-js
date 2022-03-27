const operationField = document.querySelector('.calculator');
const display = document.querySelector('.display');
let separator = false;
let firstOperand = '';
let secondOperand = '';
let operator = '';
let intermediateResult = 0;
let operationHistory = '';
display.innerText = intermediateResult;

operationField.addEventListener('click', getValueOfPressedButton);

function getValueOfPressedButton(event) {
    let pressedButton = event.target;
    if (firstOperand.length < 9 && pressedButton.classList.contains('operand') && !operator) {
        firstOperand += pressedButton.innerText;
        display.innerText = firstOperand;
    } else if (intermediateResult && !secondOperand) {
        firstOperand = intermediateResult;
    }
    
    if (firstOperand.length < 9 && firstOperand.length > 0 && pressedButton.classList.contains('separator') && !operator && !separator) {
        firstOperand += pressedButton.innerText;
        display.innerText = firstOperand;
        separator = true;
    } else if (firstOperand.length === 0 && pressedButton.classList.contains('separator') && !operator && !separator) {
        firstOperand = 0 + pressedButton.innerText;
        display.innerText = firstOperand;
        separator = true;
    }

    if (pressedButton.classList.contains('operator')) {  
        separator = false;      
        getIntermediateResult();
        operator = pressedButton.innerText;
        display.innerText = intermediateResult + operator;
    }

    if (!!firstOperand && pressedButton.classList.contains('operator') && !secondOperand && !intermediateResult) {
        operator = '';
        operator = pressedButton.innerText;
        display.innerText = firstOperand + operator;;
    } 

    if (secondOperand.length < 9 && !!firstOperand && operator && pressedButton.classList.contains('operand')) {
        secondOperand += pressedButton.innerText;
        display.innerText = firstOperand + operator + secondOperand;
    }

    if (secondOperand.length < 9 && secondOperand.length > 0 && !!firstOperand && operator && pressedButton.classList.contains('separator') && !separator) {
        secondOperand += pressedButton.innerText;
        display.innerText = firstOperand + operator + secondOperand;
        separator = true;
    } else if (secondOperand.length === 0 && pressedButton.classList.contains('separator') && operator && !separator) {
        secondOperand = 0 + pressedButton.innerText;
        display.innerText += secondOperand;
        separator = true;
    }

    if (pressedButton.classList.contains('result-button')) {
        separator = false;
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
        intermediateResult = Math.sqrt(firstOperand).toFixed(8);
        display.innerText = intermediateResult;
    } else if (pressedButton.classList.contains('square-root') && secondOperand) {
        getIntermediateResult();
        intermediateResult = Math.sqrt(intermediateResult).toFixed(8);
        display.innerText = intermediateResult;
    }

    if (firstOperand && !secondOperand && pressedButton.classList.contains('delete-number')) {
        firstOperand = firstOperand.length > 1 ? firstOperand.slice(0, -1) : 0;
        display.innerText = firstOperand;
        if (firstOperand === 0) {
            dataReset();
            display.innerText = 0;
        }        
    }

    if (secondOperand && pressedButton.classList.contains('delete-number')) {
        console.log(secondOperand, firstOperand);
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
    separator = false;
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
}