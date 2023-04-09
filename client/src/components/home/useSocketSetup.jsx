import { useContext, useEffect } from "react";
import { A } from "../../context";
import { AccountContext } from "../account-context";

const useSocketSetup = (
  setFriendList,
  setFriendRequestList,
  friendList,
  friendRequestList,
  setMessages,
  socket
) => {
  const { setUser } = useContext(AccountContext);

  useEffect(() => {
    socket.connect();

    socket.on("friends", (friendList) => {
      setFriendList(friendList);
    });

    socket.on("requestReceived", (newFriendRequest) => {
      setFriendRequestList([newFriendRequest, ...friendRequestList]);
    });

    socket.on("friendRequests", (friendRequestList) => {
      setFriendRequestList(friendRequestList);
    });

    socket.on("friendAdded", (newFriend) => {
      setFriendList([newFriend, ...friendList]);
    });

    socket.on("messages", (messages) => {
      setMessages(messages);
    });

    socket.on("dm", (message) => {
      setMessages((prevMsgs) => [message, ...prevMsgs]);
    });

    socket.on("connected", (status, username) => {
      setFriendList((prevFriends) => {
        return [...prevFriends].map((friend) => {
          if (friend.username === username) {
            friend.connected = status;
          }
          return friend;
        });
      });
    });

    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    });

    return () => {
      socket.off("connect_error");
      socket.off("connected");
      socket.off("friends");
      socket.off("messages");
      socket.off("dm");
    };
  }, [setUser, setFriendList, setMessages, socket]);
};

export default useSocketSetup;
