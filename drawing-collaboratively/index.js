const io = require('socket');

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