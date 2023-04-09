import {
  Grid,
  GridItem,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  VStack,
  HStack,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import FriendsChatComponent from "../friends-chat/friends-chat-component";
import AddFriendModal from "../add-friend-modal/add-friend-modal";
import FriendRequests from "./friendRequests";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { Badge } from "antd";
import { useGlobalContext } from "../../context";

const SocializeCompoenent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { friendList, friendRequestList } = useGlobalContext();

  return (
    <Grid as={Tabs} templateColumns={"0.6fr 9fr"} w="100%">
      <GridItem borderRadius="10px" m="10px" mt="1vh" shadow={"dark-lg"}>
        <VStack as={TabList} h="80vh" border="none" pt="45px">
          <Tab>
            <Badge count={friendList.length}>
              <Icon width="30px" height="30px" as={HiChatBubbleLeftRight} />
            </Badge>
          </Tab>
          <Tab>
            <Badge count={friendRequestList.length}>
              <Icon width="30px" height="30px" as={FaUserFriends} />
            </Badge>
          </Tab>
          <HStack onClick={onOpen}>
            <Icon width="30px" height="30px" as={FaUserPlus} />
          </HStack>
        </VStack>
        <AddFriendModal isOpen={isOpen} onClose={onClose} />
      </GridItem>
      <GridItem borderRadius="10px" m="10px" mt="1vh" shadow={"dark-lg"}>
        <TabPanels>
          <TabPanel padding="0">
            <FriendsChatComponent />
          </TabPanel>
          <TabPanel>
            <HStack>
              <FriendRequests></FriendRequests>
            </HStack>
          </TabPanel>
        </TabPanels>
      </GridItem>
    </Grid>
  );
};

export default SocializeCompoenent;
