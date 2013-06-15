var websocket = require('websocket-stream');

var socket = websocket('ws://localhost:3000');

console.log("connected");

socket.on('data', function (data) {
    console.log(data);
});

