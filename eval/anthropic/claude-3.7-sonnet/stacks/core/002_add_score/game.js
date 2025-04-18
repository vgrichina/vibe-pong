// Get canvas and context
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Initialize score
let score = 0;
const scoreDisplay = document.getElementById('score');

// Game objects
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 4,
    speedY: 4
};

const paddle = {
    width: 100,
    height: 10,
    x: canvas.width / 2 - 50,
    y: canvas.height - 20,
    speed: 8,
    isMovingLeft: false,
    isMovingRight: false
};

// Handle keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        paddle.isMovingLeft = true;
    } else if (e.key === 'ArrowRight') {
        paddle.isMovingRight = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') {
        paddle.isMovingLeft = false;
    } else if (e.key === 'ArrowRight') {
        paddle.isMovingRight = false;
    }
});

// Function to reset the ball to the center with random x direction
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedY = -Math.abs(ball.speedY); // Ensure ball moves upward after reset
    ball.speedX = Math.random() > 0.5 ? Math.abs(ball.speedX) : -Math.abs(ball.speedX); // Random X direction
}

// Draw functions
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

// Update score display
function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function update() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw objects
    drawBall();
    drawPaddle();
    
    // Move paddle
    if (paddle.isMovingLeft) {
        paddle.x = Math.max(0, paddle.x - paddle.speed);
    }
    
    if (paddle.isMovingRight) {
        paddle.x = Math.min(canvas.width - paddle.width, paddle.x + paddle.speed);
    }
    
    // Ball collision with walls
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.speedX = -ball.speedX;
    }
    
    if (ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }
    
    // Ball collision with paddle
    if (
        ball.y + ball.radius > paddle.y &&
        ball.y - ball.radius < paddle.y + paddle.height &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
    ) {
        if (ball.speedY > 0) { // Only if the ball is moving downward
            ball.speedY = -ball.speedY;
            score++; // Increment score when ball hits paddle
            updateScoreDisplay(); // Update the score display
        }
    }
    
    // Ball reaches bottom - reset ball but keep score
    if (ball.y + ball.radius > canvas.height) {
        resetBall();
    }
    
    // Move the ball
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    
    // Continue animation
    requestAnimationFrame(update);
}

// Initialize score display
updateScoreDisplay();

// Start the game
update();