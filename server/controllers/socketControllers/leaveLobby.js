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

      socket.to(lobbyRoom).emit("left", lobbies, players);
    } catch (error) {
      cb({ msg: "Something went wrong!" });
    }

    cb({
      done: true,
      removedPlayer: player.rows[0].username,
    });
  } else {
    cb({ msg: "You are not in the lobby!" });
  }
};

module.exports = leaveLobby;

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
