const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSign } = require("../../jwt/jwtAuth");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

module.exports.attemptRegister = async (req, res) => {
  const existingUser = await pool.query(
    "SELECT username from player WHERE username=$1",
    [req.body.username]
  );

  if (existingUser.rowCount === 0) {
    //register
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query(
      "INSERT INTO player(username,passwordhash,userid) values($1,$2,$3) RETURNING playerid, username, userid",
      [req.body.username, hashedPass, uuidv4()]
    );

    jwtSign(
      {
        username: req.body.username,
        id: newUserQuery.rows[0].playerid,
        userid: newUserQuery.rows[0].userid,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    )
      .then((token) => {
        res.json({ loggedIn: true, token });
      })
      .catch((err) => {
        console.log(err);
        res.json({ loggedIn: false, status: "Try again later!" });
      });
  } else {
    res.json({ loggedIn: false, status: "Username taken!" });
  }
};
