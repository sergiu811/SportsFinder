import { io } from "socket.io-client";

const socket = (user) =>
  io("http://localhost:5001", {
    transports: ["websocket"],
    autoConnect: false,
    withCredentials: true,
    auth: {
      token: user.token,
    },
  });

export default socket;
