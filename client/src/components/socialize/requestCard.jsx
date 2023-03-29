import {
  CardHeader,
  CardFooter,
  Flex,
  Button,
  Card,
  Heading,
  Box,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useContext, useState } from "react";
import { FriendContext, SocketContext } from "./socializeComponent";

const RequestCard = ({ friendRequest }) => {
  const { socket } = useContext(SocketContext);
  const { setFriendList, setFriendRequestList, friendRequestList } =
    useContext(FriendContext);
  const [requestState, setRequestState] = useState("");

  const handleAccept = () => {
    socket.emit(
      "requestAccepted",
      friendRequest.username,
      ({ done, newFriend }) => {
        if (done) {
          setFriendList((c) => [newFriend, ...c]);
          setRequestState("Friend Request Accepted");
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
          setRequestState("Friend Request Declined");
          console.log(rejectedFriend);
          return;
        }
      }
    );
  };
  return (
    <Card maxW="md" boxShadow="1px 3px 7px 1px">
      <CardHeader>
        <Flex>
          <Flex
            flex="1"
            gap="8"
            alignItems="center"
            justify="center"
            flexWrap="wrap"
          >
            <Avatar name={friendRequest.username} src="" />
            <Box>
              <Heading size="sm">{friendRequest.username}</Heading>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button
          flex="1"
          variant="ghost"
          onClick={handleAccept}
          leftIcon={<CheckIcon />}
        >
          Accept
        </Button>
        <Button
          flex="1"
          variant="ghost"
          onClick={handleDecline}
          leftIcon={<CloseIcon />}
        >
          Decline
        </Button>
      </CardFooter>
    </Card>
  );
};
export default RequestCard;
