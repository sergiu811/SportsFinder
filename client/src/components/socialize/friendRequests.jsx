import {
  AbsoluteCenter,
  Box,
  Divider,
  Heading,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import RequestCard from "./requestCard";
import { Empty } from "antd";
import { useGlobalContext } from "../../context";

const FriendRequests = () => {
  const { friendRequestList } = useGlobalContext();
  return (
    <Box w="100%" margin="auto" maxHeight="81vh" height={"82vh"}>
      <Box position={"relative"} p="10px">
        <AbsoluteCenter>
          <Heading color="rgba(240,240,240,0.9)" fontSize={"24px"}>
            Friend requests
          </Heading>
        </AbsoluteCenter>
      </Box>

      <Divider mb="5" mt="5"></Divider>
      {friendRequestList.length > 0 ? (
        <VStack
          width={"100%"}
          spacing="10"
          overflowY="scroll"
          pb="10px"
          p="10px"
          maxH="80vh"
          h="75vh"
        >
          {friendRequestList.map((friendRequest) => {
            return (
              <RequestCard
                key={friendRequest.userid}
                friendRequest={friendRequest}
              ></RequestCard>
            );
          })}
        </VStack>
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
                No friend requests
              </span>
            }
          ></Empty>
        </Box>
      )}
    </Box>
  );
};
export default FriendRequests;
