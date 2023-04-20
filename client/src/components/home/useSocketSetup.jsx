import { useContext, useEffect } from "react";
import { A, useGlobalContext } from "../../context";
import { AccountContext } from "../account-context";
import { message } from "antd";

const useSocketSetup = (
  setFriendList,
  setFriendRequestList,
  friendList,
  friendRequestList,
  setMessages,
  players,
  setPlayers,
  socket
) => {
  const { setUser } = useContext(AccountContext);
  //const { players, setPlayers } = useGlobalContext();

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

    socket.on("joined", (joinedPlayer) => {
      setPlayers([joinedPlayer, ...players]);
      console.log(players);
    });
    socket.on("left", (removedPlayer) => {
      console.log(removedPlayer);
      setPlayers((c) => c.filter((el) => el.username !== removedPlayer));
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
      socket.off("requestReceived");
      socket.off("friendRequests");
      socket.off("joinedLobby");
    };
  }, [setUser, setFriendList, setMessages, socket]);
};

export default useSocketSetup;
