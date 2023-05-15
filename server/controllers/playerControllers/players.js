const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.put("/player/:username", (req, res) => {
  const { username } = req.params;
  const { height, age } = req.body;

  const query = "UPDATE player SET height = $1, age = $2 WHERE username = $3";
  const values = [height, age, username];

  pool.query(query, values, (error, result) => {
    if (error) {
      console.error("Error updating user details:", error);
      res.status(500).json({ error: "Error updating user details" });
    } else {
      console.log("User details updated successfully");
      res.status(200).json({ message: "User details updated successfully" });
    }
  });
});

router.get("/lobby_players", async (req, res) => {
  const court_id = req.query.court_id;
  const time_id = req.query.selectedTime;
  const date = req.query.selectedDate;
  const query = `
      SELECT p.*
      FROM player AS p
      INNER JOIN lobby AS l ON p.playerid=l.player_id
      WHERE l.court_id=$1 AND l.time_id=$2 AND l.date=$3
    `;
  try {
    const client = await pool.connect();
    const result = await client.query(query, [court_id, time_id, date]);
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/game_history/:player_id", async (req, res) => {
  const { player_id } = req.params;
  const query = `
  SELECT l.* ,c.court_name,t.*
  FROM lobby AS l
  INNER JOIN player AS p ON p.playerid=l.player_id
   INNER JOIN court AS c ON c.court_id=l.court_id
    INNER JOIN time_interval AS t ON t.time_id=l.time_id
  WHERE p.playerid=$1
      `;
  try {
    const client = await pool.connect();
    const result = await client.query(query, [player_id]);
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/player/:username", async (req, res) => {
  const { username } = req.params;
  const query = `
        SELECT *
        FROM player 
        WHERE username = $1
      `;
  try {
    const client = await pool.connect();
    const result = await client.query(query, [username]);
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.post("/player/rating/:username", async (req, res) => {
  const { username } = req.params;
  const { rating } = req.body;

  try {
    const { rows } = await pool.query(
      "SELECT * FROM player WHERE username = $1",
      [username]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: `Player with username ${username} not found` });
    }

    const ratingResult = await pool.query(
      "SELECT rating FROM player WHERE username = $1",
      [username]
    );

    const currentRating = ratingResult.rows[0].rating;
    let newRating = 0;
    if (currentRating != null) {
      newRating = (currentRating + rating) / 2;
    } else {
      newRating = rating;
    }

    const result = await pool.query(
      "UPDATE player SET rating = ($1) WHERE username = ($2)",
      [newRating, username]
    );

    return res.status(201).json({ rating: newRating });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error on updating the player's rating" });
  }
});

module.exports = router;
