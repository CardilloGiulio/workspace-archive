export function initializeExercise1({ createCalculator }) {
    const displayElement = document.querySelector(".display");
    const numberButtons = document.querySelectorAll(".btn-number");
    const operatorButtons = document.querySelectorAll(".btn-operator");
    const equalsButton = document.querySelector(".btn-equals");
    const clearButton = document.querySelector(".btn-clear");
    const signButton = document.querySelector(".btn-sign");
    const percentButton = document.querySelector(".btn-percent");
    const decimalButton = document.querySelector(".btn-decimal");

    if (!displayElement) {
        throw new Error("Exercise 1 requires a display element.");
    }

    if (typeof createCalculator !== "function") {
        throw new Error("Exercise 1 requires a calculator factory.");
    }

    const calculator = createCalculator(displayElement);

    numberButtons.forEach((button) => {
        button.addEventListener("click", () => {
            calculator.appendNumber(button.innerText);
            calculator.updateDisplay();
        });
    });

    decimalButton?.addEventListener("click", () => {
        calculator.appendNumber(".");
        calculator.updateDisplay();
    });

    operatorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            calculator.chooseOperation(button.innerText);
            calculator.updateDisplay();
        });
    });

    equalsButton?.addEventListener("click", () => {
        calculator.compute();
        calculator.updateDisplay();
    });

    clearButton?.addEventListener("click", () => {
        calculator.handleSpecial("C");
        calculator.updateDisplay();
    });

    signButton?.addEventListener("click", () => {
        calculator.handleSpecial("±");
        calculator.updateDisplay();
    });

    percentButton?.addEventListener("click", () => {
        calculator.handleSpecial("%");
        calculator.updateDisplay();
    });

    calculator.updateDisplay();
}
