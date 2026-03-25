// Get all necessary DOM elements
const displayElement = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.btn-number');
const operatorButtons = document.querySelectorAll('.btn-operator');
const equalsButton = document.querySelector('.btn-equals');
const clearButton = document.querySelector('.btn-clear');
const signButton = document.querySelector('.btn-sign');
const percentButton = document.querySelector('.btn-percent');
const decimalButton = document.querySelector('.btn-decimal');

// Define the calculator ecosystem (state and logic)
class Calculator {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.displayElement.innerText = this.currentOperand || '0';
    }

    handleSpecial(operation) {
        switch (operation) {
            case 'C':
                this.clear();
                break;
            case '±':
                this.currentOperand = (parseFloat(this.currentOperand) * -1).toString();
                break;
            case '%':
                this.currentOperand = (parseFloat(this.currentOperand) / 100).toString();
                break;
        }
    }
}

// Initialize the calculator instance
const calculator = new Calculator(displayElement);

// Work on the ecosystem: add event listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

decimalButton.addEventListener('click', () => {
    calculator.appendNumber('.');
    calculator.updateDisplay();
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
    calculator.handleSpecial('C');
    calculator.updateDisplay();
});

signButton.addEventListener('click', () => {
    calculator.handleSpecial('±');
    calculator.updateDisplay();
});

percentButton.addEventListener('click', () => {
    calculator.handleSpecial('%');
    calculator.updateDisplay();
});