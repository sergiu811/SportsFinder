import { Box, Divider, Heading, Wrap } from "@chakra-ui/react";
import RequestCard from "./requestCard";
import { Empty } from "antd";
import { useGlobalContext } from "../../context";

const FriendRequests = () => {
  const { friendRequestList } = useGlobalContext();
  return (
    <Box w="100%" margin="auto" maxHeight="82vh" h="82vh">
      <Heading size="md" pl="5px">
        Friend requests
      </Heading>
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
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>No friend requestss</span>}
        ></Empty>
      )}
    </Box>
  );
};
export default FriendRequests;
