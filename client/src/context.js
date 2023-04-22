import { useState, useEffect, useContext } from "react";
import useSocketSetup from "./components/home/useSocketSetup";
import socketConn from "./socket";
import React from "react";
import { AccountContext } from "./components/account-context";
import moment from "moment";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [friendList, setFriendList] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user, setUser } = useContext(AccountContext);
  const [socket, setSocket] = useState(() => socketConn(user));
  const [selectedTime, setSelectedTime] = useState(1);
  const [players, setPlayers] = useState(new Map());
  const default_date = moment().format("YYYY-MM-DD");

  const [selectedDate, setSelectedDate] = useState(default_date);

  useEffect(() => {
    setSocket(() => socketConn(user));
  }, [user]);

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
