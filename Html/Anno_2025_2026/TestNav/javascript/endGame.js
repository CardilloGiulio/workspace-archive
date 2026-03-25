'use strict';

/* ===== utilities ===== */
const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => [...root.querySelectorAll(q)];
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const choice = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ===== karma ticker ===== */
let karma = 42;
const karmaEl = $('#karma');

setInterval(() => {
  karma += Math.max(1, Math.floor(karma * 0.003)) + rand(1, 3);
  karmaEl.textContent = karma.toLocaleString();
}, 600);

/* ===== floating bits (upvotes & awards) ===== */
function floatThing(txt, cls, x = rand(5, 95), y = rand(60, 90)) {
  const e = document.createElement('div');
  e.className = `float ${cls}`;
  e.textContent = txt;
  e.style.left = `${x}vw`;
  e.style.top = `${y}vh`;
  document.body.appendChild(e);

  const dx = (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 2);
  let t = 0;

  const id = setInterval(() => {
    t += 16;
    const up = y - t / 32;

    e.style.transform = `translate(${(dx * t) / 64}px, ${-t / 64}px) rotate(${
      t / 30
    }deg)`;
    e.style.opacity = String(1 - t / 1200);

    if (up < -10) {
      clearInterval(id);
      e.remove();
    }
  }, 16);
}

function upvoteBurst(n = 24) {
  for (let i = 0; i < n; i += 1) {
    setTimeout(
      () => floatThing('⬆', 'upvote', rand(8, 92), rand(40, 88)),
      i * 20,
    );
  }
}

function giveRandomAward() {
  const awards = [
    ['🥇', 'goldCount'],
    ['🥈', 'silverCount'],
    ['💎', 'platCount'],
    ['🏅', 'goldCount'],
    ['🌟', 'platCount'],
    ['🧡', 'goldCount'],
  ];

  const [sym, id] = choice(awards);
  floatThing(sym, 'award', rand(15, 85), rand(30, 80));

  const el = document.getElementById(id);
  el.textContent = Number(el.textContent) + 1;
}

/* ===== r/place mini board ===== */
const colors = [
  '#ff4500',
  '#ffd700',
  '#17c964',
  '#7193ff',
  '#ff66c4',
  '#ffffff',
  '#000000',
  '#9c27b0',
  '#00ffd5',
  '#00ff6a',
  '#ff8a00',
];

const place = $('#place');
const SIZE = 24;
const cells = [];

for (let i = 0; i < SIZE * SIZE; i += 1) {
  const d = document.createElement('div');
  d.className = 'px';
  d.dataset.i = String(i);
  place.appendChild(d);
  cells.push(d);
}

let painting = false;

function paintCell(el) {
  el.style.background = choice(colors);
}

place.addEventListener('pointerdown', (e) => {
  if (e.target.classList.contains('px')) {
    painting = true;
    paintCell(e.target);
  }
});

place.addEventListener('pointerover', (e) => {
  if (painting || e.shiftKey) {
    if (e.target.classList.contains('px')) {
      paintCell(e.target);
    }
  }
});

window.addEventListener('pointerup', () => {
  painting = false;
});

$('#btnClean').onclick = () => {
  cells.forEach((c) => {
    c.style.background = '#111820';
  });
};

$('#btnChaos').onclick = () => {
  const r = rand(0, SIZE - 1);
  for (let c = 0; c < SIZE; c += 1) {
    paintCell(cells[r * SIZE + c]);
  }
};

/* ===== fake comment feed ===== */
const feed = $('#feed');

const names = [
  'u/QuantumBread',
  'u/ItsJustMath',
  'u/CertifiedBased',
  'u/PixelKnight',
  'u/OverlyHelpfulBot',
  'u/SpaghettiPilot',
  'u/SudoDoge',
  'u/Ok-Algorithm-9000',
];

const lines = [
  'OP speedran the tutorial and somehow any%’d the credits. Respect.',
  'I came for answers, I left with confetti in my RAM.',
  'This deserves 1000 updoots and a slice of virtual pizza.',
  'Teacher brain says: rubric 10/10, meme brain says: send it.',
  'Not all heroes wear capes; some press F on cooldown.',
  'As a developer, I can confirm this code compiles into pure dopamine.',
  'Stonks 📈',
  'Doge saw this and said much congrats, very wow.',
];

