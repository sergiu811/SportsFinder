import {
  Image,
  Heading,
  Button,
  HStack,
  Divider,
  VStack,
  Box,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

const CourtListItem = ({ court }) => {
  const navigate = useNavigate();
  return (
    <Box
      width={"fit-content"}
      height={"100%"}
      bg={"rgba(25,25,25,0.9)"}
      p="10px"
      pl="10px"
      pr="10px"
      borderRadius="10px"
    >
      <VStack>
        <Image maxW={{ sm: "32vw" }} src={court.image} alt="Court image" />
        <Heading padding="10px" size="lg">
          {court.court_name}
        </Heading>
        <Button
          fontSize={"24px"}
          paddingLeft={"30px"}
          paddingRight={"30px"}
          color="rgba(240,240,240,0.9)"
          onClick={() => navigate(`/courts/${court.court_id}`)}
        >
          Go to court
        </Button>
      </VStack>
    </Box>
  );
};

export default CourtListItem;
