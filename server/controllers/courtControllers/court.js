const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.post("/basketball_courts", async (req, res) => {
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

router.get("/basketball_courts/:id", async (req, res) => {
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
      image: court.image,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/time_intervals", async (req, res) => {
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

router.get("/basketball_courts", async (req, res) => {
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

module.exports = router;
