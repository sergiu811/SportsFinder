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
import { FaUserPlus } from "react-icons/fa";
import { SiHandshake } from "react-icons/si";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { Badge } from "antd";
import { useGlobalContext } from "../../context";

const SocializeCompoenent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { friendRequestList } = useGlobalContext();

  return (
    <Grid as={Tabs} templateColumns={"0.6fr 9fr"} w="100%">
      <GridItem
        bg={"rgba(25, 25, 25, 0.9)"}
        borderRadius="10px"
        color={"white"}
        m="10px"
        mt="1vh"
        shadow={"dark-lg"}
      >
        <VStack as={TabList} h="80vh" border="none" pt="45px">
          <Tab>
            <Icon
              color={"white"}
              width="30px"
              height="30px"
              as={HiChatBubbleLeftRight}
            />
          </Tab>
          <Tab>
            <Badge count={friendRequestList.length}>
              <Icon
                color={"white"}
                width="30px"
                height="30px"
                as={SiHandshake}
              />
            </Badge>
          </Tab>
          <HStack onClick={onOpen}>
            <Icon width="30px" height="30px" as={FaUserPlus} />
          </HStack>
        </VStack>
        <AddFriendModal isOpen={isOpen} onClose={onClose} />
      </GridItem>
      <GridItem
        bg={"rgba(25, 25, 25, 0.9)"}
        borderRadius="10px"
        m="10px"
        mt="1vh"
        shadow={"dark-lg"}
      >
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
