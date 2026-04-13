import { AbstractCalculator } from "../Abstraction/AbstractCalculator.js";

export class BasicCalculator extends AbstractCalculator {
    constructor(displayElement) {
        super(displayElement);
    }

    appendNumber(number) {
        if (number === "." && this._currentOperand.includes(".")) {
            return;
        }

        this._currentOperand = this._currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this._currentOperand === "") {
            return;
        }

        if (this._previousOperand !== "") {
            this.compute();
        }

        this._operation = operation;
        this._previousOperand = this._currentOperand;
        this._currentOperand = "";
    }

    compute() {
        const { prev, current } = this._parseOperands();

        if (isNaN(prev) || isNaN(current)) {
            return;
        }

        let computation;

        switch (this._operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "/":
                computation = current === 0 ? "Error" : prev / current;
                break;
            default:
                return;
        }

        this._currentOperand = computation.toString();
        this._operation = undefined;
        this._previousOperand = "";
    }

    handleSpecial(action) {
        switch (action) {
            case "C":
                this.clear();
                break;

            case "±":
                if (this._currentOperand === "" || this._currentOperand === "Error") {
                    return;
                }
                this._currentOperand = (parseFloat(this._currentOperand) * -1).toString();
                break;

            case "%":
                if (this._currentOperand === "" || this._currentOperand === "Error") {
                    return;
                }
                this._currentOperand = (parseFloat(this._currentOperand) / 100).toString();
                break;

            default:
                throw new Error(`Unsupported special action: ${action}`);
        }
    }
}