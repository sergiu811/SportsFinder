import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
} from "@chakra-ui/modal";
import { Heading, VStack, HStack, Avatar, Button } from "@chakra-ui/react";
import ReactStars from "react-rating-stars-component";
import { FaStar, FaRegStar, FaStarHalf } from "react-icons/fa";
import { useGlobalContext } from "../../context";

const ProfileModal = ({ isOpen, onClose, player }) => {
  const { setError, setMessage } = useGlobalContext();
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
          setMessage("Player rating updated successfully");
          return response.json();
        } else {
          throw new Error(`Error updating player rating: ${response.status}`);
        }
      })
      .then((data) => {
        player.rating = data.rating;
      })
      .catch((error) => {
        setError(`Error updating player rating: ${error}`);
      });
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalContent backgroundColor={"rgba(35,35,35,1)"} pb={"20px"}>
        <ModalCloseButton />
        <VStack mt={"20px"} width={"80%"} margin={"auto"}>
          <Avatar mt={"20px"} name={player.username}></Avatar>
          <Heading>{player.username}</Heading>
          <HStack>
            <Heading color="rgba(240,240,240,0.9)" fontSize={"25px"}>
              Rate Player
            </Heading>
            <ReactStars
              edit={true}
              fullIcon={<FaStar></FaStar>}
              halfIcon={<FaStarHalf></FaStarHalf>}
              emptyIcon={<FaRegStar></FaRegStar>}
              onChange={giveRating}
            ></ReactStars>
          </HStack>
          <HStack>
            <Heading color="rgba(240,240,240,0.9)" fontSize={"25px"}>
              Player Height:
            </Heading>
            <Heading color="rgba(240,240,240,0.9)" fontSize={"25px"}>
              {player.height ? player.height : "-"} cm
            </Heading>
          </HStack>
          <HStack>
            <Heading color="rgba(240,240,240,0.9)" fontSize={"25px"}>
              Player Age:
            </Heading>
            <Heading color="rgba(240,240,240,0.9)" fontSize={"25px"}>
              {player.age ? player.age : "-"}
            </Heading>
          </HStack>
        </VStack>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
