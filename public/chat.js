//Make Connection

var socket = io.connect('http://localhost:4000');

//Query DOM

var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

btn.addEventListener('click', function () {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function () {
    socket.emit('typing', handle.value);
})

// Listen for events
//listening back from servers socket
socket.on('chat', function (data) {
    feedback.innerHTML = ""; //once send is entered to make it blank again so that no data is sent again
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});



socket.on('typing', function (data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});