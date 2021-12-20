const { PORT } = require("../config");

//connect socket.io server with client side (includes port)
const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

var users = [];

//add user to users array (which is array with users using socket)
const sendUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
//remove user from that array
const removeUser = (socketId) => {
  let newUsers = users.filter((user) => user.socketId !== socketId);
  users = newUsers;
};
//get a user
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

//send this message if user is connected to socket server
io.on("connection", (socket) => {
  console.log("Connected successfully !");

  //take user ID and socket ID
  socket.on("sendUser", (userId) => {
    sendUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //send this message if user is disconnected to socket server
  socket.on("disconnect", () => {
    console.log("Somebody disconnected !");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
