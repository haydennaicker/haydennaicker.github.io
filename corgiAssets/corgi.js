const corgi = document.getElementById('corgi');
const corgiBox = document.getElementById('corgi-box'); // The container div
const heart = document.getElementById('heart'); // moved here for clarity

const spriteSize = 160;
let x = 100;
let y = 100;
let direction = 'down';
let frame = 0;
let frameDelay = 5; // How many loops before the frame updates
let frameCount = 0;

const directions = {
  down: 0,
  left: 1,
  right: 2,
  up: 3
};

let heartVisible = false; // Track if heart is visible
let heartTimeout;

function updateSprite() {
  corgi.style.backgroundPosition = `-${frame * spriteSize}px -${directions[direction] * spriteSize}px`;
}

function moveCorgi() {
  // Determine movement
  let newX = x;
  let newY = y;

  switch (direction) {
    case 'down': newY += 1.5; break;
    case 'up': newY -= 1.5; break;
    case 'left': newX -= 1.5; break;
    case 'right': newX += 1.5; break;
  }

  // Get the boundaries of the corgi-box
  const boxRect = corgiBox.getBoundingClientRect();
  const maxX = boxRect.width - spriteSize;
  const maxY = boxRect.height - spriteSize;

  // Check for boundaries and change direction if necessary
  if (newX <= 0 || newX >= maxX || newY <= 0 || newY >= maxY) {
    changeDirection(); // Change direction immediately if hitting a boundary
  }

  // Clamp position within the corgi-box boundaries
  x = Math.max(0, Math.min(newX, maxX));
  y = Math.max(0, Math.min(newY, maxY));

  corgi.style.top = `${y}px`;
  corgi.style.left = `${x}px`;

  // Update frame only after a delay
  frameCount++;
  if (frameCount >= frameDelay) {
    frameCount = 0;
    frame = (frame + 1) % 4; // Cycle through 4 frames
    updateSprite();
  }
}

function randomDirection() {
  const directionsArray = ['down', 'up', 'left', 'right'];
  const randomIndex = Math.floor(Math.random() * directionsArray.length);
  return directionsArray[randomIndex];
}

function changeDirection() {
  direction = randomDirection();
}

// Update heart position to follow corgi if visible
function updateHeartPosition() {
  if (heartVisible) {
    heart.style.left = `${x + spriteSize / 2 - 15}px`;
    heart.style.top = `${y - 40}px`;
  }
}

// Randomly change direction every 2 seconds
setInterval(changeDirection, 2000); // Change direction every 2 seconds

// Initially set a random direction
direction = randomDirection();

function gameLoop() {
  moveCorgi();

  // Update heart position if visible
  if (heartVisible) updateHeartPosition();

  requestAnimationFrame(gameLoop);
}

updateSprite();
gameLoop();

corgi.addEventListener('click', () => {
  // Spin
  corgi.classList.add('spin');
  setTimeout(() => corgi.classList.remove('spin'), 500);

  // Show heart and make it follow the corgi
  heartVisible = true;
  heart.style.opacity = 1;
  updateHeartPosition();

  // Hide heart after delay
  clearTimeout(heartTimeout);
  heartTimeout = setTimeout(() => {
    heart.style.opacity = 0;
    heartVisible = false;
  }, 800);
});
