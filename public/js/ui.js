
function addEventListeners() {
    document.getElementById("play-button-play").addEventListener("click", function () {
        alert('play');
        play();
    });
    document.getElementById("play-button-login").addEventListener("click", function () {
        alert('login')
    });
}

function gameMode() {
    for (let element of document.getElementsByClassName("non-game")) {
        element.style.display = 'none';
    }
}

function play() {
    gameMode();

}

window.onload = function() {
    addEventListeners();
};
