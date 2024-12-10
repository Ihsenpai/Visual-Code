document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const timerDisplay = document.getElementById('timerDisplay');
    const gameOverScreen = document.getElementById('gameOver');
    const finalScoreDisplay = document.getElementById('finalScore');
    const restartButton = document.getElementById('restartGame');
    const highScoreForm = document.getElementById('highScoreForm');
    const startScreen = document.getElementById('startScreen');
    const startGameButton = document.getElementById('startGame');

    let score = 0;
    let timeLeft = 60;
    let difficulty = 1;
    let gameTimer;
    let targetCount = 0;
    const MAX_TARGETS = 5;

    function createTarget() {
        if (targetCount >= MAX_TARGETS) return;

        const target = document.createElement('div');
        target.classList.add('target');
        
        const maxX = gameArea.clientWidth - 80;
        const maxY = gameArea.clientHeight - 80;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        target.style.left = `${randomX}px`;
        target.style.top = `${randomY}px`;
        
        target.addEventListener('click', hitTarget);
        gameArea.appendChild(target);
        targetCount++;

        const disappearTime = Math.max(1000, 5000 / difficulty); 
        setTimeout(() => {
            if (gameArea.contains(target)) {
                gameArea.removeChild(target);
                targetCount--;
            }
        }, disappearTime);
    }

    function spawnTargets() {
        const numTargets = Math.min(
            Math.floor(Math.random() * (Math.floor(difficulty) + 1)) + 1, 
            MAX_TARGETS
        );
        
        for (let i = 0; i < numTargets; i++) {
            createTarget();
        }
    }

    function hitTarget(event) {
        const target = event.target;
        gameArea.removeChild(target);
        targetCount--;
        
        score += 10; // Skor tetap 10 per target
        scoreDisplay.textContent = score;
        
        difficulty += 0.2;
    }

    function startTimer() {
        gameTimer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            
            spawnTargets();
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        clearInterval(gameTimer);
        finalScoreDisplay.textContent = score;
        gameArea.innerHTML = '';
        gameOverScreen.classList.remove('hidden');
    }

    function resetGame() {
        score = 0;
        timeLeft = 60;
        difficulty = 1;
        targetCount = 0;
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timeLeft;
        gameOverScreen.classList.add('hidden');
        gameArea.innerHTML = '';
        spawnTargets();
        startTimer();
    }

    function startGame() {
        startScreen.classList.add('hidden');
        document.querySelector('.game-info').classList.remove('hidden');
        gameArea.classList.remove('hidden');
        resetGame();
    }

    startGameButton.addEventListener('click', startGame);

    highScoreForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const playerName = document.getElementById('playerName').value;
        
        fetch('high_score.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `name=${encodeURIComponent(playerName)}&score=${score}`
        });

        resetGame();
    });

    restartButton.addEventListener('click', resetGame);
});
