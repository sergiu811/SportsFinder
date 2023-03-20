const redisClient = require("../../redis");

module.exports.rateLimiter =
  (secondsLimit, attemptLimit) => async (req, res, next) => {
    const IP = req.connection.remoteAddress;
    const [response] = await redisClient
      .multi()
      .incr(IP)
      .expire(IP, secondsLimit)
      .exec();
    if (response[1] > attemptLimit) {
      res.json({ loggedIn: false, status: "Slow Down! Try next in 1 minute" });
    } else {
      next();
    }
  };
