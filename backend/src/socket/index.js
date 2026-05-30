import { Server } from "socket.io";

let io;
// this function will be called once when the server starts
export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });

  // incoming connections
  io.on("connection", (socket) => {
    console.log(`new live connection established! Socket ID: ${socket.id}`);

    // closed app
    socket.on("disconnect", () => {
      console.log(`connection closed. Socket ID: ${socket.id}`);
    });
  });
};

// broadcast messages!
export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized!");
  }
  return io;
};
