const editor = document.getElementById("editor");
const paper = document.getElementById("paper");

let busy = false;

editor.addEventListener("input", () => {
  if (busy) {
    return;
  }

  paper.classList.remove("replying", "typing");
  paper.textContent = editor.value;
});

editor.addEventListener("keydown", async (event) => {
  if (event.key !== "Enter" || event.shiftKey) {
    return;
  }

  event.preventDefault();

  if (busy) {
    return;
  }

  const message = editor.value.trim();

  if (!message) {
    return;
  }

  busy = true;
  editor.disabled = true;

  paper.classList.remove("replying");
  paper.textContent = message;
  paper.classList.add("fade-out");

  await wait(650);

  paper.classList.remove("fade-out");
  paper.textContent = "";
  editor.value = "";

  try {
    const response = await fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    await wait(500);
    await typeText(data.reply || "The page remains blank.");
  } catch {
    await typeText("For once, the page offers no answer.");
  }

  editor.disabled = false;
  editor.focus();
  busy = false;
});

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function typeText(text) {
  paper.textContent = "";
  paper.classList.add("typing", "replying");

  for (let i = 0; i < text.length; i++) {
    paper.textContent += text[i];
    const char = text[i];
    const delay = /[.,;:!?]/.test(char) ? 55 : 22;
    await wait(delay);
  }

  paper.classList.remove("typing");
}

editor.focus();
