const redisClient = require("../../redis");

const declineFriendRequest = async (friendName, socket, cb) => {
  const friend = await redisClient.hgetall(`userid:${friendName}`);

  const result = await redisClient.lrem(
    `friendRequest:${socket.user.username}`,
    1,
    `${friendName}.${friend.userid}`
  );
  if (result) {
    cb({ done: true, rejectedFriend: friendName });
  }
};

module.exports = declineFriendRequest;
