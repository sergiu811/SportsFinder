import { ChatIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Grid,
  Heading,
  HStack,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import RequestCard from "./requestCard";

const FriendRequests = () => {
  return (
    <Box w="90%" margin="auto" h="97vh">
      <Heading>Friend requests</Heading>
      <Divider mb="5" mt="5"></Divider>
      <Wrap spacing="10" overflowY="scroll" pb="10px" pt="10px" maxH="90vh">
        <RequestCard></RequestCard>
        <RequestCard></RequestCard>
        <RequestCard></RequestCard>
        <RequestCard></RequestCard>
        <RequestCard></RequestCard>
      </Wrap>
    </Box>
  );
};
export default FriendRequests;
