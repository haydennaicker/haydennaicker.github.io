let paused = false;

const corgi = document.getElementById('corgi');
const corgiBox = document.getElementById('corgi-box');
const heart = document.getElementById('heart');
const energyIcon = document.getElementById('energy-icon');

const spriteSize = 160;
let x = 100;
let y = 100;
let direction = 'down';
let frame = 0;
let frameDelay = 5;
let frameCount = 0;

const directions = {
  down: 0,
  left: 1,
  right: 2,
  up: 3
};

let heartVisible = false;
let heartTimeout;
let energy = 100;
const energyDepleteRate = 0.05;

const energyBarContainer = document.getElementById('energy-bar-container');
const energyBar = document.getElementById('energy-bar');

let corgiClickCount = 0;

const maxPoops = 10;
const poops = [];

// === SPRITE ===
function updateSprite() {
  corgi.style.backgroundPosition = `-${frame * spriteSize}px -${directions[direction] * spriteSize}px`;
}

// === MOVEMENT ===
function moveCorgi() {
  if (paused) return;

  let newX = x;
  let newY = y;

  switch (direction) {
    case 'down': newY += 1.5; break;
    case 'up': newY -= 1.5; break;
    case 'left': newX -= 1.5; break;
    case 'right': newX += 1.5; break;
  }

  const boxRect = corgiBox.getBoundingClientRect();
  const maxX = boxRect.width - spriteSize;
  const maxY = boxRect.height - spriteSize;

  if (newX <= 0 || newX >= maxX || newY <= 0 || newY >= maxY) {
    changeDirection();
  }

  x = Math.max(0, Math.min(newX, maxX));
  y = Math.max(0, Math.min(newY, maxY));

  corgi.style.top = `${y}px`;
  corgi.style.left = `${x}px`;

  frameCount++;
  if (frameCount >= frameDelay) {
    frameCount = 0;
    frame = (frame + 1) % 4;
    updateSprite();
  }
}

function randomDirection() {
  const directionsArray = ['down', 'up', 'left', 'right'];
  return directionsArray[Math.floor(Math.random() * directionsArray.length)];
}

function changeDirection() {
  direction = randomDirection();
}

function updateEnergyBar() {
  if (paused) return;

  energy = Math.max(0, energy - energyDepleteRate);
  energyBar.style.width = `${energy}%`;

  if (energy <= 0 && !paused) {
    paused = true;
    corgi.classList.add('sleep');
  }
}

function updateHeartPosition() {
  if (heartVisible) {
    heart.style.left = `${x + spriteSize / 2 - 15}px`;
    heart.style.top = `${y - 10}px`;
  }

  energyBarContainer.style.left = `${x + spriteSize / 2 - 50}px`;
  energyBarContainer.style.top = `${y + 0}px`;

  energyIcon.style.left = `${x + spriteSize / 2 + 50}px`; // icon right of energy bar
  energyIcon.style.top = `${y - 15}px`;
}

// === POOP ===
function dropPoop() {
  const newPoop = document.createElement('div');
  newPoop.classList.add('poop');
  newPoop.style.position = 'absolute';
  newPoop.style.left = `${x + spriteSize / 2 - 16}px`;
  newPoop.style.top = `${y + spriteSize - 10}px`;
  newPoop.style.width = '32px';
  newPoop.style.height = '32px';
  newPoop.style.backgroundSize = 'contain';
  newPoop.style.backgroundRepeat = 'no-repeat';
  newPoop.style.zIndex = 8;

  corgiBox.appendChild(newPoop);
  poops.push(newPoop);

  if (poops.length > maxPoops) {
    const oldestPoop = poops.shift();
    corgiBox.removeChild(oldestPoop);
  }

  newPoop.addEventListener('click', () => {
    corgiBox.removeChild(newPoop);
    const index = poops.indexOf(newPoop);
    if (index > -1) poops.splice(index, 1);
  });
}

// === CORGI INTERACTION ===
corgi.addEventListener('click', () => {
  corgiClickCount++;

  if (corgiClickCount % 2 === 0) {
    dropPoop();
  }

  if (!paused) {
    corgi.classList.add('spin');
    setTimeout(() => corgi.classList.remove('spin'), 500);
  }

  heartVisible = true;
  heart.style.opacity = 1;
  updateHeartPosition();

  clearTimeout(heartTimeout);
  heartTimeout = setTimeout(() => {
    heart.style.opacity = 0;
    heartVisible = false;
  }, 800);

  energy = 100;
  energyBar.style.width = `100%`;

  if (paused) {
    paused = false;
    corgi.classList.remove('sleep');
  }
});

// === INIT ===
setInterval(changeDirection, 2000);
direction = randomDirection();
updateSprite();
gameLoop();

function gameLoop() {
  if (!paused) {
    moveCorgi();
    updateEnergyBar();
    energyIcon.style.backgroundImage = "url('../corgiAssets/energy.png')";
  } else {
    energyIcon.style.backgroundImage = "url('../corgiAssets/sleep.png')";
  }

  updateHeartPosition();
  requestAnimationFrame(gameLoop);
}
