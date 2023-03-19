const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSign, jwtVerify, getJwt } = require("../jwt/jwtAuth");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

module.exports.handleLogin = (req, res) => {
  const token = getJwt(req);
  if (!token) {
    res.json({ loggedIn: false });
    return;
  }

  jwtVerify(token, process.env.JWT_SECRET)
    .then(() => {
      res.json({ loggedIn: true, token });
    })
    .catch((err) => {
      res.json({ loggedIn: false });
    });
};

module.exports.attemptLogin = async (req, res) => {
  const potentialLogin = await pool.query(
    "SELECT playerid , username , passwordhash, userid FROM player p WHERE p.username=$1 ",
    [req.body.username]
  );
  if (potentialLogin.rowCount > 0) {
    const isSamePassword = await bcrypt.compare(
      req.body.password,
      potentialLogin.rows[0].passwordhash
    );

    if (isSamePassword) {
      jwtSign(
        {
          username: req.body.username,
          id: potentialLogin.rows[0].id,
          userid: potentialLogin.rows[0].userid,
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
      res.json({ loggedIn: false, status: "Wrong username or password!" });
    }
  } else {
    res.json({ loggedIn: false, status: "Wrong username or password!" });
  }
};

module.exports.attemptRegister = async (req, res) => {
  const existingUser = await pool.query(
    "SELECT username from Player WHERE username=$1",
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
        id: newUserQuery.rows[0].id,
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
