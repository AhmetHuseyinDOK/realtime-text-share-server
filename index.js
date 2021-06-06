const {Server}= require("socket.io");
const io = new Server(3000,{
    cors: "*"
});
const uuid = require("uuid").v4;

io.on("connection", (socket) => {
    let room;
    socket.on("CREATE_ROOM", (message) => {
        let room = uuid();
        socket.emit("ROOM_CREATED", {room});
    })

    socket.on("JOIN_ROOM", (message) => {
        room = message.room;
        socket.join(room)
        socket.emit("JOINED_TO_ROOM", {room});
    })

    socket.on("TEXT_UPDATE", (message) => {
        const { text } = message;
        socket.to(room).emit("TEXT_UPDATE", {
            text
        })
    })

})

