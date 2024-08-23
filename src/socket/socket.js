// import { Server } from 'socket.io'
// import http from 'http'
// import app from './../app.js'

// const server = http.createServer(app)

// const io = new Server(server, {
//     cors: {
//         origin: ["http://localhost:5173"],
//         methods: ["GET", "POST"],
//     }
// })



// export const getReceiverSocketId = (receiverId) => {
//     return userSocketMap[receiverId]
// }

// const userSocketMap = {} // {userId: socketId}

// io.on("connection", (socket) => {
//     console.log("a user has connected", socket.id);
//     const userId = socket.handshake.query.userId

//     if (userId !== undefined) userSocketMap[userId] = socket.id;
//     // console.log(userSocketMap)

//     //  io.emit() => used to send events to the connected clients
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));

//     // socket.on() => used to listen to the events both on client and server side
//     socket.on("disconnect", () => {
//         console.log("a user has disconnected", socket.id);
//         delete userSocketMap[userId];
//         io.emit("getOnlineUsers", Object.keys(userSocketMap))

//     });
// });





// export { server, io }