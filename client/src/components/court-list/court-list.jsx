import { VStack, Box, Heading, Divider } from "@chakra-ui/react";
import CourtListItem from "./court-list-item";
import { useState, useEffect } from "react";
const CourtList = () => {
  const [courts, setCourts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourts() {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:5001/basketball_courts");
        const data = await response.json();
        setCourts(data);
      } catch (error) {
        setError(error.message);
      }

      setIsLoading(false);
    }

    fetchCourts();
  }, []);
  return (
    <Box
      bg={"rgba(25, 25, 25, 0.9)"}
      shadow={"dark-lg"}
      borderRadius="10px"
      p="0"
      m="10px"
      color={"white"}
      overflowX={"hidden"}
    >
      <Box borderRadius="10px" height="60px" mb="10px">
        <Heading p="10px">Available Courts</Heading>
        <Divider></Divider>
      </Box>
      <VStack
        height="460px"
        overflowY="scroll"
        mb={"10px"}
        boxSizing="border-box"
      >
        {courts.map((court) => (
          <CourtListItem key={court.court_id} court={court}></CourtListItem>
        ))}
      </VStack>
    </Box>
  );
};
export default CourtList;
