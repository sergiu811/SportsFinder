import {
  CardHeader,
  CardFooter,
  Flex,
  Button,
  Card,
  Heading,
  Box,
  Avatar,
  HStack,
  ButtonGroup,
  Divider,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useGlobalContext } from "../../context";

const RequestCard = ({ friendRequest }) => {
  const { setFriendList, setFriendRequestList, socket } = useGlobalContext();

  const handleAccept = () => {
    socket.emit(
      "requestAccepted",
      friendRequest.username,
      ({ done, newFriend }) => {
        if (done) {
          setFriendList((c) => [newFriend, ...c]);
          setFriendRequestList((c) =>
            c.filter((el) => el.username !== newFriend.username)
          );
          return;
        }
      }
    );
  };

  const handleDecline = () => {
    socket.emit(
      "requestDeclined",
      friendRequest.username,
      ({ done, rejectedFriend }) => {
        if (done) {
          setFriendRequestList((c) =>
            c.filter((el) => el.username !== rejectedFriend)
          );
          return;
        }
      }
    );
  };
  return (
    <Box width={"100%"}>
      <HStack p="15px" display={"flex"} justifyContent={"space-between"}>
        <Box display={"flex"} justifyContent="center" alignItems={"center"}>
          <Avatar name={friendRequest.username} src="" />
          <Heading ml="10px" color="rgba(240,240,240,0.9)" size="sm">
            {friendRequest.username}
          </Heading>
        </Box>
        <ButtonGroup>
          <Button
            flex="1"
            variant="ghost"
            color={"green.400"}
            onClick={handleAccept}
            leftIcon={<CheckIcon />}
          >
            Accept
          </Button>
          <Button
            flex="1"
            color={"red.400"}
            variant="ghost"
            onClick={handleDecline}
            leftIcon={<CloseIcon />}
          >
            Decline
          </Button>
        </ButtonGroup>
      </HStack>
      <Divider></Divider>
    </Box>
  );
};
export default RequestCard;
