var app = require('http').createServer(handler).listen(3000)
, fs = require('fs')
, kinect = require('kinect')
, step = require('step')
, events = require('events')
, $ = require('jquery')
, WebSocketServer = require('ws').Server
, websocket = require('websocket-stream')
, wss = new WebSocketServer({server: app});

var eventEmitter = new events.EventEmitter();
var deferred = $.Deferred();

function handler (req, res) {
  if(req.url === "/"){
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
  if(req.url === "/bundle.js"){
  fs.readFile(__dirname + '/bundle.js',
      function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
      });
  }

}



deferred.resolve(kinect());

deferred.done(function (kcontext) {
  kcontext.resume();
  kcontext.start('video');

  wss.on('connection', function(ws) {
    var stream = websocket(ws);
    console.log(stream);
    console.log("connection made");
    kcontext.on('video', function (buf) {
        buf.pipe(stream);
    });
  });
});

