const redisClient = require("../../redis");

const acceptFriendRequest = async (friendName, socket, cb) => {
  const friend = await redisClient.hgetall(`userid:${friendName}`);
  const curentUser = await redisClient.hgetall(
    `userid:${socket.user.username}`
  );

  await redisClient.lpush(
    `friends:${socket.user.username}`,
    [friendName, friend.userid].join(".")
  );

  await redisClient.lpush(
    `friends:${friendName}`,
    [socket.user.username, socket.user.userid].join(".")
  );

  await redisClient.lrem(
    `friendRequest:${socket.user.username}`,
    1,
    `${friendName}.${friend.userid}`
  );

  const newFriend = {
    username: friendName,
    userid: friend.userid,
    connected: friend.connected,
  };
  cb({ done: true, newFriend });

  const newFriend2 = {
    username: socket.user.username,
    userid: socket.user.userid,
    connected: curentUser.connected,
  };

  socket.to(friend.userid).emit("friendAdded", newFriend2);
};
module.exports = acceptFriendRequest;
