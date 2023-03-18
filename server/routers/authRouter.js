const express = require("express");
const router = express.Router();
const validateForm = require("../controllers/validateForm");
const { handleLogin } = require("../controllers/authController");
const { attemptLogin } = require("../controllers/authController");
const { attemptRegister } = require("../controllers/authController");
const { rateLimiter } = require("../controllers/rateLimiter");

router
  .route("/login")
  .get(handleLogin)
  .post(validateForm, rateLimiter(60, 10), attemptLogin);
router.post("/signup", validateForm, rateLimiter(30, 4), attemptRegister);

module.exports = router;
