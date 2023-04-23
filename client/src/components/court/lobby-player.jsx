import {
  Avatar,
  Box,
  Divider,
  Heading,
  HStack,
  Button,
} from "@chakra-ui/react";
import ReactStars from "react-rating-stars-component";
import { FaStar, FaRegStar, FaStarHalf, FaUserPlus } from "react-icons/fa";
import { useGlobalContext } from "../../context";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

const LobbyPlayer = ({ player }) => {
  const { user } = useGlobalContext();
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    setCurrentUser(jwt_decode(user.token));
  }, []);

  const isSameUser = () => {
    return currentUser && currentUser.username === player.username
      ? "gray.100"
      : "white";
  };

  return (
    <Box width="100%">
      <HStack
        p="10px"
        backgroundColor={isSameUser()}
        justifyContent={"space-between"}
      >
        <HStack>
          <Avatar name={player.username}></Avatar>
          <Heading size="md">{player.username} </Heading>
          <ReactStars
            fullIcon={<FaStar></FaStar>}
            halfIcon={<FaStarHalf></FaStarHalf>}
            emptyIcon={<FaRegStar></FaRegStar>}
          ></ReactStars>
        </HStack>
        {currentUser && currentUser.username != player.username ? (
          <Button leftIcon={<FaUserPlus></FaUserPlus>}>Add Friend</Button>
        ) : (
          <></>
        )}
      </HStack>
      <Divider></Divider>
    </Box>
  );
};
export default LobbyPlayer;
