var websocket = require('websocket-stream');

var socket = websocket('ws://localhost:3000');

console.log("connected");

var width = 640;
var height = 480;
var bytearray;

var ctx = document.getElementById('canvas').getContext('2d');

//video vis

socket.on('data', function (data) {
  var bytearray = new Uint8Array(data);
  var imgdata = ctx.getImageData(0,0, width, height);
  var imgdatalen = imgdata.data.length;
  for(var i=0;i<imgdatalen/4;i++){
    imgdata.data[4*i] = bytearray[3*i];
    imgdata.data[4*i+1] = bytearray[3*i+1];
    imgdata.data[4*i+2] = bytearray[3*i+2];
    imgdata.data[4*i+3] = 255;
  }
  ctx.putImageData(imgdata,0,0)
});


//Depth vis
//

socket.on('end', function(){
  console.log("stream ended");
  socket.close();
});
