import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Divider, Empty, Progress } from "antd";
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
  const [lobbyPlayers, setLobbyPLayers] = useState([]);
  const [key, setKey] = useState(
    `court:${id},time:${selectedTime},date:${selectedDate
      .toString()
      .slice(0, 10)},`
  );

  const getColor = () => {
    if (capacity * 10 < 50) {
      return "red";
    } else if (capacity * 10 >= 50 && capacity * 10 < 90) {
      return "yellow";
    } else {
      return "green";
    }
  };

  const handleJoin = () => {
    socket.emit(
      "joinLobby",
      selectedDate,
      selectedTime,
      id,
      ({ done, msg, player }) => {
        if (done) {
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
      ({ done, msg, removedPlayer }) => {
        if (done) {
          const map = players;
          const lobbyPlayers = players.get(key);
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

  useEffect(() => {
    const key = `court:${id},time:${selectedTime},date:${selectedDate
      .toString()
      .slice(0, 10)},`;

    if (players.has(key)) {
      const lobbyplayers = players.get(key);
      setCapacity(lobbyplayers.length);
    }
  }, [id, players, selectedDate, selectedTime]);

  useEffect(() => {
    const key = `court:${id},time:${selectedTime},date:${selectedDate
      .toString()
      .slice(0, 10)},`;

    setKey(key);
    setLobbyPLayers(players.get(key));
  }, [players, selectedDate, selectedTime, id]);

  useEffect(() => {
    const key = `court:${id},time:${selectedTime},date:${selectedDate
      .toString()
      .slice(0, 10)},`;
    if (players.size > 0 && players.has(key)) {
      setCapacity(players.get(key).length);
    } else {
      setCapacity(0);
    }
  }, [players, selectedDate, selectedTime, id]);

  return (
    <Box>
      <VStack alignItems={"flex-start"} width="95%" margin="auto">
        <HStack justifyContent={"space-between"} width="100%">
          <HStack>
            <Heading size={"md"}>Lobby Occupancy</Heading>
            <Progress
              strokeColor={getColor()}
              style={{ width: "200px" }}
              percent={capacity * 10}
            ></Progress>
          </HStack>

          <ButtonGroup
            isDisabled={selectedDate < new Date().toISOString().slice(0, 10)}
          >
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
        border={"none"}
      >
        {players.has(key) ? (
          players.get(key).map((player) => {
            return (
              <LobbyPlayer key={player.playerid} player={player}></LobbyPlayer>
            );
          })
        ) : (
          <Box h="82vh" position={"relative"}>
            <Empty
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: "60px",
              }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div
                  style={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  No users in the lobby
                </div>
              }
            ></Empty>
          </Box>
        )}
      </VStack>
    </Box>
  );
};
export default Lobby;
