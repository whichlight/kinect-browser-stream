var app = require('http').createServer(handler).listen(3000)
, fs = require('fs')
, stream = require('stream')
, kinect = require('kinect')
, BufferStream = require('bufferstream')
, $ = require('jquery')
, WebSocketServer = require('ws').Server
, websocket = require('websocket-stream')
, wss = new WebSocketServer({server: app});

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

kstream = new BufferStream();

kstream.on('error', function(err){
    console.log('stream kinect error');
    console.log(err);
});

kstream.on('data', function(data){

});



deferred.done(function (kcontext) {
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
});

