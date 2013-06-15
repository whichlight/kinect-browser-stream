var app = require('http').createServer(handler).listen(3000)
, io = require('socket.io').listen(app)
, fs = require('fs')
, kinect = require('kinect')
, step = require('step')
, events = require('events')
, $ = require('jquery')
, websocket = require('websocket-stream');

var eventEmitter = new events.EventEmitter();
var deferred = $.Deferred();

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
      function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
      });
}

io.sockets.on('connection', function (socket) {
  console.log("connection made");
  eventEmitter.on('buf', function (buf) {
    socket.emit('kinect', {data : buf});
  });
});


deferred.resolve(kinect());

deferred.done(function (kcontext) {
  kcontext.resume();
  kcontext.start('video');

  kcontext.on('video', function (buf) {
    eventEmitter.emit('buf', buf);
  });
});

