var sock;

var createSocket = function () {
    sock = io.connect("127.0.0.1:3000", {transports: ['websocket']});

    // main
    sock.on('connect', function(){
        console.log("connected to server")
    });
    sock.on('disconnect', function(){
        console.log("disconnected from server")
    });

    // game
    sock.on("question", function(data) {

    });
    sock.on("opponentsMove", function(data) {

    });
    sock.on("newGame", function(data) {

    });

    sock.on("finish", function(data) {

    });
};


