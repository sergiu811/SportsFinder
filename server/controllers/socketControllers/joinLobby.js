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

    socket.to(lobbyRoom).emit("joined", player.rows[0]);

    cb({ done: true, player: player.rows[0] });
  }
};

module.exports = joinLobby;
