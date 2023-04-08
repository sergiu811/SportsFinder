import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Divider, Progress } from "antd";
import LobbyPlayer from "./lobby-player";

import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const Lobby = () => {
  return (
    <Box>
      <VStack alignItems={"flex-start"} width="95%" margin="auto">
        <HStack justifyContent={"space-between"} width="100%">
          <HStack>
            <Heading size={"md"}>Lobby Capacity</Heading>
            <Progress
              strokeColor={"green"}
              style={{ width: "200px" }}
              percent={(4 * 100) / 10}
            ></Progress>
          </HStack>

          <ButtonGroup>
            <Button
              leftIcon={<FaSignInAlt></FaSignInAlt>}
              _hover={{ backgroundColor: "green.400" }}
            >
              Join
            </Button>
            <Button
              leftIcon={<FaSignOutAlt></FaSignOutAlt>}
              _hover={{ backgroundColor: "red.400" }}
            >
              Leave
            </Button>
          </ButtonGroup>
        </HStack>
        <Divider></Divider>
      </VStack>

      <VStack
        height="70vh"
        overflowY={"scroll"}
        width="95%"
        margin="auto"
        spacing="20px"
      >
        <LobbyPlayer></LobbyPlayer>
        <LobbyPlayer></LobbyPlayer>
        <LobbyPlayer></LobbyPlayer>
        <LobbyPlayer></LobbyPlayer>
        <LobbyPlayer></LobbyPlayer>
        <LobbyPlayer></LobbyPlayer>
        <LobbyPlayer></LobbyPlayer>
        <LobbyPlayer></LobbyPlayer>
        <LobbyPlayer></LobbyPlayer>
        <LobbyPlayer></LobbyPlayer>
      </VStack>
    </Box>
  );
};
export default Lobby;
