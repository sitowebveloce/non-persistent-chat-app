import express from 'express';
import {Server} from 'socket.io';
import http from 'http';
import cors from 'cors';
// App
const app = express();
// Server
const server = http.createServer(app);
// Cors
app.use(cors());

// IO
const options = {cors:{origin:'*', methods:['GET', 'POST', 'PUT', 'DELETE']}};
const io = new Server(server, options);

// Listen for socket events
io.on('connection', socket =>{
    console.log(`New Client connected ${socket.id}`);
    // Join room
    socket.on('join_room', room =>{
        console.log(`${socket.id} joined room ${room}`);
        socket.join(room);
    });
    // Client message event
    socket.on('client_message', data =>{
        console.log(data);
        // Emit
         socket.to(data.room).emit('server_message', data.message);
    });

});


// Server Listener
server.listen(3033, ()=>{
    console.log(`Server running on port 3033`);
});