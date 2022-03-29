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
    let firstOperandExists = firstOperand && !secondOperand;

    gettingFirstOperand(pressedButton);

    settingValueOfFirstOperandIfIntermediateResultExist();

    addingFractionalPartToFirstOperand(pressedButton);

    settingOperator(pressedButton);

    changingOperatorWhenOnlyFirstOperandExist(pressedButton);

    gettingSecondOperand(pressedButton);

    addingFractionalPartToSecondOperand(pressedButton);

    gettingSquareRoot(pressedButton);

    deletingNumbersFromOperands(pressedButton, firstOperandExists);

    changingOperandFromPositiveToNegative(pressedButton, firstOperandExists);

    gettingResult(pressedButton);

    clearingResult(pressedButton);
}

function gettingFirstOperand(pressedButton) {
    let addingNumbersToFirstOperand = pressedButton.classList.contains('operand') && !operator;

    if (addingNumbersToFirstOperand) {
        firstOperand += pressedButton.innerText;
        display.innerText = firstOperand;
    }
}

function settingValueOfFirstOperandIfIntermediateResultExist() {
    if (intermediateResult && !secondOperand) {
        firstOperand = intermediateResult;
    }
}

function addingFractionalPartToFirstOperand(pressedButton) {
    let addingFractionalPartToFirstOperand = pressedButton.classList.contains('separator') && !operator && !separator;

    if (addingFractionalPartToFirstOperand) {
        firstOperand = firstOperand.length > 0 ? firstOperand += pressedButton.innerText : firstOperand = 0 + pressedButton.innerText;
        display.innerText = firstOperand;
        separator = true;
    }
}

function settingOperator(pressedButton) {
    if (pressedButton.classList.contains('operator')) {
        separator = false;
        getIntermediateResult();
        operator = pressedButton.innerText;
        display.innerText = intermediateResult + operator;
    }
}

function changingOperatorWhenOnlyFirstOperandExist(pressedButton) {
    let operatorToChange = !secondOperand && !intermediateResult;

    if (pressedButton.classList.contains('operator') && operatorToChange) {
        operator = '';
        operator = pressedButton.innerText;
        display.innerText = firstOperand + operator;;
    }
}

function gettingSecondOperand(pressedButton) {
    let enteringSecondOperand = !!firstOperand && operator && pressedButton.classList.contains('operand');

    if (enteringSecondOperand) {
        secondOperand += pressedButton.innerText;
        display.innerText = firstOperand + operator + secondOperand;
    }
}

function addingFractionalPartToSecondOperand(pressedButton) {
    let addingFractionalPartToSecondOperand = firstOperand && operator && !separator && pressedButton.classList.contains('separator');

    if (addingFractionalPartToSecondOperand) {
        secondOperand = secondOperand.length > 0 ? secondOperand += pressedButton.innerText : secondOperand = 0 + pressedButton.innerText;
        display.innerText = secondOperand.length > 0 ? firstOperand + operator + secondOperand : display.innerText += secondOperand;
        separator = true;
    }
}

function gettingSquareRoot(pressedButton) {
    if (pressedButton.classList.contains('square-root')) {
        intermediateResult = !secondOperand ? Math.sqrt(firstOperand).toFixed(8) : Math.sqrt(getIntermediateResult()).toFixed(8);
        display.innerText = intermediateResult;
    }
}

function deletingNumbersFromOperands(pressedButton, firstOperandExists) {

    if (!pressedButton.classList.contains('delete-number')) {
        return;
    }

    if (firstOperandExists) {
        firstOperand = firstOperand.length > 1 ? firstOperand.slice(0, -1) : 0;
        display.innerText = firstOperand;
        dataResetAfterDeletingAllSymbols(firstOperand);
    } else {
        secondOperand = secondOperand.slice(0, -1);
        display.innerText = firstOperand + operator + secondOperand;
        dataResetAfterDeletingAllSymbols(secondOperand);
    }
}

function changingOperandFromPositiveToNegative(pressedButton, firstOperandExists) {
    if (!pressedButton.classList.contains('digital-inversion')) {
        return;
    }

    if (firstOperandExists) {
        firstOperand = firstOperand * (-1);
        intermediateResult = intermediateResult * (-1);
        display.innerText = firstOperand;
    } else {
        secondOperand = secondOperand * (-1);
        display.innerText = firstOperand + operator + secondOperand;
    }
}

function gettingResult(pressedButton) {
    if (!pressedButton.classList.contains('result-button')) {
        return;
    }

    separator = false;

    if (!secondOperand) {
        display.innerText = firstOperand;
    } else {
        getIntermediateResult();
        display.innerText = intermediateResult.toFixed(8);
        firstOperand = '';
    }
}

function clearingResult(pressedButton) {
    if (pressedButton.classList.contains('clear-button')) {
        dataReset();
        display.innerText = 0;
    }
}

function dataReset() {
    firstOperand = '';
    secondOperand = '';
    intermediateResult = 0;
    operator = '';
    separator = false;
}

function dataResetAfterDeletingAllSymbols(operand) {
    if (operand === 0) {
        dataReset();
        display.innerText = 0;
    }
}

function getIntermediateResult() {
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

    return intermediateResult;
}