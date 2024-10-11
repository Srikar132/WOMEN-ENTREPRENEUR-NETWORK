import { Server } from "socket.io"

export const SetUpSocket = (server) => {

    const io = new Server(server , { cors : {origin : "*"}});

    const userSocketMap = new Map();


    io.on("connection" , socket => {

    });


}