function makeComment(txt) {
  const c = document.createElement('div');
  c.className = 'comment';
  c.innerHTML = `
    <div class="avatar"></div>
    <div>
      <div class="meta">
        <b>${choice(names)}</b>
        · <span>${rand(1, 59)} min ago</span>
        · <span>↑ ${rand(42, 4200)}</span>
      </div>
      <div class="content">${txt}</div>
    </div>
  `;
  feed.prepend(c);
}

function randomComment() {
  makeComment(choice(lines));
}

for (let i = 0; i < 6; i += 1) {
  randomComment();
}

setInterval(() => {
  if (feed.childElementCount > 50) {
    feed.lastElementChild.remove();
  }
  randomComment();
}, 3000);

$('#btnPost').onclick = () => {
  const input = $('#input');
  const v = input.value.trim();
  if (!v) return;

  makeComment(v);
  input.value = '';
  upvoteBurst(8);
  giveRandomAward();
};

/* ===== lil interactions ===== */
$('#btnUpvoteRain').onclick = () => upvoteBurst(80);
$('#btnAward').onclick = () => giveRandomAward();

/* mini vote widget */
let mini = 69;

$('#upOne').onclick = () => {
  mini += 1;
  $('#miniScore').textContent = `+${mini}`;
  floatThing('⬆', 'upvote', 12, 30);
};

$('#downOne').onclick = () => {
  mini = Math.max(0, mini - 1);
  $('#miniScore').textContent = `+${mini}`;
  floatThing('⬇', 'upvote', 12, 30);
};

/* ===== WebAudio airhorn (no external files) ===== */
let ctx;

function airhorn() {
  ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
  const o = ctx.createOscillator();
  const g = ctx.createGain();

  o.type = 'square';
  o.frequency.value = 440;

  o.connect(g);
  g.connect(ctx.destination);

  g.gain.setValueAtTime(0.001, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.8, ctx.currentTime + 0.02);

  o.start();

  // quick pitch slide + decay
  o.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.25);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
  o.stop(ctx.currentTime + 0.36);
}

/* ===== SUS popups ===== */
function spawnSus() {
  const e = document.createElement('div');
  e.className = 'float';
  e.style.fontSize = `${rand(20, 48)}px`;
  e.style.left = `${rand(5, 95)}vw`;
  e.style.top = `${rand(55, 90)}vh`;
  e.textContent = choice(['ඞ', '🟥', '🟦', '🟩']);

  document.body.appendChild(e);

  let t = 0;
  const id = setInterval(() => {
    t += 16;
    e.style.transform = `translateY(${-t / 28}px)`;
    e.style.opacity = String(1 - t / 1200);

    if (t > 1200) {
      clearInterval(id);
      e.remove();
    }
  }, 16);
}

/* ===== Press F to pay respects ===== */
function payRespects() {
  floatThing('F', 'spark', rand(20, 80), rand(60, 88));
  makeComment('Paid respects. OP ascends another +1 level.');
}

/* ===== Rickroll modal ===== */
const modal = $('#modal');
const yt = $('#yt');

function openRick() {
  modal.style.display = 'grid';
  yt.src =
    'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&controls=1';
}

function closeRick() {
  modal.style.display = 'none';
  yt.src = '';
}

$('#btnRick').onclick = openRick;
$('#closeModal').onclick = closeRick;

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeRick();
  }
});

/* ===== keyboard chaos ===== */
window.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();

  if (k === 'f') payRespects();
  if (k === 'a') giveRandomAward();
  if (k === 'u') upvoteBurst(60);
  if (k === 'b') airhorn();
  if (k === 's') spawnSus();
  if (k === 'r') openRick();
});

/* ===== autoplay little celebrations ===== */
setTimeout(() => {
  upvoteBurst(30);
  giveRandomAward();
}, 1200);

setTimeout(() => {
  upvoteBurst(40);
}, 3000);