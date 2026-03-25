"use strict";

const state = {
  score: 0,
  perClick: 1,
  upgrades: {
    upg_disciples: 0,
    upg_miracles: 0,
    upg_holy_music: 0,
    upg_prayers: 0,
    upg_church: 0,
    upg_scripture: 0,
    upg_relics: 0,
    upg_pilgrimage: 0,
    upg_cathedral: 0,
    upg_choir: 0,
    upg_candles: 0,
    upg_gospels: 0
  }
};

const miracleState = {
  peterRocketActive: false
};

const ASSETS = {
  saint: "./images/saint_generic.png",
  peterRocket: "./images/saint_peter_rocket.png",
  star: "./images/star.png",
  angel: "./images/angel.png",
  michael: "./images/archangel_michael.png",
  cloud: "./images/cloud.png"
};

const MIRACLE_CHECK_INTERVAL = 1500;
const FOLLOWER_MAX = 30;

const scoreEl = document.getElementById("score");
const bibleBtn = document.getElementById("bible-btn");
const playArea = document.querySelector(".play-area");
const followersEl = document.getElementById("followers");
const upgradeButtons = Array.from(document.querySelectorAll(".upgrade-item[data-upg]"));
const blessingEl = document.getElementById("blessing");
const blessingTimerEl = document.getElementById("blessing-timer");

const audio = {
  loop: new Audio("./audio/holy_loop_01.mp3"),
  click: new Audio("./audio/click.mp3"),
  choir: new Audio("./audio/choir_hit.mp3")
};

audio.choir.loop = true;
audio.choir.volume = 0.75;

audio.loop.loop = true;
audio.loop.volume = 0.6;
audio.click.volume = 0.8;

let audioStarted = false;

const upgrades = {
  upg_disciples:  { base: 15,       scale: 1.15 },
  upg_miracles:   { base: 120,      scale: 1.17 },
  upg_holy_music: { base: 400,      scale: 1.18 },
  upg_prayers:    { base: 900,      scale: 1.20 },
  upg_church:     { base: 2500,     scale: 1.22 },
  upg_scripture:  { base: 7500,     scale: 1.23 },
  upg_relics:     { base: 25000,    scale: 1.25 },
  upg_pilgrimage: { base: 80000,    scale: 1.27 },
  upg_cathedral:  { base: 250000,   scale: 1.30 },
  upg_choir:      { base: 800000,   scale: 1.32 },
  upg_candles:    { base: 2400000,  scale: 1.35 },
  upg_gospels:    { base: 10000000, scale: 1.40 }
};

function fmt(n) {
  return Math.floor(n).toLocaleString("en-US");
}

function cost(id) {
  const u = upgrades[id];
  return Math.ceil(u.base * Math.pow(u.scale, state.upgrades[id]));
}

function startAudio() {
  if (audioStarted) return;
  audioStarted = true;
  audio.loop.currentTime = 0;
  audio.loop.play().catch(() => {});
}

function miracleChance() {
  return Math.min(state.upgrades.upg_miracles * 0.02, 0.35);
}

const holyMusicState = {
  angelsActive: false,
  blessingUntil: 0
};

function holyMusicChance() {
  return Math.min(state.upgrades.upg_holy_music * 0.015, 0.25);
}

function blessingActive() {
  return Date.now() < holyMusicState.blessingUntil;
}

function setBlessing(seconds) {
  holyMusicState.blessingUntil = Date.now() + seconds * 1000;
  updateBlessingHud();
}

function updateBlessingHud() {
  if (!blessingEl || !blessingTimerEl) return;
  const leftMs = holyMusicState.blessingUntil - Date.now();
  if (leftMs <= 0) {
    blessingEl.hidden = true;
    return;
  }
  blessingEl.hidden = false;
  blessingTimerEl.textContent = String(Math.ceil(leftMs / 1000));
}


function spawnFloatText(x, y, text) {
  const r = playArea.getBoundingClientRect();
  const el = document.createElement("div");
  el.className = "float-text";
  el.textContent = text;
  el.style.left = x - r.left + "px";
  el.style.top = y - r.top + "px";
  playArea.appendChild(el);
  el.addEventListener("animationend", () => el.remove(), { once: true });
}

function followerCount() {
  return followersEl ? followersEl.childElementCount : 0;
}

function spawnFollower() {
  if (!followersEl || followerCount() >= FOLLOWER_MAX) return;
  const img = document.createElement("img");
  img.className = "follower";
  img.src = ASSETS.saint;
  img.alt = "";
  followersEl.appendChild(img);
}

