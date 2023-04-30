import {
  Image,
  Heading,
  Button,
  HStack,
  Divider,
  VStack,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

const CourtListItem = ({ court }) => {
  const navigate = useNavigate();
  return (
    <VStack w="100%" p="5px" pl="10px" pr="10px" borderRadius="10px">
      <HStack w="100%" justifyContent="space-between">
        <Image
          objectFit="scale-down"
          maxW={{ base: "100px", sm: "110px" }}
          src={court.image}
          alt="Court image"
        />
        <Heading size="sm">{court.court_name}</Heading>
        <Button onClick={() => navigate(`/courts/${court.court_id}`)}>
          Go to court
        </Button>
      </HStack>
      <Divider></Divider>
    </VStack>
  );
};

export default CourtListItem;
