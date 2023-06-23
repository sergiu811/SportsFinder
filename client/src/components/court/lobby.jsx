import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Divider, Empty, message, Progress } from "antd";
import LobbyPlayer from "./lobby-player";
import { useParams } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useGlobalContext } from "../../context";
import { useEffect, useState } from "react";
const Lobby = ({ court }) => {
  const {
    socket,
    selectedDate,
    selectedTime,
    players,
    setPlayers,
    setMessage,
    setError,
  } = useGlobalContext();

  const getKey = () => {
    return `court:${id},time:${selectedTime},date:${selectedDate
      .toString()
      .slice(0, 10)},`;
  };

  const { id } = useParams();
  const [capacity, setCapacity] = useState(0);
  const [lobbyPlayers, setLobbyPLayers] = useState([]);
  const [key, setKey] = useState(getKey());

  const getColor = () => {
    if (capacity * 10 < 50) {
      return "red";
    } else if (capacity * 10 >= 50 && capacity * 10 < 90) {
      return "yellow";
    } else {
      return "green";
    }
  };

  const handleLobbyAction = (key, lobbyPlayers, message, map) => {
    setCapacity(lobbyPlayers.length);
    map.set(key, lobbyPlayers);
    setMessage(message);
    setPlayers(map);
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
          handleLobbyAction(key, lobbyPlayers, "Joined lobby", map);
        } else {
          setError(msg);
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
          handleLobbyAction(key, newLobbyPlayers, "Left lobby", map);
        } else {
          setError(msg);
        }
      }
    );
  };

  useEffect(() => {
    const key = getKey();
    if (players.has(key)) {
      const lobbyplayers = players.get(key);
      setCapacity(lobbyplayers.length);
    }
  }, [id, players, selectedDate, selectedTime]);

  useEffect(() => {
    const key = getKey();
    setKey(key);
    setLobbyPLayers(players.get(key));
  }, [players, selectedDate, selectedTime, id]);

  useEffect(() => {
    const key = getKey();
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
            <Heading color="rgba(240,240,240,0.9)" fontSize={"24px"}>
              {court.court_name}
            </Heading>
          </HStack>
          <HStack>
            <Heading fontSize={"24px"} color="rgba(240,240,240,0.9)">
              Lobby Occupancy
            </Heading>
            <Progress
              strokeColor={getColor()}
              style={{ width: "250px", marginLeft: "10px" }}
              percent={capacity * 10}
              format={(percent) => (
                <span
                  style={{
                    color: "white",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >{`${percent}%`}</span>
              )}
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
