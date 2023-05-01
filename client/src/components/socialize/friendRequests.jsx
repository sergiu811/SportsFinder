import { AbsoluteCenter, Box, Divider, Heading, Wrap } from "@chakra-ui/react";
import RequestCard from "./requestCard";
import { Empty } from "antd";
import { useGlobalContext } from "../../context";

const FriendRequests = () => {
  const { friendRequestList } = useGlobalContext();
  return (
    <Box w="100%" margin="auto" maxHeight="82vh" h="82vh">
      <Box position={"relative"} p="10px">
        <AbsoluteCenter>
          <Heading size="md">Friend requests</Heading>
        </AbsoluteCenter>
      </Box>

      <Divider mb="5" mt="5"></Divider>
      {friendRequestList.length > 0 ? (
        <Wrap spacing="10" overflowY="scroll" pb="10px" p="10px" maxH="90vh">
          {friendRequestList.map((friendRequest) => {
            return (
              <RequestCard
                key={friendRequest.userid}
                friendRequest={friendRequest}
              ></RequestCard>
            );
          })}
        </Wrap>
      ) : (
        // <Box borderRadius="10px" m="10px" boxShadow="1px 3px 7px 1px" p="20px">
        //   <Heading size="sm" align="center">
        //     No requests
        //   </Heading>
        // </Box>
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
