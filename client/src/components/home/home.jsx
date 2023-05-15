import { Box, VStack, Heading, Divider } from "@chakra-ui/react";
import CourtList from "../court-list/court-list";

const Home = () => {
  return (
    <Box
      width={"100%"}
      position="relative"
      display="flex"
      margin={"auto"}
      justifyContent="center"
      alignItems="center"
    >
      <VStack pt="60px">
        <Heading pb="20px" textShadow={"2px 5px 6px black"} fontSize={"45px"}>
          Choose a court
        </Heading>
        <CourtList></CourtList>
      </VStack>
    </Box>
  );
};

export default Home;
