import { useState, useEffect, useContext } from "react";
import useSocketSetup from "./components/home/useSocketSetup";
import socketConn from "./socket";
import React from "react";
import { AccountContext } from "./components/account-context";
import moment from "moment";
import { notification } from "antd";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [friendList, setFriendList] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user, setUser } = useContext(AccountContext);
  const [socket, setSocket] = useState(() => socketConn(user));
  const [selectedTime, setSelectedTime] = useState(1);
  const [players, setPlayers] = useState(new Map());
  const [message, setDisplayMessage] = useState();
  const [error, setErrorMessage] = useState();
  const [placement, setPlacement] = useState("top");

  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  useEffect(() => {
    setSocket(() => socketConn(user));
  }, [user]);

  const openNotification = (message, type) => {
    const notificationKey = Date.now();
    notification[type]({
      message: (
        <div
          style={{
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      ),
      zIndex: 9999,
      key: notificationKey,
      placement,
      style: {
        backgroundColor: "rgba(65,65,65,0.9)",
      },
    });
  };

  useEffect(() => {
    if (message) {
      openNotification(message, "success");
    }
    setMessage("");
  }, [message]);

  useEffect(() => {
    if (error) {
      openNotification(error, "error");
    }
    setError("");
  }, [error]);

  const setError = (errorMessage) => {
    setErrorMessage(errorMessage);
  };

  const setMessage = (message) => {
    setDisplayMessage(message);
  };

  useSocketSetup(
    setFriendList,
    setFriendRequestList,
    friendList,
    friendRequestList,
    setMessages,
    players,
    setPlayers,
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
        players,
        setPlayers,
        setMessage,
        setError,

        setPlacement,
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
