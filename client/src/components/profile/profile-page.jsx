import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/modal";
import {
  ModalOverlay,
  Text,
  Heading,
  VStack,
  HStack,
  Divider,
  Avatar,
} from "@chakra-ui/react";
import ProfileCard from "./profile-card";
import ReactStars from "react-rating-stars-component";
import { FaStar, FaRegStar, FaStarHalf, FaUserPlus } from "react-icons/fa";

const ProfilePage = ({ isOpen, onClose, player }) => {
  const giveRating = (value) => {
    fetch(`http://localhost:5001/player/rating/${player.username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: value }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          console.log("Player rating updated successfully");
          // Perform any other necessary actions after successful update
        } else {
          console.error("Error updating player rating:", response.status);
          // Handle any errors that occur during the request
        }
      })
      .catch((error) => {
        console.error("Error updating player rating:", error);
        // Handle any other errors that occur during the request
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pb={"20px"}>
        <ModalCloseButton />

        <VStack mt={"20px"} width={"80%"} margin={"auto"}>
          <Avatar mt={"20px"} name={player.username}></Avatar>
          <Heading>{player.username}</Heading>
          <HStack>
            <Heading size={"sm"}>Rate Player</Heading>
            <ReactStars
              edit={true}
              fullIcon={<FaStar></FaStar>}
              halfIcon={<FaStarHalf></FaStarHalf>}
              emptyIcon={<FaRegStar></FaRegStar>}
              onChange={giveRating}
            ></ReactStars>
          </HStack>
          <HStack>
            <Heading size={"sm"}>Player Height</Heading>
            <Text>5'8</Text>
          </HStack>
          <HStack>
            <Heading size={"sm"}>Player Age</Heading>
            <Text>24</Text>
          </HStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default ProfilePage;
