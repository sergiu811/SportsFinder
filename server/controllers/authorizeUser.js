const jwt = require("jsonwebtoken");
const { jwtVerify } = require("../jwt/jwtAuth");
const redisClient = require("../redis");
require("dotenv").config();

module.exports.authorizeUser = (socket, next) => {
  const token = socket.handshake.auth.token;
  jwtVerify(token, process.env.JWT_SECRET)
    .then((decoded) => {
      socket.user = { ...decoded };
      next();
    })
    .catch((err) => {
      next(new Error("not authorized"));
    });
};
