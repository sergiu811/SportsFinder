import { io } from "socket.io-client";
import { HOST } from "./constants";

const socket = (user) =>
  io(`http://${HOST}:5001`, {
    transports: ["websocket"],
    autoConnect: false,
    withCredentials: true,
    auth: {
      token: user.token,
    },
  });

export default socket;
