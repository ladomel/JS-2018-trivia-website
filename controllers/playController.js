let db = require('../controllers/tempDatabase');

let Game = function () {
    this.firstPlayerCastles = [1];
    this.secondPlayerCastles = [6];
    this.turn = 1;
    this.startupQuestions = 0;
    this.playersReady = [false, false];
    this.db = new db.SimpleDatabase();
    this.playerAnswers = [];
    this.lastQuestionAnswer = null;
    this.lastQuestionType = 0;
};

exports.listen = function (io) {
    let roomlessConnection = null,
        rooms = [];

    function findRoom (id) {
        for (let i in rooms) {
            let firstP = rooms[i][0][1],
                secondP = rooms[i][1][1];

            if (firstP.id === id) return [rooms[i], 0];
            if (secondP.id === id) return [rooms[i], 1];
        }

        return null;
    }

    function checkAnswer(game, lastPlayer) {
        if (game.lastQuestionType === 0) { // guess
            let player1Correct = Math.abs(game.lastQuestionAnswer - parseInt(game.playerAnswers[0]));
            let player2Correct = Math.abs(game.lastQuestionAnswer - parseInt(game.playerAnswers[1]));
            // console.log(player1Correct, player2Correct);
            if (player1Correct < player2Correct) return 1;
            if (player1Correct > player2Correct) return 2;
            return 3 - lastPlayer;
        } else { // multiple
            let player1Correct = game.playerAnswers[0] === game.lastQuestionAnswer;
            let player2Correct = game.playerAnswers[1] === game.lastQuestionAnswer;
            if (player1Correct && !player2Correct) return 1;
            if (!player1Correct && player2Correct) return 2;
            return 3;
        }
    }

    io.sockets.on('disconnection', function(socket){
        console.log("disconnected " + socket.id);
        if (roomlessConnection !== null && roomlessConnection[1].id === socket.id)
            roomlessConnection = null;
    });

    io.sockets.on('connection', function(socket){
        console.log("connected " + socket.id);

        socket.on('disconnect', function(){
            console.log("disconnect " + socket.id);
            if (roomlessConnection !== null && roomlessConnection[1].id === socket.id)
                roomlessConnection = null;
        });

        socket.on('newGame', function(name){
            console.log("newGame: " + socket.id);

            if (roomlessConnection === null) {
                roomlessConnection = [name, socket];
            } else {
                let game = new Game();
                rooms.push([roomlessConnection, [name, socket], game]);
                roomlessConnection[1].emit('startGame', name, 1);
                socket.emit('startGame', roomlessConnection[0], 2);
            }
        });

        socket.on('ready', function () {
            console.log("ready: " + socket.id);

            let room = findRoom(socket.id);
            let game = room[0][2],
                player1 = room[0][0][1],
                player2 = room[0][1][1];

            game.playersReady[room[1]] = true;

            if (game.playersReady[0] && game.playersReady[1]) {
                if (game.startupQuestions < 4) {
                    let stQuestion = game.db.getGuess();
                    game.lastQuestionAnswer = stQuestion.answer;
                    game.lastQuestionType = 0;
                    delete stQuestion['answer'];
                    player1.emit("startupQuestion", stQuestion);
                    player2.emit("startupQuestion", stQuestion);
                    game.playerAnswers = [null, null];
                    game.startupQuestions += 1;
                    game.playersReady = [false, false];
                } else {
                    player1.emit("turn", game.turn);
                    player2.emit("turn", game.turn);
                    game.turn = 3 - game.turn;
                }
            }
        });

        socket.on('playerMove', function (castleId) {
            console.log("playerMove: " + socket.id);

        });

        socket.on('chooseLand', function (land) {
            let room = findRoom(socket.id);
            let game = room[0][2],
                player1 = room[0][0][1],
                player2 = room[0][1][1],
                currentPlayer = room[1];

            if (currentPlayer === 0) {
                game.firstPlayerCastles.push(land);
                player2.emit("chosenLandByOp", land);
            } else {
                game.secondPlayerCastles.push(land);
                player1.emit("chosenLandByOp", land);
            }
        });

        socket.on('startupQuestionAnswer', function (answer) {
            console.log("startupQuestionAnswer: " + socket.id + " " + answer);

            let room = findRoom(socket.id);
            let game = room[0][2],
                player1 = room[0][0][1],
                player2 = room[0][1][1],
                currentPlayer = room[1];

            game.playerAnswers[currentPlayer] = answer;

            if (game.playerAnswers[0] !== null && game.playerAnswers[1] !== null) {
                let winner = checkAnswer(game, currentPlayer + 1);
                player1.emit("startupAnswerCheck", winner);
                player2.emit("startupAnswerCheck", winner);
            } else {
                if (currentPlayer === 0) {
                    player2.emit("opponentGuessed");
                } else {
                    player1.emit("opponentGuessed");
                }
            }

        });

    });
};
