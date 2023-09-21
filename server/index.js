const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const port = 3000;
io.on("connection", (socket) => {
    socket.on('coords', (msg) => {
        io.emit('coord', msg);
    })
});

httpServer.listen(port, () => {
    console.log("server running on port " + port);
});