const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('client'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
io.sockets.on('connection', socket => {
    let id = socket.id;

    socket.on('mousemove', data => {
        data.id = id;
        socket.broadcast.emit('moving', data);
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('clientdisconnect', id);
    });
})

server.listen(3000, () => {
    console.log('listening on *:3000');
  });
  