// all info

document.getElementById("homeBtn").onclick = () => (window.location.href = "home.html");
document.getElementById("aboutBtn").onclick = () => (window.location.href = "about.html");
document.getElementById("contactBtn").onclick = () => (window.location.href = "contact.html");
document.getElementById("gameBtn").onclick = () => (window.location.href = "game.html");

// --- Card 1 ---
const img1and1 = document.getElementById("1&1");
const img1and2 = document.getElementById("1&2");
const img1and3 = document.getElementById("1&3");
const img1and4 = document.getElementById("1&4");
const img1and5 = document.getElementById("1&5");
const img1and6 = document.getElementById("1&6");
const card1 = [img1and1, img1and2, img1and3, img1and4, img1and5, img1and6];

// --- Card 2 ---
const img2and1 = document.getElementById("2&1");
const img2and2 = document.getElementById("2&2");
const img2and3 = document.getElementById("2&3");
const img2and4 = document.getElementById("2&4");
const img2and5 = document.getElementById("2&5");
const img2and6 = document.getElementById("2&6");
const card2 = [img2and1, img2and2, img2and3, img2and4, img2and5, img2and6];

// --- Card 3 ---
const img3and1 = document.getElementById("3&1");
const img3and2 = document.getElementById("3&2");
const img3and3 = document.getElementById("3&3");
const img3and4 = document.getElementById("3&4");
const img3and5 = document.getElementById("3&5");
const img3and6 = document.getElementById("3&6");
const card3 = [img3and1, img3and2, img3and3, img3and4, img3and5, img3and6];

// --- Card 4 ---
const img4and1 = document.getElementById("4&1");
const img4and2 = document.getElementById("4&2");
const img4and3 = document.getElementById("4&3");
const img4and4 = document.getElementById("4&4");
const img4and5 = document.getElementById("4&5");
const img4and6 = document.getElementById("4&6");
const card4 = [img4and1, img4and2, img4and3, img4and4, img4and5, img4and6];

// --- Card 5 ---
const img5and1 = document.getElementById("5&1");
const img5and2 = document.getElementById("5&2");
const img5and3 = document.getElementById("5&3");
const img5and4 = document.getElementById("5&4");
const img5and5 = document.getElementById("5&5");
const img5and6 = document.getElementById("5&6");
const card5 = [img5and1, img5and2, img5and3, img5and4, img5and5, img5and6];

// --- Card 6 ---
const img6and1 = document.getElementById("6&1");
const img6and2 = document.getElementById("6&2");
const img6and3 = document.getElementById("6&3");
const img6and4 = document.getElementById("6&4");
const img6and5 = document.getElementById("6&5");
const img6and6 = document.getElementById("6&6");
const card6 = [img6and1, img6and2, img6and3, img6and4, img6and5, img6and6];

// --- Card 7 ---
const img7and1 = document.getElementById("7&1");
const img7and2 = document.getElementById("7&2");
const img7and3 = document.getElementById("7&3");
const img7and4 = document.getElementById("7&4");
const img7and5 = document.getElementById("7&5");
const img7and6 = document.getElementById("7&6");
const card7 = [img7and1, img7and2, img7and3, img7and4, img7and5, img7and6];

// --- Card 8 ---
const img8and1 = document.getElementById("8&1");
const img8and2 = document.getElementById("8&2");
const img8and3 = document.getElementById("8&3");
const img8and4 = document.getElementById("8&4");
const img8and5 = document.getElementById("8&5");
const img8and6 = document.getElementById("8&6");
const card8 = [img8and1, img8and2, img8and3, img8and4, img8and5, img8and6];

// --- Card 9 ---
const img9and1 = document.getElementById("9&1");
const img9and2 = document.getElementById("9&2");
const img9and3 = document.getElementById("9&3");
const img9and4 = document.getElementById("9&4");
const img9and5 = document.getElementById("9&5");
const img9and6 = document.getElementById("9&6");
const card9 = [img9and1, img9and2, img9and3, img9and4, img9and5, img9and6];

// --- Card 10 ---
const img10and1 = document.getElementById("10&1");
const img10and2 = document.getElementById("10&2");
const img10and3 = document.getElementById("10&3");
const img10and4 = document.getElementById("10&4");
const img10and5 = document.getElementById("10&5");
const img10and6 = document.getElementById("10&6");
const card10 = [img10and1, img10and2, img10and3, img10and4, img10and5, img10and6];

// --- Card 11 ---
const img11and1 = document.getElementById("11&1");
const img11and2 = document.getElementById("11&2");
const img11and3 = document.getElementById("11&3");
const img11and4 = document.getElementById("11&4");
const img11and5 = document.getElementById("11&5");
const img11and6 = document.getElementById("11&6");
const card11 = [img11and1, img11and2, img11and3, img11and4, img11and5, img11and6];

