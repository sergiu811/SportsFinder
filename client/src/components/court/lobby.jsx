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
import { useParams } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useGlobalContext } from "../../context";
import { useEffect, useState } from "react";

const Lobby = () => {
  const { socket, selectedDate, selectedTime, players, setPlayers } =
    useGlobalContext();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [capacity, setCapacity] = useState(0);

  const handleJoin = () => {
    socket.emit(
      "joinLobby",
      selectedDate,
      selectedTime,
      id,
      ({ done, msg, player }) => {
        if (done) {
          console.log(player);
          setPlayers([player, ...players]);
        }
        console.log(msg);
      }
    );
  };

  const handleLeave = () => {
    socket.emit(
      "leaveLobby",
      selectedDate,
      selectedTime,
      id,
      ({ done, msg, removedPlayer }) => {
        if (done) {
          console.log(removedPlayer);
          setPlayers((c) => c.filter((el) => el.username !== removedPlayer));
        }
        console.log(msg);
      }
    );
  };

  async function fetchPlayers() {
    try {
      const response = await fetch(
        `http://localhost:5001/lobby_players?court_id=${id}&&selectedTime=${selectedTime}&&selectedDate=${selectedDate}`
      );
      const data = await response.json();
      setCapacity(data.length);
      setPlayers(data);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    if (
      id !== undefined &&
      selectedTime !== undefined &&
      selectedDate !== undefined
    ) {
      fetchPlayers();
    }
    setIsLoading(false);
  }, [id, selectedTime, selectedDate]);

  return (
    <Box>
      <VStack alignItems={"flex-start"} width="95%" margin="auto">
        <HStack justifyContent={"space-between"} width="100%">
          <HStack>
            <Heading size={"md"}>Lobby Capacity</Heading>
            <Progress
              strokeColor={"green"}
              style={{ width: "200px" }}
              percent={(capacity * 100) / 10}
            ></Progress>
          </HStack>

          <ButtonGroup>
            <Button
              leftIcon={<FaSignInAlt></FaSignInAlt>}
              _hover={{ backgroundColor: "green.400" }}
              onClick={handleJoin}
            >
              Join
            </Button>
            <Button
              leftIcon={<FaSignOutAlt></FaSignOutAlt>}
              _hover={{ backgroundColor: "red.400" }}
              onClick={handleLeave}
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
        {players.length > 0 ? (
          players.map((player) => {
            return (
              <LobbyPlayer key={player.playerid} player={player}></LobbyPlayer>
            );
          })
        ) : (
          <h1>loading</h1>
        )}
      </VStack>
    </Box>
  );
};
export default Lobby;
