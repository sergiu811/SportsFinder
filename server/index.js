const express = require("express");
const cors = require("cors");
const app = express();
const { Server } = require("socket.io");
const authRouter = require("./routers/authRouter");
const helmet = require("helmet");
const { corsConfig } = require("./controllers/serverController");
const { authorizeUser } = require("./controllers/authorizeUser");
const addFriend = require("./controllers/socketControllers/addFriend");
const initializeUser = require("./controllers/socketControllers/initializeUser");
const onDisconnect = require("./controllers/socketControllers/onDisconnect");
const acceptFriendRequest = require("./controllers/socketControllers/acceptFriendRequest");
const declineFriendRequest = require("./controllers/socketControllers/declineFriendRequest");
const joinLobby = require("./controllers/socketControllers/joinLobby");
const leaveLobby = require("./controllers/socketControllers/leaveLobby");
const dm = require("./controllers/socketControllers/dm");
const server = require("http").Server(app);
const courRouter = require("./controllers/courtControllers/court");
const playerRouter = require("./controllers/playerControllers/players");
require("dotenv").config();

const socket = new Server(server, {
  cors: corsConfig,
});

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use("/auth", authRouter);
app.use(courRouter);
app.use(playerRouter);
socket.use(authorizeUser);
socket.on("connection", (socket) => {
  initializeUser(socket);

  socket.on("add_friend", (friendName, cb) => {
    addFriend(socket, friendName, cb);
  });

  socket.on("requestDeclined", (friendName, cb) => {
    declineFriendRequest(friendName, socket, cb);
  });

  socket.on("dm", (message) => {
    dm(socket, message);
  });

  socket.on("requestAccepted", (friendRequest, cb) => {
    acceptFriendRequest(friendRequest, socket, cb);
  });

  socket.on("joinLobby", (selectedDate, selectedTime, id, cb) => {
    joinLobby(socket, selectedDate, selectedTime, id, cb);
  });

  socket.on("leaveLobby", (selectedDate, selectedTime, court_id, cb) => {
    leaveLobby(socket, selectedDate, selectedTime, court_id, cb);
  });

  socket.on("disconnecting", () => onDisconnect(socket));
});

server.listen(5001, () => {
  console.log("Server started on port  5001");
});
