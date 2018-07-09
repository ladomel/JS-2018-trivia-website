var sock,
    playerName = "",
    opponentName = "",
    playerPos = 1,
    startupIsDone = false,
    myCastles = [],
    opCastles = [],
    me = this;

function showError(error) {
    alert(error); // TODO - custom dialog
}

function addEventListeners() {
    let playButton = document.getElementById("play-button-play"),
        loginButton = document.getElementById("play-button-login"),
        registerButton = document.getElementById("play-button-register"),
        logoutButton = document.getElementById("play-button-logout"),
        playGuestButton = document.getElementById("play-button");


    if (playGuestButton) {
        playGuestButton.addEventListener("click", function () {
            playerName = document.getElementById("alias").value;
            play();
        });
    }

    let me = this;

    for (let i=2;i<=5;i++) {
        document.getElementById('point-' + i).addEventListener("click", async function (event) {
            if (!myCastles.includes(i) && !opCastles.includes(i) && me.canChoose) {
                me.canChoose = false;
                event.target.style.background = 'url("/resources/images/soldier.png") no-repeat center ' + ((playerPos === 1) ? "blue" : "red");
                event.target.style['background-size'] = "contain";
                sock.emit('chooseLand', i);
                document.getElementById('tips').innerText = "";
                await sleep(1000);
                sock.emit('ready');
            }
        });
    }

    document.getElementsByClassName("question-guess-answer")[0].addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
            sock.emit('startupQuestionAnswer', event.target.value);
            event.target.disabled = "disabled";
        }
    });

    for (let button of document.getElementsByClassName('question-multiple-answer')) {
        button.addEventListener("click", function (event) {
            // asd
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            let data = {
                user: localStorage.getItem("user")
            };

            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    window.location.reload();
                }
            };
            xhttp.open("POST", "/user/logout", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(data));
        });
    }
    if (playButton) {
        playButton.addEventListener("click", function () {
            play();
        });
    }
    if (loginButton) {
        loginButton.addEventListener("click", function () {
            let data = {
                username: document.getElementById("user-name").value,
                password: document.getElementById("user-password").value
            };

            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    localStorage.setItem("user", data.username);
                    window.location.reload();
                }
            };
            xhttp.open("POST", "/user/login", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(data));
        });
    }
    if (registerButton) {
        registerButton.addEventListener("click", function () {
            let data = {
                username: document.getElementById("user-name").value,
                password: document.getElementById("user-password").value
            };

            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    localStorage.setItem("user", data.username);
                    window.location.reload();
                }
            };
            xhttp.open("POST", "/user/register", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify(data));
        });
    }
}

function gameMode() {
    for (let element of document.getElementsByClassName("non-game")) {
        element.style.display = 'none';
    }

    for (let element of document.getElementsByClassName("game")) {
        element.style.display = 'inherit';
    }
}

async function UIStartGame(name, pos) {
    playerPos = pos;
    if (pos === 1) {
        myCastles.push(1);
        opCastles.push(6);
    } else {
        myCastles.push(6);
        opCastles.push(1);
    }
    opponentName = name;

    document.getElementById('player' + playerPos).innerText = "You";
    document.getElementById('player' + (3 - playerPos)).innerText = opponentName;

    await sleep(1000);
    sock.emit('ready');
    toggleLoading(false);
}

function UIShowGuess(question) {
    document.getElementById("question-guess-question").innerText = question.question;
    document.getElementsByClassName("question-guess-answer")[0].value = "";

    for (let el of document.getElementsByClassName("question-status")) {
        el.innerText = "Fastest Answer Wins!";
    }
    document.getElementsByClassName("question-guess-answer")[0].disabled = false;

    document.getElementById("question-guess").style.display = "block";
}

function UIOpponentGuessed() {
    for (let el of document.getElementsByClassName("question-status")) {
        el.innerText = "Opponent Already Answered!";
    }
}

function UIShowMultiple(question) {
    // borrowed this from somewhere, not completely correct
    let anss = question.allAnswers.sort(function() {
        return .5 - Math.random();
    });
    document.getElementById("question-multiple-question").innerText = question.question;
    let ansDoms = document.getElementsByClassName('question-multiple-answer');
    for (let i in anss) {
        ansDoms[i].innerText = anss[i];
    }

    for (let el of document.getElementsByClassName("question-status")) {
        el.innerText = "Speed doesn't matter!";
    }

    document.getElementById("question-multiple").style.display = "block";
}

async function UIChosenLandByOp(land) {
    console.log(playerPos);
    document.getElementById('point-' + land).style.background = 'url("/resources/images/soldier.png") no-repeat center ' + ((playerPos === 2) ? "blue" : "red");
    document.getElementById('point-' + land).style['background-size'] = "contain";

    toggleLoading(false);
    // can pause
    await sleep(1000);
    sock.emit('ready');
}

function hideQuestions() {
    document.getElementById("question-multiple").style.display = "none";
    document.getElementById("question-guess").style.display = "none";
}

function UIBuildCastle() {
    document.getElementById('tips').innerText = "Click to claim the land!";
    hideQuestions();
    me.canChoose = true;
}

function UIWait(status) {
    hideQuestions();
    toggleLoading(true, status);
}

// borrowed from stackoverflow
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function play() {
    gameMode();
    sock = createSocket(this);
    sock.emit("newGame", playerName);
    toggleLoading(true, 'Waiting for opponent');
}

function toggleLoading(on, status) {
    if (on) {
        document.getElementById("loading").style.display = 'block';
        document.getElementById("blur").style.display = 'block';
        document.getElementById('status-bar').innerText = status;
        document.getElementById('status-bar').style.display = "block";
    } else {
        document.getElementById("loading").style.display = 'none';
        document.getElementById("blur").style.display = 'none';
        document.getElementById('status-bar').innerText = "";
        document.getElementById('status-bar').style.display = "none";
    }
}

window.onload = function() {
    addEventListeners();
};
