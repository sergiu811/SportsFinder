import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Chat from "../friends-chat/chat";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate("/friends");
      }}
    >
      Go to Friends
    </Button>
  );
};

export default Home;
