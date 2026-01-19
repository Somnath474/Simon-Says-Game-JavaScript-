let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");

// Start game
document.addEventListener("keydown", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

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

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        document.body.style.backgroundColor = "red";
        let finalScore = level - 1;

        if (finalScore > highestScore) {
            highestScore = finalScore;
        }

        setTimeout(() => {
            document.body.style.backgroundColor = "";
            h2.innerHTML = `Game Over! Your score was <b>${finalScore}</b><br>
            Highest Score: <b>${highestScore}</b><br>
            Press any key to restart`;
            resetGame();
        }, 200);
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
