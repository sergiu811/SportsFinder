import { useContext, useEffect } from "react";
import { AccountContext } from "../account-context";
import { useGlobalContext } from "../../context";

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

    socket.on("lobbies", (lobbies, playersB) => {
      const newPlayers = getLobbyPlayersMap(lobbies, playersB);
      setPlayers(newPlayers);
    });

    socket.on("joined", (lobbies, playersB) => {
      const newPlayers = getLobbyPlayersMap(lobbies, playersB);
      setPlayers(newPlayers);
    });

    socket.on("left", (lobbies, playersB) => {
      const newPlayers = getLobbyPlayersMap(lobbies, playersB);
      setPlayers(newPlayers);
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
  }, [
    setUser,
    setFriendList,
    setMessages,
    socket,
    setPlayers,
    setFriendRequestList,
    setPlayers,
  ]);
};

const getLobbyPlayersMap = (lobbies, players) => {
  const map = lobbies.reduce((accumulator, currentElement, currentIndex) => {
    currentElement.date = currentElement.date.toString().slice(0, 10);
    const key = `court:${currentElement.court_id},time:${
      currentElement.time_id
    },date:${currentElement.date.toString().slice(0, 10)},`;
    accumulator.set(key, players[currentIndex]);
    return accumulator;
  }, new Map());
  return map;
};

export default useSocketSetup;
