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
const dm = require("./controllers/socketControllers/dm");
const server = require("http").Server(app);
const pool = require("./db");
require("dotenv").config();

const socket = new Server(server, {
  cors: corsConfig,
});

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use("/auth", authRouter);

app.get("/time_intervals", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM time_interval");
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
app.get("/basketball_courts", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM court");
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.post("/basketball_courts", async (req, res) => {
  const { court_name, court_longitude, court_latitude } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO court (court_name, court_longitude, court_latitude) VALUES ($1, $2, $3) RETURNING court_id",
      [court_name, court_longitude, court_latitude]
    );
    res.status(201).json({ court_id: result.rows[0].court_id });
    client.release();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get("/basketball_courts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query(
      "SELECT * FROM court WHERE court_id = $1",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: `Court with ID ${id} not found` });
    }

    const court = rows[0];

    return res.json({
      court_id: court.court_id,
      court_name: court.court_name,
      court_longitude: court.court_longitude,
      court_latitude: court.court_latitude,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

socket.use(authorizeUser);
socket.on("connection", (socket) => {
  initializeUser(socket);

  socket.on("add_friend", (friendName, cb) => {
    addFriend(socket, friendName, cb);
  });

  socket.on("requestDeclined", (friendName, cb) => {
    declineFriendRequest(friendName, socket, cb);
  });

  socket.on("dm", (message) => dm(socket, message));

  socket.on("requestAccepted", (friendRequest, cb) => {
    acceptFriendRequest(friendRequest, socket, cb);
  });

  socket.on("join-lobby", (selectedDate, selectedTime, id) => {
    console.log(
      socket.user.username,
      "joined lobby",
      selectedDate,
      selectedTime,
      id
    );
  });

  socket.on("leave-lobby", () => {
    console.log(socket.user.username, "left lobby");
  });

  socket.on("disconnecting", () => onDisconnect(socket));
});

server.listen(5001, () => {
  console.log("Server started on port  5001");
});
