let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");
let startBtn = document.getElementById("startBtn");

// Start game (keyboard or button)
startBtn.addEventListener("click", startGame);
document.addEventListener("keydown", startGame);

function startGame() {
    if (!started) {
        started = true;
        levelUp();
        startBtn.style.display = "none";
    }
}

// Flash effects
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

// Next level
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`#${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randBtn);
}

// Check user's input
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        document.body.style.backgroundColor = "red";
        let finalScore = level - 1;
        if (finalScore > highestScore) highestScore = finalScore;

        setTimeout(() => {
            document.body.style.backgroundColor = "";
            h2.innerHTML = `Game Over! Your score was <b>${finalScore}</b><br>
            Highest Score: <b>${highestScore}</b><br>
            Press "Start Game" or any key to restart`;
            resetGame();
        }, 200);
    }
}

// User button click
function btnPress() {
    if (!started) return;

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// Attach event listeners to all buttons
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", btnPress);
});

// Reset game
function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    startBtn.style.display = "inline-block";
}
