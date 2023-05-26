import { io } from "socket.io-client";

const socket = (user) =>
  io("http://164.90.164.219:5001", {
    transports: ["websocket"],
    autoConnect: false,
    withCredentials: true,
    auth: {
      token: user.token,
    },
  });

export default socket;
