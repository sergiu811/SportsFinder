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
      ({ done, msg, player, court_id, selectedDate, selectedTime }) => {
        if (done) {
          const key = `court:${court_id},time:${selectedTime},date:${selectedDate
            .toString()
            .slice(0, 10)},`;

          const map = players;
          let lobbyPlayers = [];

          if (map.has(key)) {
            lobbyPlayers = map.get(key);
            if (!lobbyPlayers.some((obj) => obj.playerid === player.playerid)) {
              lobbyPlayers.push(player);
              map.delete(key);
            }
          } else {
            lobbyPlayers.push(player);
          }

          setCapacity(lobbyPlayers.length);

          map.set(key, lobbyPlayers);
          setPlayers(map);
          console.log(players);
        } else {
          console.log(msg);
        }
      }
    );
  };

  const handleLeave = () => {
    socket.emit(
      "leaveLobby",
      selectedDate,
      selectedTime,
      id,
      ({ done, msg, removedPlayer, court_id, selectedTime, selectedDate }) => {
        if (done) {
          const key = `court:${court_id},time:${selectedTime},date:${selectedDate
            .toString()
            .slice(0, 10)},`;

          const map = players;
          const lobbyPlayers = players.get(key);
          console.log(map);
          const newLobbyPlayers = lobbyPlayers.filter(
            (el) => el.username !== removedPlayer
          );
          map.delete(key);

          map.set(key, newLobbyPlayers);
          setCapacity(newLobbyPlayers.length);
          setPlayers(map);
        } else {
          console.log(msg);
        }
      }
    );
  };

  // async function fetchPlayers() {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5001/lobby_players?court_id=${id}&&selectedTime=${selectedTime}&&selectedDate=${selectedDate}`
  //     );
  //     const key = JSON.stringify({
  //       courtId: new Number(id),
  //       time_id: new Number(selectedTime),
  //       date: selectedDate.toString().slice(0, 10),
  //     });

  //     const data = await response.json();
  //     setCapacity(data.length);
  //     const map = players;
  //     map.set(key, data);
  //     setPlayers(map);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // }

  useEffect(() => {
    const key = `court:${id},time:${selectedTime},date:${selectedDate
      .toString()
      .slice(0, 10)},`;

    if (players.has(key)) {
      const lobbyplayers = players.get(key);
      setCapacity(lobbyplayers.length);
    }
  }, []);

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
        {/* {players.get({
          courtId: id,
          selectedDate: selectedDate,
          selectedTime: selectedTime,
        }) ? (
          players
            .get({
              courtId: id,
              selectedDate: selectedDate,
              selectedTime: selectedTime,
            })
            .map((player) => {
              return (
                <LobbyPlayer
                  key={player.playerid}
                  player={player}
                ></LobbyPlayer>
              );
            })
        ) : (
          <h1>loading</h1>
        )} */}
      </VStack>
    </Box>
  );
};
export default Lobby;
