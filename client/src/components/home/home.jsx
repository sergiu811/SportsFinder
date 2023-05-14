import {
  GridItem,
  Grid,
  Box,
  VStack,
  Heading,
  AbsoluteCenter,
} from "@chakra-ui/react";
import CourtList from "../court-list/court-list";
import ProfileCard from "../profile/profile-card";
import { Typography } from "antd";

const { Title } = Typography;

const Home = () => {
  return (
    <Box
      width={"100%"}
      marginTop="100px"
      position="relative"
      display="flex"
      margin={"auto"}
      justifyContent="center"
      alignItems="center"
    >
      <VStack>
        s <CourtList></CourtList>
      </VStack>
    </Box>
  );
};

export default Home;
