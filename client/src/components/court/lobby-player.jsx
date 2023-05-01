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

  const { socket, friendList } = useGlobalContext();

  useEffect(() => {
    isFriend();
  }, [friendList]);

  const isFriend = () => {
    return friendList.some((user) => user.username === player.username);
  };

  const handleAddFriend = (username) => {
    socket.emit("add_friend", username, ({ errorMsg, done }) => {
      if (done) {
        console.log("added");
      }
      console.log(errorMsg);
    });
  };

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
            <Button onClick={onOpen}>View Profile</Button>
            {!isFriend() === true && (
              <Button
                leftIcon={<FaUserPlus></FaUserPlus>}
                onClick={() => handleAddFriend(player.username)}
              >
                Add Friend
              </Button>
            )}
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
