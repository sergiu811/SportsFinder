const session = require("express-session");
const HOST = require("../consts");
require("dotenv").config();

const corsConfig = {
  origin: `http://${HOST}:5001`,
  credentials: true,
};
module.exports = { corsConfig };