function spawnStar() {
  const star = document.createElement("img");
  star.className = "star";
  star.src = ASSETS.star;
  star.alt = "";

  star.style.left = Math.random() * (window.innerWidth - 32) + "px";
  star.style.animationDuration = 3 + Math.random() * 2 + "s";

  star.addEventListener("click", () => {
    const s = stats();
    const bonus = Math.floor(s.clickPower * s.faithPerSec);
    if (bonus > 0) {
      state.score += bonus;
      spawnFloatText(
        parseInt(star.style.left, 10),
        window.innerHeight * 0.5,
        `+${fmt(bonus)}`
      );
      render();
    }
    star.remove();
  });

  document.getElementById("game-container").appendChild(star);
  star.addEventListener("animationend", () => star.remove(), { once: true });
}

function stats() {
  const L = state.upgrades;

  const baseFps =
    L.upg_disciples * 0.2 +
    L.upg_holy_music * 1.5 +
    L.upg_prayers * 3 +
    L.upg_pilgrimage * 20 +
    L.upg_choir * 120;

  const discipleBonus = Math.floor(L.upg_disciples / 10);

  const miraclesFlat =
    (L.upg_miracles >= 5 ? 2 : 0) +
    (L.upg_miracles >= 10 ? 2 : 0) +
    (L.upg_miracles >= 25 ? 3 : 0);

  let clickMult = Math.pow(1.25, L.upg_miracles) * Math.pow(1.40, L.upg_scripture);

  let globalMult =
    (1 + 0.10 * L.upg_church) *
    Math.pow(1.25, L.upg_cathedral) *
    (1 + 0.005 * L.upg_relics) *
    (1 + 0.02 * L.upg_gospels);

  const prayerSteps = Math.floor(L.upg_prayers / 25);
  if (prayerSteps > 0) globalMult *= Math.pow(1.05, prayerSteps);

  let clickPower = (state.perClick + discipleBonus + miraclesFlat) * clickMult * globalMult;
  let faithPerSec = baseFps * globalMult;

  if (blessingActive()) {
    clickPower *= 3;
    faithPerSec *= 3;
  }

	return { clickPower, faithPerSec };

}

function spawnCloud(x) {
  const img = document.createElement("img");
  img.className = "cloud";
  img.src = ASSETS.cloud;
  img.alt = "";
  img.style.left = "0px";
  document.getElementById("game-container").appendChild(img);
  return img;
}

