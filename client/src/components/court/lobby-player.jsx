import {
  Avatar,
  Box,
  Divider,
  Heading,
  HStack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import ReactStars from "react-rating-stars-component";
import { FaStar, FaRegStar, FaStarHalf, FaUserPlus } from "react-icons/fa";
import { useGlobalContext } from "../../context";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import ProfilePage from "../profile/profile-page";

const LobbyPlayer = ({ player }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useGlobalContext();
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    setCurrentUser(jwt_decode(user.token));
  }, []);

  const isSameUser = () => {
    return currentUser && currentUser.username === player.username;
  };

  return (
    <Box width="100%">
      <HStack
        p="10px"
        backgroundColor={isSameUser() ? "gray.100" : "white"}
        justifyContent={"space-between"}
      >
        <HStack>
          <Avatar size={"sm"} name={player.username}></Avatar>
          <Heading size="sm">{player.username} </Heading>
          <ReactStars
            edit={false}
            fullIcon={<FaStar></FaStar>}
            halfIcon={<FaStarHalf></FaStarHalf>}
            emptyIcon={<FaRegStar></FaRegStar>}
            value={player.rating}
          ></ReactStars>
        </HStack>
        {!isSameUser() ? (
          <HStack>
            <Button leftIcon={<FaUserPlus></FaUserPlus>}>Add Friend</Button>
            <Button onClick={onOpen}>View Profile</Button>
          </HStack>
        ) : (
          <></>
        )}
      </HStack>
      <Divider></Divider>
      <ProfilePage
        isOpen={isOpen}
        onClose={onClose}
        player={player}
      ></ProfilePage>
    </Box>
  );
};
export default LobbyPlayer;
