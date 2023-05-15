import { Box, Divider, Heading, HStack, VStack } from "@chakra-ui/react";
import LobbyPlayer from "./lobby-player";
const GamePlayers = ({ players, selectedData }) => {
  return (
    <Box>
      <VStack>
        {players.length > 0 && (
          <HStack
            p={"5px"}
            pl={"10px"}
            pr={"10px"}
            w={"100%"}
            display={"flex"}
            justifyContent="space-between"
          >
            <Heading color="rgba(240,240,240,0.9)" fontSize={"25px"}>
              Players in the lobby
            </Heading>
            <Heading color="rgba(240,240,240,0.9)" fontSize={"20px"}>
              Date: {selectedData}
            </Heading>
          </HStack>
        )}
        <Divider></Divider>
        <Box w={"100%"} p={"5px"}>
          {players.length > 0 ? (
            players.map((player, index) => {
              return <LobbyPlayer player={player} key={index}></LobbyPlayer>;
            })
          ) : (
            <></>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default GamePlayers;
