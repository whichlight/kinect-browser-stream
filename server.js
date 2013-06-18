var app = require('http').createServer(handler).listen(3000)
, fs = require('fs')
, kinect = require('kinect')
, BufferStream = require('bufferstream')
, $ = require('jquery')
, WebSocketServer = require('ws').Server
, websocket = require('websocket-stream')
, wss = new WebSocketServer({server: app});

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
  else{
    fs.readFile(__dirname + req.url, function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' +req.url);
      }
      res.writeHead(200);
      res.end(data);
    });
  }
}



kstream = new BufferStream();

kstream.on('error', function(err){
  console.log('stream kinect error');
  console.log(err);
});

var kcontext = kinect();

kcontext.resume();
kcontext.start('video');

wss.on('connection', function(ws) {
  var stream = websocket(ws);
  kstream.pipe(stream);
  console.log("connection made");
  kcontext.on('video', function (buf) {
    kstream.write(buf);
  });
});

wss.on('error', function(ws) {
  console.log('error');
});

