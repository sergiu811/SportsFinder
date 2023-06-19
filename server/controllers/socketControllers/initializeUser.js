const redisClient = require("../../redis");
const parseFriendList = require("./parseFriendList");
const pool = require("../../db");

const initializeUser = async (socket) => {
  socket.join(socket.user.userid);

  await redisClient.hset(
    `userid:${socket.user.username}`,
    "userid",
    socket.user.userid,
    "connected",
    true
  );

  const friendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );

  const friendRequestList = await redisClient.lrange(
    `friendRequest:${socket.user.username}`,
    0,
    -1
  );
  const parsedFriendList = await parseFriendList(friendList);
  const parsedFriendRequestList = await parseFriendList(friendRequestList);

  const friendRooms = parsedFriendList.map((friend) => friend.userid);

  if (friendRooms.length > 0) {
    socket
      .to(friendRooms)
      .emit("userConnectionUpdate", true, socket.user.username);
  }

  try {
    const distinctLobbies = await pool.query(
      "SELECT DISTINCT court_id, time_id, date FROM lobby;"
    );
    const lobbies = getLobbies(distinctLobbies.rows);

    const players = await Promise.all(
      lobbies.map(async (element) => {
        const lobbyPlayers = await getPlayerFromLobby(element);
        return lobbyPlayers;
      })
    );

    socket.emit("lobbies", distinctLobbies.rows, players);
  } catch (error) {
    console.log(error);
  }

  socket.emit("friends", parsedFriendList);
  socket.emit("friendRequests", parsedFriendRequestList);

  const msgQuery = await redisClient.lrange(
    `chat:${socket.user.userid}`,
    0,
    -1
  );

  // to.from.content
  const messages = msgQuery.map((msgStr) => {
    const parsedStr = msgStr.split(".");
    return { to: parsedStr[0], from: parsedStr[1], content: parsedStr[2] };
  });

  if (messages && messages.length > 0) {
    socket.emit("messages", messages);
  }
};

const getLobbies = (distincLobbies) => {
  let lobbies = [];
  distincLobbies.forEach((element) => {
    lobbies.push(element);
  });
  return lobbies;
};

const getPlayerFromLobby = async (lobby) => {
  try {
    const playersFromLobby = await pool.query(
      " SELECT p.*FROM player AS p INNER JOIN lobby AS l ON p.playerid=l.player_id WHERE l.court_id=$1 AND l.time_id=$2 AND l.date=$3",
      [lobby.court_id, lobby.time_id, lobby.date]
    );
    return playersFromLobby.rows;
  } catch (error) {
    console.log("Error while trying to get the players from each lobby");
  }
};

module.exports = initializeUser;
