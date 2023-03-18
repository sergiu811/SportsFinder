import { useContext, useEffect } from "react";
import { AccountContext } from "../account-context";

const useSocketSetup = (socket) => {
  const { setUser } = useContext(AccountContext);
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("connected to server");
    });

    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
      console.log("error");
    });
    return () => {
      socket.disconnect();
    };
  }, [setUser]);
};

export default useSocketSetup;
