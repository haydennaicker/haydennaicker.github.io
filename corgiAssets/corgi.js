let paused = false;
let score = 0;
let speedMultiplier = 1;
let energyDepletionRateMultiplier = 1;
let highScore = 0;

const highScoreDisplay = document.getElementById('high-score'); // You need this in HTML
const corgi = document.getElementById('corgi');
const corgiBox = document.getElementById('corgi-box');
const heart = document.getElementById('heart');
const energyIcon = document.getElementById('energy-icon');
const scoreDisplay = document.getElementById('score');

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

  const speed = 1.5 * speedMultiplier;
  switch (direction) {
    case 'down': newY += speed; break;
    case 'up': newY -= speed; break;
    case 'left': newX -= speed; break;
    case 'right': newX += speed; break;
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

  energy -= energyDepletionRateMultiplier * 0.05;
  energyBar.style.width = `${energy}%`;

  if (energy <= 0) {
    gameOver();
  }
}

function updateHeartPosition() {
  if (heartVisible) {
    heart.style.left = `${x + spriteSize / 2 - 10}px`;
    heart.style.top = `${y - 25}px`;
  }

  energyBarContainer.style.left = `${x + spriteSize / 2 - 50}px`;
  energyBarContainer.style.top = `${y + 0}px`;

  energyIcon.style.left = `${x + spriteSize / 2 + 50}px`;
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
    score -= 500;
    score = Math.max(0, score);
    updateScore();
    createFloatingText('-500', parseInt(oldestPoop.style.left), parseInt(oldestPoop.style.top), false);
  }

  newPoop.addEventListener('click', () => {
    if (paused) return; // Prevent picking up poop when game is over

    corgiBox.removeChild(newPoop);
    const index = poops.indexOf(newPoop);
    if (index > -1) poops.splice(index, 1);
    score += 100;
    score = Math.max(0, score);
    updateScore();
    createFloatingText('+100', parseInt(newPoop.style.left), parseInt(newPoop.style.top), true);
});

}

// === SCORING SYSTEM ===
function updateScore() {
  scoreDisplay.innerText = `Score: ${score}`;
  if (score > highScore) {
    highScore = score;
    highScoreDisplay.innerText = `High Score: ${highScore}`;
  }
}


// === GAME OVER ===
function gameOver() {
  paused = true;
  corgi.classList.add('sleep');
  corgi.classList.add('rotate');
}

// === RESET GAME ===
function resetGame() {
  paused = false;
  score = 0;
  energy = 100;
  speedMultiplier = 1;
  energyDepletionRateMultiplier = 1;

  // Remove all poops from DOM
  poops.forEach(poop => {
    if (poop.parentNode) {
      corgiBox.removeChild(poop);
    }
  });
  poops.length = 0;

  x = 100;
  y = 100;
  direction = randomDirection();
  corgi.classList.remove('sleep');
  corgi.classList.remove('rotate');
  energyBar.style.width = `100%`;
  updateScore();
}

// === FLOATING TEXT ===
function createFloatingText(text, x, y, isPositive = true) {
  const floatingText = document.createElement('div');
  floatingText.classList.add('floating-text');
  floatingText.classList.add(isPositive ? 'floating-positive' : 'floating-negative');
  floatingText.innerText = text;
  floatingText.style.left = `${x}px`;
  floatingText.style.top = `${y}px`;

  corgiBox.appendChild(floatingText);

  setTimeout(() => {
    if (floatingText.parentNode) {
      corgiBox.removeChild(floatingText);
    }
  }, 1000);
}

// === CORGI INTERACTION ===
corgi.addEventListener('click', () => {
  if (paused) {
    resetGame();
    return;
  }

  score += 10;
  score = Math.max(0, score);
  updateScore();
  createFloatingText('+10', x + spriteSize / 2, y, true);

  energy = 100;
  energyBar.style.width = `100%`;

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
  }, 800);

  dropPoop();

  speedMultiplier = 1 + (score / 500);
  energyDepletionRateMultiplier = 1 + (score / 500);
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

const toggleButton = document.getElementById('toggle-rules');
const rules = document.getElementById('game-rules');
const icon = toggleButton.querySelector('i');

toggleButton.addEventListener('click', () => {
    rules.classList.toggle('visible');

    if (rules.classList.contains('visible')) {
        toggleButton.innerHTML = '<i class="las la-chevron-circle-up"></i> Hide Rules';
    } else {
        toggleButton.innerHTML = '<i class="las la-chevron-circle-down"></i> Show Rules';
    }
});

