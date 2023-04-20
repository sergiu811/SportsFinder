const pool = require("../../db");

const leaveLobby = async (socket, selectedDate, selectedTime, court_id, cb) => {
  const joined = await pool.query(
    "SELECT p.* FROM player AS p INNER JOIN lobby AS l ON p.playerid=l.player_id WHERE l.court_id=$1 AND l.time_id=$2 AND l.date=$3 and p.username=$4",
    [court_id, selectedTime, selectedDate, socket.user.username]
  );

  if (joined.rowCount === 1) {
    const player = await pool.query("SELECT * from player WHERE username=$1", [
      socket.user.username,
    ]);
    try {
      const removeUser = await pool.query(
        "DELETE FROM lobby WHERE court_id=$1 AND time_id=$2 AND date=$3 and player_id=$4",
        [court_id, selectedTime, selectedDate, player.rows[0].playerid]
      );
    } catch (error) {
      cb({ msg: "Something went wrong!" });
    }

    try {
      const lobbyPlayers = await pool.query(
        "SELECT p.userid FROM player AS p INNER JOIN lobby AS l ON p.playerid=l.player_id WHERE l.court_id=$1 AND l.time_id=$2 AND l.date=$3 ",
        [court_id, selectedTime, selectedDate]
      );

      const lobbyRoom = [];

      lobbyPlayers.rows.forEach((player) => {
        if (player.userid != socket.user.userid) lobbyRoom.push(player.userid);
      });
      socket.to(lobbyRoom).emit("left", socket.user.username);
    } catch (error) {
      cb({ msg: "Something went wrong!" });
    }

    cb({ done: true, removedPlayer: player.rows[0].username });
  } else {
    cb({ msg: "You are not in the lobby!" });
  }
};

module.exports = leaveLobby;
