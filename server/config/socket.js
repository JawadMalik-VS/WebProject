module.exports = (server) => {
  const io = require("../services/socket-io").init(server);
  // socket connection
  io.on("connection", (socket) => {
    console.log("Connection success", socket.id);
    socket.on("disconnect", () => {
      console.log("Connection disconnected", socket.id);
    });
  });
};
