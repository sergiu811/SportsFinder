const redisClient = require("../../redis");

const addFriend = async (socket, friendName, cb) => {
  if (friendName === socket.user.username) {
    cb({ done: false, errorMsg: "Cannot add self!" });
    return;
  }
  const friend = await redisClient.hgetall(`userid:${friendName}`);

  const currentFriendRequestsSent = await redisClient.lrange(
    `friendRequest:${friendName}`,
    0,
    -1
  );

  if (
    currentFriendRequestsSent &&
    currentFriendRequestsSent.indexOf(
      `${socket.user.username}.${socket.user.userid}`
    ) !== -1
  ) {
    cb({ done: false, errorMsg: "Friend request already sent!" });
    return;
  }

  const currentFriendList = await redisClient.lrange(
    `friends:${socket.user.username}`,
    0,
    -1
  );
  if (!friend.userid) {
    cb({ done: false, errorMsg: "User doesn't exist!" });
    return;
  }
  if (
    currentFriendList &&
    currentFriendList.indexOf(`${friendName}.${friend.userid}`) !== -1
  ) {
    cb({ done: false, errorMsg: "Friend already added!" });
    return;
  }
  await redisClient.lpush(
    `friendRequest:${friendName}`,
    [socket.user.username, socket.user.userid].join(".")
  );

  const newFriendRequest = {
    username: socket.user.username,
    userid: socket.user.userid,
    connected: socket.user.connected,
  };
  cb({ done: true });
  socket.to(friend.userid).emit("requestReceived", newFriendRequest);
};

module.exports = addFriend;
