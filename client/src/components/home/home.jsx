import Classes from "./home.module.css";
import FriendsChat from "../friends-chat/friends-chat";
import { createContext, useContext, useState } from "react";
import socketConn from "../../socket";
import { AccountContext } from "../account-context";
import { useEffect } from "react";
import useSocketSetup from "./useSocketSetup";

export const FriendsContext = createContext();
export const SocketContext = createContext();

const HomeComponent = () => {
  const [friendsList, setFriendsList] = useState([
    { username: "Sergiu", status: false },
    { username: "Maria", status: true },
  ]);
  const { user } = useContext(AccountContext);
  const [socket, setSocket] = useState(() => socketConn(user));

  useEffect(() => {
    setSocket(() => {
      socketConn(user);
      console.log(socket);
    });
  }, [user]);

  useSocketSetup(socket);

  return (
    <FriendsContext.Provider value={{ friendsList, setFriendsList }}>
      <SocketContext.Provider value={{ socket }}>
        <h1>home</h1>

        <FriendsChat></FriendsChat>
      </SocketContext.Provider>
    </FriendsContext.Provider>
  );
};

export default HomeComponent;
