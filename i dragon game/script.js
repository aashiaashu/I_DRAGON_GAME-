let score = 0;
let cross = true;
let audioPlayed = false; // To track if the audio has already been played
let gameOverAudioReady = false;

const audio = new Audio('music.mp3');
const audiogo = new Audio('gameover.mp3');

document.onkeydown = function (e) {
    console.log("Key code is:", e.keyCode);

    // Ensure the audio starts playing after the first key press
    if (!audioPlayed) {
        audio.play().then(() => {
            audioPlayed = true;
        }).catch(error => console.log('Audio play failed:', error));
    }

    // Preload the game-over audio during user interaction
    if (!gameOverAudioReady) {
        audiogo.play().then(() => {
            audiogo.pause(); // Pause immediately after preload
            gameOverAudioReady = true;
        }).catch(error => console.log('Game over audio preload failed:', error));
    }

    if (e.keyCode == 38) {
        const dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }

    if (e.keyCode == 39) {
        const dino = document.querySelector('.dino');
        const dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX + 120) + "px";
    }

    if (e.keyCode == 37) {
        const dino = document.querySelector('.dino');
        const dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 120) + "px";
    }
};

setInterval(() => {
    const dino = document.querySelector('.dino');
    const gameOver = document.querySelector('.gameOver');
    const obstacle = document.querySelector('.obstacle');
    const dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    const dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    const ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    const oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    const offsetX = Math.abs(dx - ox);
    const offsetY = Math.abs(dy - oy);
    if (offsetX < 100 && offsetY < 60) {
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAni');

        if (gameOverAudioReady) {
            audiogo.play().catch(error => console.log('Game over audio play failed:', error));
        }

        // Pause the background music when the game is over
        audio.pause();
    } else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            const aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            const newDur = aniDur - 0.3;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }
}, 10);

function updateScore(score) {
    const scoreCont = document.querySelector('#scoreCont');
    scoreCont.innerHTML = "Your Score: " + score;
}
