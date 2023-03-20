const { attemptLogin } = require("./authControllers/attemptLogin");
const { attemptRegister } = require("./authControllers/attemptRegister");
const { handleLogin } = require("./authControllers/handleLogin");

module.exports = {
  attemptLogin,
  attemptRegister,
  handleLogin,
};
