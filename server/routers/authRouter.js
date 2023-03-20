const express = require("express");
const validateForm = require("../controllers/authControllers/validateForm");
const { rateLimiter } = require("../controllers/authControllers/rateLimiter");
const router = express.Router();

const {
  handleLogin,
  attemptLogin,
  attemptRegister,
} = require("../controllers/authController");

router
  .route("/login")
  .get(handleLogin)
  .post(validateForm, rateLimiter(60, 10), attemptLogin);
router.post("/signup", validateForm, rateLimiter(30, 4), attemptRegister);
module.exports = router;
