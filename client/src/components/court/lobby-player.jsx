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
import ProfileModal from "../profile/profile-modal";

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
        marginTop="2px"
        textColor="#F5F5F5"
        boxShadow={isSameUser() ? "0px 1px 0px 0px orange" : "none"}
        borderRadius="10px"
        backgroundColor={
          isSameUser() ? "rgba(100,100,110,0.4)" : "transaparent"
        }
        justifyContent={"space-between"}
      >
        <HStack>
          <Avatar fontSize={"25px"} name={player.username}></Avatar>
          <Heading color="rgba(240,240,240,0.9)" size="sm">
            {player.username}{" "}
          </Heading>
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
      <ProfileModal
        isOpen={isOpen}
        onClose={onClose}
        player={player}
      ></ProfileModal>
    </Box>
  );
};
export default LobbyPlayer;
