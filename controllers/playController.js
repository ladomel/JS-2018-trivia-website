exports.listen = function (io) {


    let rooms = [],
        roomlessConnections = [];

    io.on('connection', function(socket){
        console.log("connected " + socket.id);
        // socket.join('some room');
    });
};
