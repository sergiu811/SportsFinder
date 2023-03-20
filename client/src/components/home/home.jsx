import Classes from "./home.module.css";
import FriendsChat from "../friends-chat/friends-chat";
import { createContext, useContext, useState } from "react";
import socketConn from "../../socket";
import { AccountContext } from "../account-context";
import { useEffect } from "react";
import useSocketSetup from "./useSocketSetup";

export const FriendContext = createContext();
export const MessagesContext = createContext();
export const SocketContext = createContext();

const HomeComponent = () => {
  const [friendList, setFriendList] = useState([
    { username: "Sergiu", status: false },
    { username: "Maria", status: true },
  ]);
  const [messages, setMessages] = useState([]);
  const [friendIndex, setFriendIndex] = useState(0);

  const { user } = useContext(AccountContext);
  const [socket, setSocket] = useState(() => socketConn(user));
  useEffect(() => {
    setSocket(() => socketConn(user));
  }, [user]);
  useSocketSetup(setFriendList, setMessages, socket);
  return (
    <FriendContext.Provider value={{ friendList, setFriendList }}>
      <SocketContext.Provider value={{ socket }}>
        <FriendsChat></FriendsChat>
      </SocketContext.Provider>
    </FriendContext.Provider>
  );
};

export default HomeComponent;
