import socketIo from 'socket.io';
import app from './config/app';
import http from 'http';
import { User } from './models/User';

const server = http.createServer(app);

const io = socketIo(server);

let users: User[] = [];
io.on('connection', (socket) => {
    console.log('User enter with id: ' + socket.id);
    socket.on('log', ({ name, room }) => {
        users.push({ id: socket.id, name, room });
        socket.join(room);
        socket.emit('count', countUsers(room));
        socket.broadcast.to(room).emit('log', name, countUsers(room));
        socket.on('disconnect', () => {
            users = users.filter((user) => user.id !== socket.id);
            socket.broadcast.to(room).emit('logout', name, countUsers(room));
        });
    });
    socket.on('message', (name, room, message) => {
        socket.broadcast.to(room).emit('message', name, message);
    });
});

function countUsers(room: string): number {
    const usersRoom = users.filter((user) => user.room === room);
    return usersRoom.length;
}

const PORT = 3333;

server.listen(PORT, () => console.log('> Start server port ' + PORT));
