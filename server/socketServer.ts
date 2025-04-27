import { Server as SocketIOServer } from "socket.io";

import http from "http";

export const initSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server);

  io.on("connection", (socket) => {
    console.log("A user is connected");

    //listened for 'notification event from the frontend
    socket.on("notification", (data) => {
      // broadcasting this data to all connected users
      io.emit("newNotification", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
};
