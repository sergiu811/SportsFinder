const pool = require("../../db");

const joinLobby = async (socket, selectedDate, selectedTime, court_id, cb) => {
  const allreadyJoined = await pool.query(
    "SELECT p.* FROM player AS p INNER JOIN lobby AS l ON p.playerid=l.player_id WHERE l.court_id=$1 AND l.time_id=$2 AND l.date=$3 and p.username=$4",
    [court_id, selectedTime, selectedDate, socket.user.username]
  );

  if (allreadyJoined.rowCount === 1) {
    cb({ done: false, msg: "Already joined!" });
    return;
  }

  if (allreadyJoined.rowCount === 0) {
    const player = await pool.query("SELECT * from player WHERE username=$1", [
      socket.user.username,
    ]);

    const joinUser = await pool.query(
      "INSERT INTO lobby(court_id,time_id,player_id,date) values($1,$2,$3,$4)",
      [court_id, selectedTime, player.rows[0].playerid, selectedDate]
    );

    const playersUid = await pool.query("SELECT userid FROM player");

    const lobbyRoom = [];

    playersUid.rows.forEach((player) => {
      if (player.userid != socket.user.userid) lobbyRoom.push(player.userid);
    });

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

    socket.to(lobbyRoom).emit("joined", lobbies, players);

    cb({
      done: true,
      player: player.rows[0],
    });
  }
};

module.exports = joinLobby;

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
