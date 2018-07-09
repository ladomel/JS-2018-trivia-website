let createSocket = function (ui) {
    let sock = io.connect("127.0.0.1:3000", {transports: ['websocket']});

    sock.on('connect', function(){
        console.log("connected to server");
    });
    sock.on('disconnect', function(){
        console.log("disconnected from server")
    });
    sock.on("startGame", function(opponentsName, myPos) {
        UIStartGame(opponentsName, myPos);
    });
    sock.on("startupQuestion", function(data) {
        UIShowGuess(data);
    });
    sock.on('opponentGuessed', function () {
        UIOpponentGuessed();
    });
    sock.on("startupAnswerCheck", function(winner) {
        // console.log(winner);
        if (winner === playerPos) {
            UIBuildCastle();
        } else {
            UIWait("Waiting for opponent to build his/her Castle!")
        }
    });
    sock.on("chosenLandByOp", function(land) {
        console.log(land);
        UIChosenLandByOp(land);
    });

    sock.on("turn", function (turn) {
        UIWait("Rest of the game coming soon...")
    });

    return sock;
};


