const log = document.getElementById('log');
const coins = document.getElementById('coins');
const slotmachine = document.getElementById('slotmachine');
const exitdoor = document.getElementById('exitdoor');

// HUD elements
const moneyEl = document.getElementById('money');
const wonEl = document.getElementById('won');
const lostEl = document.getElementById('lost');

let moneyCounter = 0;
let moneyWon = 0;
let moneyLost = 0;
let slotmachineOpen = false;
let exitdoorOpen = false;

function updateMoneyUI() {
  if (moneyEl) moneyEl.textContent = moneyCounter;
  if (wonEl) wonEl.textContent = moneyWon;
  if (lostEl) lostEl.textContent = moneyLost;
}

function write(msg){
  document.getElementById("background").play();
  log.innerHTML += "<br>" + msg;
  log.scrollTop = log.scrollHeight;
}

coins.onclick = () => {
  moneyCounter++;
  write("Hai raccolto una moneta!");
  document.getElementById("coin").play();
  updateMoneyUI();

  coins.style.position = "absolute";
  const scene = document.querySelector('.scene');
  const coinWidth = coins.offsetWidth;
  const coinHeight = coins.offsetHeight;
  const maxLeft = scene.clientWidth - coinWidth;
  const maxTop = scene.clientHeight - coinHeight;
  const newLeft = Math.random() * maxLeft;
  const newTop = Math.random() * maxTop;
  coins.style.left = newLeft + "px";
  coins.style.top = newTop + "px";
};

slotmachine.onclick = () => {
  if (!slotmachineOpen) {
    if (moneyCounter >= 10) {
      slotmachineOpen = true;

      // Pay to play
      moneyCounter -= 10;
      updateMoneyUI();

      // Dynamic prize table (higher odds overall, scaled by bankroll)
      let prizes;
      if (moneyCounter < 300) {
        // Easy wins at the start
        prizes = [
          { coins: 1000, chance: 0.15 }, // 15%
          { coins: 500,  chance: 0.20 }, // 20%
          { coins: 100,  chance: 0.30 }, // 30%
          { coins: 50,   chance: 0.20 }, // 20%
          { coins: 10,   chance: 0.10 }, // 10%
          { coins: 0,    chance: 0.05 }  // 5%
        ];
      } else if (moneyCounter >= 300 && moneyCounter < 800) {
        // Mid-range
        prizes = [
          { coins: 1000, chance: 0.05 }, // 5%
          { coins: 500,  chance: 0.10 }, // 10%
          { coins: 100,  chance: 0.20 }, // 20%
          { coins: 50,   chance: 0.20 }, // 20%
          { coins: 10,   chance: 0.20 }, // 20%
          { coins: 0,    chance: 0.25 }  // 25%
        ];
      } else if (moneyCounter >= 800 && moneyCounter < 1000) {
        // Tougher window, but still winnable
        prizes = [
          { coins: 1000, chance: 0.005 }, // 0.5%
          { coins: 500,  chance: 0.010 }, // 1.0%
          { coins: 100,  chance: 0.030 }, // 3.0%
          { coins: 50,   chance: 0.050 }, // 5.0%
          { coins: 10,   chance: 0.100 }, // 10%
          { coins: 0,    chance: 0.805 }  // 80.5%
        ];
      } else {
        // ≥ 1000: reasonable odds
        prizes = [
          { coins: 1000, chance: 0.010 }, // 1%
          { coins: 500,  chance: 0.020 }, // 2%
          { coins: 100,  chance: 0.080 }, // 8%
          { coins: 50,   chance: 0.150 }, // 15%
          { coins: 10,   chance: 0.200 }, // 20%
          { coins: 0,    chance: 0.540 }  // 54%
        ];
      }

      // Draw a prize
      let rand = Math.random();
      let cumulative = 0;
      let prize = 0;

      for (let i = 0; i < prizes.length; i++) {
        cumulative += prizes[i].chance;
        if (rand < cumulative) {
          prize = prizes[i].coins;
          break;
        }
      }

      // Apply result
      moneyCounter += prize;
      if (prize > 0) {
        moneyWon += prize;
        write(`Hai vinto ${prize} monete alla Slot Machine!`);
        document.getElementById("winwin").play();
      } else {
        moneyLost += 10; // only count as "Perse" when losing the spin
        write("ahahahahahahhahahahahahah lol hai perso loser");
      }

      updateMoneyUI();
      slotmachineOpen = false;
    } else {
      write("mi spiace utente ma non hai 10 monete per giocare, torna quando sari più mmmmh... ricco");
    }
  } else {
    write("La Slot Machine è già in uso.");
  }
};

exitdoor.onclick = () => {
  if (!exitdoorOpen) {
    if (moneyCounter >= 10000) {
      exitdoorOpen = true;
      write("Hai alimentato la mafia e sei uscito! Vittoria 🎉");
      document.getElementById("exit").play();
    } else {
      write("La mafia è alla porta e ti chiede di pagare i 10000 euro che ti ha dato il loro capo (le goleador più interessi costano)");
    }
  } else {
    write("La porta è già aperta.");
  }
};

// init HUD
updateMoneyUI();