// --- Card 12 ---
const img12and1 = document.getElementById("12&1");
const img12and2 = document.getElementById("12&2");
const img12and3 = document.getElementById("12&3");
const img12and4 = document.getElementById("12&4");
const img12and5 = document.getElementById("12&5");
const img12and6 = document.getElementById("12&6");
const card12 = [img12and1, img12and2, img12and3, img12and4, img12and5, img12and6];

const board = {
  "1-1": card1,
  "1-2": card2,
  "1-3": card3,
  "2-1": card4,
  "2-2": card5,
  "2-3": card6,
  "3-1": card7,
  "3-2": card8,
  "3-3": card9,
  "4-1": card10,
  "4-2": card11,
  "4-3": card12
};

let flippedCards = [];
let pairs = [];
let lockBoard = false;
let matchedPairs = 0;

// functions


function assignPairs(board) {
  let cards = Object.keys(board);
  cards.sort(() => Math.random() - 0.5);
  let images = [0,0,1,1,2,2,3,3,4,4,5,5];
  images.sort(() => Math.random() - 0.5);
  let imageAssignments = {};

  for (let i = 0; i < cards.length; i++) {
    let cardId = cards[i];
    let card = board[cardId];
    let imgIndex = images[i];
    card.forEach(img => img.style.display = "none");
    card[imgIndex].style.display = "block";
    imageAssignments[cardId] = imgIndex;
  }

  pairs = [];

  for (let i = 0; i < images.length; i++) {
    for (let j = i + 1; j < images.length; j++) {
      let card1 = cards[i];
      let card2 = cards[j];
      if (imageAssignments[card1] === imageAssignments[card2]) {
        pairs.push([card1, card2]);
      }
    }
  }

  console.log("Pairs assigned:", pairs);
}

function enableFlipCards() {
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
      if (lockBoard || card.classList.contains('matched')) return;
      aCardWasFlipped(card);
    });
  });
}

function aCardWasFlipped(card) {
  const ariaName = card.getAttribute('aria-label');
  let location = null;
  if (ariaName === 'Card 1') location = '1-1';
  else if (ariaName === 'Card 2') location = '1-2';
  else if (ariaName === 'Card 3') location = '1-3';
  else if (ariaName === 'Card 4') location = '2-1';
  else if (ariaName === 'Card 5') location = '2-2';
  else if (ariaName === 'Card 6') location = '2-3';
  else if (ariaName === 'Card 7') location = '3-1';
  else if (ariaName === 'Card 8') location = '3-2';
  else if (ariaName === 'Card 9') location = '3-3';
  else if (ariaName === 'Card 10') location = '4-1';
  else if (ariaName === 'Card 11') location = '4-2';
  else if (ariaName === 'Card 12') location = '4-3';

  if (location) card.dataset.location = location;
  card.classList.toggle('flipped');
  if (card.classList.contains('flipped')) flippedCards.push(card);
  else flippedCards = flippedCards.filter(c => c !== card);

  if (flippedCards.length === 2) {
    lockBoard = true;
    const [loc1, loc2] = flippedCards.map(c => c.dataset.location || null);
    const isPair = !!loc1 && !!loc2 && pairs.some(p =>
      (p[0] === loc1 && p[1] === loc2) || (p[0] === loc2 && p[1] === loc1)
    );

    if (isPair) {
      flippedCards.forEach(c => c.classList.add('matched'));
      flippedCards = [];
      lockBoard = false;
      matchedPairs++;
      if (matchedPairs === 6) setTimeout(() => window.location.href = "endGame.html", 800);
    } else {
      setTimeout(() => {
        flippedCards.forEach(c => c.classList.remove('flipped'));
        flippedCards = [];
        lockBoard = false;
      }, 1000);
    }
  }
}

function flipAllCardsFront() {
  document.querySelectorAll('.flip-card').forEach(card => {
    card.classList.remove('flipped');
  });
}

function Game() {
  assignPairs(board);
  enableFlipCards();

  document.getElementById("startGameBtn").disabled = true;
  document.getElementById("resetBtn").disabled = false;
}

function setUp() {
  assignPairs(board);
  document.getElementById("resetBtn").disabled = true;

  document.getElementById("resetBtn").onclick = () => {
    flipAllCardsFront();
    setTimeout(() => {
      assignPairs(board);
    }, 200);
    flippedCards = [];
  };
}

// Initial setup

setUp();

// main game function

document.getElementById("startGameBtn").onclick = () => {
  Game();
};