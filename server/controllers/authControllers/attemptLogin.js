const pool = require("../../db");
const bcrypt = require("bcrypt");
const { jwtSign } = require("../../jwt/jwtAuth");

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
          id: potentialLogin.rows[0].playerid,
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
