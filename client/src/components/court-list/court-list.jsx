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
    <Box boxShadow="1px 3px 7px 1px" borderRadius="10px" m="10px">
      <Box borderRadius="10px" height="60px" mb="10px">
        <Heading p="10px">Available Courts</Heading>
        <Divider></Divider>
      </Box>
      <VStack height="460px" overflow="scroll" boxSizing="border-box">
        {courts.map((court) => (
          <CourtListItem key={court.court_id} court={court}></CourtListItem>
        ))}
      </VStack>
    </Box>
  );
};
export default CourtList;
