const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const samImage = new Image();
samImage.src = 'Sam.png';

const obstacleImages = [
    new Image(),
    new Image(),
    new Image()
];
obstacleImages[0].src = 'Sam1.png';
obstacleImages[1].src = 'Sam2.png';
obstacleImages[2].src = 'Sam3.png';

let samX = canvas.width / 2;
let samY = canvas.height - 150;
const samWidth = 55;
const samHeight = 55;

let obstacles = [];
let score = 0;
let gameOverFlag = false;

function startGame() {
    obstacles = [];
    score = 0;
    gameOverFlag = false;
    update();
}

function update() {
    if (gameOverFlag) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Sam
    ctx.drawImage(samImage, samX, samY, samWidth, samHeight);

    // Create obstacles
    if (Math.random() < 0.07) { 
        let obstacle = {
            x: Math.random() * (canvas.width - 30),
            y: -35,
            width: 40,
            height: 40,
            image: obstacleImages[Math.floor(Math.random() * obstacleImages.length)]
        };
        obstacles.push(obstacle);
    }

    // Move and draw obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].y += 5;
        ctx.drawImage(obstacles[i].image, obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);

        // Collision detection
        if (
            samX < obstacles[i].x + obstacles[i].width &&
            samX + samWidth > obstacles[i].x &&
            samY < obstacles[i].y + obstacles[i].height &&
            samY + samHeight > obstacles[i].y
        ) {
            gameOver();
            return;
        }

        // Remove off-screen obstacles
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
        }
    }

    // Update score
    score += 10;
    document.getElementById('score').textContent = "Score: " + score;

    requestAnimationFrame(update);
}

function gameOver() {
    gameOverFlag = true;
    alert("Oh no! Sam got Sam'd! Your score: " + score);
    startGame(); // Restart the game
}

// Move Sam
canvas.addEventListener('touchstart', (e) => {
    let touchX = e.touches[0].clientX;
    if (touchX < canvas.width / 2) {
        samX -= 50; // Move left
    } else {
        samX += 50; // Move right
    }

    // Keep Sam within the canvas bounds
    samX = Math.max(0, samX);
    samX = Math.min(canvas.width - samWidth, samX);
});

startGame(); // Start the game initially