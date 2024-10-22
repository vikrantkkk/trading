// sockets/rateSocket.js

module.exports = (io) => {
    io.on("connection", (socket) => {
      console.log("New client connected: ", socket.id);
  
      // Listen for disconnect event
      socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
      });
    });
  };
  