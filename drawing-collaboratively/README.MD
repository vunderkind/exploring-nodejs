# Drawing Collaboratively

I've always wanted to experiment with some form of realtime canvas application. This demonstration combines WebSockets (via Sockets.io) and the canvas API on the client side to accomplish exactly that.

## How this works
We have an express server that ugrades itself to a socket server. The http server serves an index.html file to the client on the `'/'` path. 

## TO-DO
Prettify the canvas and make it useable for actual human begins. 

## To use
1. Clone this repository.
2. Run npm install
3. then run `npm run start`