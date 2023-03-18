const express = require("express");
const cors = require("cors");
const app = express();
const { Server } = require("socket.io");
const authRouter = require("./routers/authRouter");
const helmet = require("helmet");
const { corsConfig } = require("./controllers/serverController");
const { authorizeUser } = require("./controllers/socketController");
const server = require("http").Server(app);
require("dotenv").config();

const io = new Server(server, {
  cors: corsConfig,
});

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use("/auth", authRouter);

io.use(authorizeUser);
io.on("connection", (socket) => {
  console.log(socket.id);
  console.log(socket.request.token);
});

server.listen(5001, () => {
  console.log("Server started on port  5001");
});
