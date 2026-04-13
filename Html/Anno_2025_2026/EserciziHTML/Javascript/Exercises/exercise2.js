const outputElement = document.getElementById('output');
const textElement = document.getElementById('text');
const inputElement = document.getElementById('newText');

let clickCount = 0;

function showMessage() {
    clickCount++;

    if (clickCount === 1) {
        outputElement.innerHTML += "<p>This is the first message.</p>";
    } else if (clickCount === 2) {
        outputElement.innerHTML += "<p>This is the second message.</p>";
    } else if (clickCount === 3) {
        outputElement.innerHTML += "<p>This is the third message.</p>";
    }
}

function changeText() {
    const newText = inputElement.value.trim();

    if (newText !== "") {
        textElement.textContent = newText;
        inputElement.value = "";
    }
}