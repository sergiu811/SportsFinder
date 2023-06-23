import {
  Box,
  GridItem,
  VStack,
  Grid,
  Heading,
  Button,
  Divider,
} from "@chakra-ui/react";
import { Empty } from "antd";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import GamePlayers from "./game-players";
import { useGlobalContext } from "../../context";

const LobbyHistory = () => {
  const { setError } = useGlobalContext();
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedData, setSelectedDate] = useState("");
  const [activeGame, setActiveGame] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [time_intervals, setTimeIntervals] = useState([]);

  useEffect(() => {
    async function fetchTimeInterval() {
      try {
        const response = await fetch("http://localhost:5001/time_intervals");
        const data = await response.json();
        const options = data.map((option) => {
          return {
            value: option.time_id,
            label: option.time_interval,
          };
        });

        setTimeIntervals(options);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchTimeInterval();
  }, []);

  const getGameHistory = async () => {
    const decodedToken = jwt_decode(localStorage.getItem("token"));

    try {
      const data = await fetch(
        `http://localhost:5001/game_history/${decodedToken.id}`
      );
      const response = await data.json();
      setGames(response);
    } catch (error) {
      setError(error);
    }
  };

  const changeGame = async (game) => {
    try {
      const data = await fetch(
        `http://localhost:5001/lobby_players?court_id=${game.court_id}&selectedTime=${game.time_id}&selectedDate=${game.date}`
      );
      const response = await data.json();
      setPlayers(response);
      setSelectedDate(game.date);
      setActiveGame(game);

      console.log(game.time_id);
      const time = time_intervals.filter((time) => {
        return time.value === game.time_id;
      });
      setSelectedTime(time[0].label);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getGameHistory();
  }, []);

  useEffect(() => {
    if (games.length > 0) {
      changeGame(games[0]);
      setActiveGame(games[0]);
    }
  }, [games]);

  return games.length > 0 ? (
    <Box>
      <Grid templateColumns={"3fr 8fr"}>
        <GridItem height={"82vh"} borderRight="1px solid grey">
          <VStack>
            <Box textAlign="center" w={"100%"} p="5px">
              <Heading color="rgba(240,240,240,0.9)" fontSize={"25px"}>
                Games Played
              </Heading>
            </Box>
            <Divider></Divider>
            <VStack w={"100%"} maxH={"75vh"} overflowY="scroll">
              {games.length > 0 ? (
                games.map((game, index) => {
                  const isActive = game === activeGame;
                  return (
                    <Box width={"100%"} p="5px" textAlign="center" key={index}>
                      <Button
                        onClick={() => changeGame(game)}
                        width={"100%"}
                        p="5px"
                        fontSize={"20px"}
                        colorScheme={isActive ? "orange" : "gray"}
                        variant={isActive ? "solid" : "outline"}
                      >
                        {game.court_name} {game.date}
                      </Button>
                      <Divider></Divider>
                    </Box>
                  );
                })
              ) : (
                <></>
              )}
            </VStack>
          </VStack>
        </GridItem>
        <GridItem>
          <GamePlayers
            players={players}
            selectedData={selectedData}
            timeInterval={selectedTime}
          ></GamePlayers>
        </GridItem>
      </Grid>
    </Box>
  ) : (
    <Box position={"relative"}>
      <Empty
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "60px",
        }}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <span
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            No games history
          </span>
        }
      ></Empty>
    </Box>
  );
};

export default LobbyHistory;
