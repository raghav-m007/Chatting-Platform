var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(4000, function () {
    console.log('listening to request on port 4000')
});

//static files
app.use(express.static('public'));

//socket setup
var io = socket(server);

io.on('connection', function (socket) {
    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function (data) {
        // console.log(data);
        //emitting data to all the servers connected
        io.sockets.emit('chat', data);
    });

    // Handle typing event 
    //broadcasting, sending the data topp all the servers except the one which is typing
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });

});