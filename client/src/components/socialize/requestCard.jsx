import {
  CardHeader,
  CardFooter,
  Flex,
  Button,
  Card,
  Heading,
  Box,
  Avatar,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const RequestCard = () => {
  return (
    <Card maxW="md">
      <CardHeader>
        <Flex>
          <Flex
            flex="1"
            gap="8"
            alignItems="center"
            justify="center"
            flexWrap="wrap"
          >
            <Avatar name="Segun Adebayo" src="" />
            <Box>
              <Heading size="sm">Segun Adebayo</Heading>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button flex="1" variant="ghost" leftIcon={<CheckIcon />}>
          Accept
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<CloseIcon />}>
          Decline
        </Button>
      </CardFooter>
    </Card>
  );
};
export default RequestCard;
