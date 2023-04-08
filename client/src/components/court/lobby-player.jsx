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

const LobbyPlayer = () => {
  return (
    <Box width="100%">
      <HStack p="10px" justifyContent={"space-between"}>
        <HStack>
          <Avatar name="Sergiu"></Avatar>
          <Heading size="md">Sergiu </Heading>
          <ReactStars
            fullIcon={<FaStar></FaStar>}
            halfIcon={<FaStarHalf></FaStarHalf>}
            emptyIcon={<FaRegStar></FaRegStar>}
          ></ReactStars>
        </HStack>
        <Button leftIcon={<FaUserPlus></FaUserPlus>}>Add Friend</Button>
      </HStack>
      <Divider></Divider>
    </Box>
  );
};
export default LobbyPlayer;
