import {
  Box,
  GridItem,
  VStack,
  Grid,
  Heading,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import GamePlayers from "./game-players";

const LobbyHistory = () => {
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedData, setSelectedDate] = useState("");
  const [activeGame, setActiveGame] = useState(null);

  const getGameHistory = async () => {
    const decodedToken = jwt_decode(localStorage.getItem("token"));

    const data = await fetch(
      `http://localhost:5001/game_history/${decodedToken.id}`
    );
    const response = await data.json();
    console.log(response);
    setGames(response);
  };

  const changeGame = async (game) => {
    const data = await fetch(
      `http://localhost:5001/lobby_players?court_id=${game.court_id}&selectedTime=${game.time_id}&selectedDate=${game.date}`
    );
    const response = await data.json();
    setPlayers(response);
    setSelectedDate(game.date);
    setActiveGame(game); // Set the active game
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

  return (
    <Box>
      <Grid templateColumns={"3fr 8fr"}>
        <GridItem height={"82vh"} borderRight="1px solid grey">
          <VStack>
            <Box textAlign="center" w={"100%"} p="5px">
              <Heading fontSize={"20px"}>Games Played</Heading>
            </Box>
            <Divider></Divider>
            {games.length > 0 ? (
              games.map((game, index) => {
                const isActive = game === activeGame;
                return (
                  <Box width={"100%"} p="5px" textAlign="center" key={index}>
                    <Button
                      onClick={() => changeGame(game)}
                      width={"100%"}
                      p="5px"
                      size={"sm"}
                      colorScheme={isActive ? "orange" : "gray"}
                      variant={isActive ? "solid" : "outline"}
                    >
                      {game.court_name}
                    </Button>
                    <Divider></Divider>
                  </Box>
                );
              })
            ) : (
              <></>
            )}
          </VStack>
        </GridItem>
        <GridItem>
          <GamePlayers
            players={players}
            selectedData={selectedData}
          ></GamePlayers>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default LobbyHistory;
