var websocket = require('websocket-stream');

var socket = websocket('ws://localhost:3000');

console.log("connected");

var width = 640;
var height = 480;
var bytearray;

var ctx = document.getElementById('canvas').getContext('2d');

socket.on('data', function (data) {
  var bytearray = new Uint8Array(data);
  var imgdata = ctx.getImageData(0,0, width, height);
  var imgdatalen = imgdata.data.length;
  var offset=0;
  for(var i=0;i<imgdatalen/4;i++){
    imgdata.data[4*i+offset] = bytearray[3*i];
    imgdata.data[4*i+1+offset] = bytearray[3*i+1];
    imgdata.data[4*i+2+offset] = bytearray[3*i+2];
    imgdata.data[4*i+3+offset] = 255;
  }
  ctx.putImageData(imgdata,0,0);
});

socket.on('end', function(){
  console.log("stream ended");
});

