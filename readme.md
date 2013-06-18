--kinect-browser-stream--

This streams frames from the kinect into a canvas element in the browser.
Node-kinect is used to get frames from the kinect, websocket streams are used
to stream the buffers to to the browser efficiently, and canvas is used to visualize the
buffers.

On the client when the buffer is cast to a byte array, it contains RGB values
for 640x480 pixels. So it goes R,G,B,R,G,B,R,G... where the first RGB
corresponds to the first pixel, the second RGB corresponds to the second.

On the canvas, each pixel instead has four elements, RGBA.

Installation
>npm install

Plug in the kinect and then run

>node server.js

Then open up a browser on localhost:3000

bundle.js is generated with browserify:

>browserify client.js > bundle.js

get in touch on twitter at @whichlight
my other projects are on whichlight.com
