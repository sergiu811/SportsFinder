const session = require("express-session");
require("dotenv").config();

const corsConfig = {
  origin: `http://${HOST}`,
  credentials: true,
};
module.exports = { corsConfig };
