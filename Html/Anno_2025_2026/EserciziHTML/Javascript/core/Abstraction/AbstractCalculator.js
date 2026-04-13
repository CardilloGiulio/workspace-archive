export class AbstractCalculator {
    constructor(displayElement) {
        if (new.target === AbstractCalculator) {
            throw new Error("AbstractCalculator cannot be instantiated directly.");
        }

        if (!displayElement) {
            throw new Error("A display element is required.");
        }

        this._displayElement = displayElement;
        this.clear();
    }

    clear() {
        this._currentOperand = "";
        this._previousOperand = "";
        this._operation = undefined;
    }

    appendNumber(number) {
        throw new Error("appendNumber() must be implemented by subclasses.");
    }

    chooseOperation(operation) {
        throw new Error("chooseOperation() must be implemented by subclasses.");
    }

    compute() {
        throw new Error("compute() must be implemented by subclasses.");
    }

    handleSpecial(action) {
        throw new Error("handleSpecial() must be implemented by subclasses.");
    }

    updateDisplay() {
        this._displayElement.innerText = this._currentOperand || "0";
    }

    get currentOperand() {
        return this._currentOperand;
    }

    get previousOperand() {
        return this._previousOperand;
    }

    get operation() {
        return this._operation;
    }

    _setCurrentOperand(value) {
        this._currentOperand = value.toString();
    }

    _setPreviousOperand(value) {
        this._previousOperand = value.toString();
    }

    _setOperation(value) {
        this._operation = value;
    }

    _parseOperands() {
        return {
            prev: parseFloat(this._previousOperand),
            current: parseFloat(this._currentOperand)
        };
    }
}