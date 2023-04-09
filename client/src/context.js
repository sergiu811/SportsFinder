import { useState, useEffect, useContext } from "react";
import useSocketSetup from "./components/home/useSocketSetup";
import socketConn from "./socket";
import React from "react";
import { AccountContext } from "./components/account-context";
import moment from "moment";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [friendList, setFriendList] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user, setUser } = useContext(AccountContext);
  const [socket, setSocket] = useState(() => socketConn(user));
  const [selectedTime, setSelectedTime] = useState();

  const default_date = moment().format("YYYY-MM-DD");

  const [selectedDate, setSelectedDate] = useState(
    dayjs(default_date, dateFormat)
  );

  useEffect(() => {
    setSocket(() => socketConn(user));
  }, [user]);

  const useSocketSetup = (
    setFriendList,
    setFriendRequestList,
    friendList,
    friendRequestList,
    setMessages,
    socket
  ) => {
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

  useSocketSetup(
    setFriendList,
    setFriendRequestList,
    friendList,
    friendRequestList,
    setMessages,
    socket
  );
  return (
    <AppContext.Provider
      value={{
        friendList,
        setFriendList,
        friendRequestList,
        setFriendRequestList,
        messages,
        setMessages,
        socket,
        setSocket,
        user,
        setUser,
        selectedTime,
        setSelectedTime,
        setSelectedDate,
        selectedDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
