let io;

module.exports = {
  // INIT Socket
  init: (server) => {
    io = require("socket.io")(server, {
      cors: {
        origin: "*",
      },
    });

    return io;
  },
  // get Socket
  get: () => {
    if (!io) {
      throw new Error("socket is not initialized");
    }
    return io;
  },
};