function spawnAngel(x, isMichael) {
  const img = document.createElement("img");
  img.className = isMichael ? "angel michael" : "angel";
  img.src = isMichael ? ASSETS.michael : ASSETS.angel;
  img.alt = "";

  const startX = Math.max(0, Math.min(window.innerWidth - 80, x));
  const startY = -80;

  const endY = window.innerHeight + 120;
  const drift = (Math.random() - 0.5) * (window.innerWidth * 0.55);
  const endX = Math.max(0, Math.min(window.innerWidth - 80, startX + drift));

  img.style.left = startX + "px";
  img.style.top = startY + "px";

  img.addEventListener("click", () => {
    if (isMichael) setBlessing(120);
    img.remove();
    render();
  });

  document.getElementById("game-container").appendChild(img);

  const duration = isMichael
    ? (1600 + Math.random() * 600)
    : (2600 + Math.random() * 2200);

  img.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${endX - startX}px, ${endY - startY}px)` }
    ],
    { duration, easing: "ease-in-out" }
  );

  setTimeout(() => img.remove(), duration);
}

function triggerAngelRain() {
  if (holyMusicState.angelsActive) return;
  holyMusicState.angelsActive = true;

  if (audioStarted) {
    audio.loop.pause();
  }
  audio.choir.currentTime = 0;
  audio.choir.play().catch(() => {});

  const x = Math.max(20, Math.min(window.innerWidth - 180, Math.floor(Math.random() * (window.innerWidth - 180))));
  const cloud = spawnCloud(x);

  const duration = 12000;
  const spawnEvery = 140;


  let spawnedMichael = false;

  const spawner = setInterval(() => {
    const shouldMichael = !spawnedMichael && Math.random() < 0.12;
    if (shouldMichael) spawnedMichael = true;
	const spawnX = Math.floor(Math.random() * (window.innerWidth - 80));
	spawnAngel(spawnX, shouldMichael);
  }, spawnEvery);

  setTimeout(() => {
    clearInterval(spawner);
    cloud.remove();
    holyMusicState.angelsActive = false;

    audio.choir.pause();
    audio.choir.currentTime = 0;
    if (audioStarted) audio.loop.play().catch(() => {});
  }, duration);
}

setInterval(updateBlessingHud, 250);

setInterval(() => {
  if (holyMusicState.angelsActive) return;
  if (Math.random() < holyMusicChance()) triggerAngelRain();
}, 1700);


function effectText(id) {
  const L = state.upgrades[id];

  if (id === "upg_disciples") return `+0.2 faith/sec per level. Every 10 levels: +${Math.floor(L / 10)} click.`;
  if (id === "upg_miracles") {
    const flat =
      (L >= 5 ? 2 : 0) + (L >= 10 ? 2 : 0) + (L >= 25 ? 3 : 0);
    const next = L < 5 ? 5 : L < 10 ? 10 : L < 25 ? 25 : null;
    return `×1.25 click power per level. Flat bonus: +${flat}.${next ? " Next at " + next + "." : ""}`;
  }
  if (id === "upg_holy_music") return "+1.5 faith/sec per level.";
  if (id === "upg_prayers") return "+3 faith/sec per level. Every 25 levels: ×1.05 global.";
  if (id === "upg_church") return "+10% faith/sec multiplier per level.";
  if (id === "upg_scripture") return "×1.40 click power per level.";
  if (id === "upg_relics") return "+0.5% global per level.";
  if (id === "upg_pilgrimage") return "+20 faith/sec per level.";
  if (id === "upg_cathedral") return "×1.25 global multiplier per level.";
  if (id === "upg_choir") return "+120 faith/sec per level.";
  if (id === "upg_candles") return "Sanctuary Shield per level (later).";
  if (id === "upg_gospels") return "+2% global per level.";

  return "";
}

function render() {
  scoreEl.textContent = fmt(state.score);

  for (const btn of upgradeButtons) {
    const id = btn.dataset.upg;
    const lvl = state.upgrades[id];
    const c = cost(id);
    const unlocked = state.score >= upgrades[id].base || lvl > 0;
    const affordable = state.score >= c;

    btn.hidden = !unlocked;
    btn.disabled = !affordable;
    btn.classList.toggle("is-affordable", affordable);
    btn.classList.toggle("is-disabled", !affordable);

    btn.querySelector(".cost").textContent = fmt(c);
    btn.querySelector(".lvl").textContent = lvl;
    btn.querySelector(".effect").textContent = effectText(id);
  }
}

function buyUpgrade(id) {
  const c = cost(id);
  if (state.score < c) return;
  state.score -= c;
  state.upgrades[id] += 1;
  if (id === "upg_disciples") spawnFollower();
  render();
}

function clickBible(e) {
  startAudio();
  const s = stats();
  const gain = Math.max(1, Math.floor(s.clickPower));
  state.score += gain;
  audio.click.currentTime = 0;
  audio.click.play().catch(() => {});
  spawnFloatText(e.clientX, e.clientY, `+${fmt(gain)}`);
  render();
}

function triggerPeterRocket() {
  if (miracleState.peterRocketActive) return;

  miracleState.peterRocketActive = true;

  const starTimer = setInterval(() => {
    if (!miracleState.peterRocketActive) {
      clearInterval(starTimer);
      return;
    }
    spawnStar();
  }, 350);

  const img = document.createElement("img");
  img.className = "peter-rocket";
  img.src = ASSETS.peterRocket;
  img.alt = "";

  const fromLeft = Math.random() < 0.5;
  const startX = fromLeft ? -120 : innerWidth + 120;
  const endX = fromLeft ? innerWidth + 120 : -120;
  const startY = Math.random() * innerHeight * 0.6;
  const endY = Math.random() * innerHeight * 0.6;

  img.style.left = startX + "px";
  img.style.top = startY + "px";
  document.getElementById("game-container").appendChild(img);

  const duration = 4200;

  img.animate(
    [{ transform: "translate(0,0)" },
     { transform: `translate(${endX - startX}px, ${endY - startY}px) rotate(${fromLeft ? 20 : -20}deg)` }],
    { duration, easing: "ease-in-out" }
  );

  setTimeout(() => {
    img.remove();
    miracleState.peterRocketActive = false;
    clearInterval(starTimer);
  }, duration);
}

setInterval(() => {
  if (Math.random() < miracleChance()) triggerPeterRocket();
}, MIRACLE_CHECK_INTERVAL);

bibleBtn.addEventListener("click", clickBible);
upgradeButtons.forEach(b => b.addEventListener("click", () => buyUpgrade(b.dataset.upg)));

let last = Date.now();
setInterval(() => {
  const now = Date.now();
  const dt = (now - last) / 1000;
  last = now;
  const s = stats();
  if (s.faithPerSec > 0) {
    state.score += s.faithPerSec * dt;
    render();
  }
}, 200);

render();