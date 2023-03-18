const jwt = require("jsonwebtoken");
const { jwtVerify } = require("../jwt/jwtAuth");
require("dotenv").config();

module.exports.authorizeUser = (socket, next) => {
  const token = socket.handshake.auth.token;
  console.log(token);
  jwtVerify(token, process.env.JWT_SECRET)
    .then((decoded) => {
      socket.user = { ...decoded };
      console.log(socket.user);
      next();
    })
    .catch((err) => {
      console.log("bad request");
      next(new (Error("not authorized"))());
    });
};
