import {
  Avatar,
  Card,
  Heading,
  Button,
  ButtonGroup,
  Text,
  Divider,
  CardBody,
  Stack,
  CardFooter,
  Center,
  Box,
  Image,
  Badge,
} from "@chakra-ui/react";

const ProfileCard = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    status: "Active",
  };
  return (
    <Card
      maxW="sm"
      shadow={"dark-lg"}
      borderRadius={"10px"}
      height="460px"
      m="10px"
    >
      <CardBody>
        <Center>
          {" "}
          <Avatar></Avatar>
        </Center>

        <Stack mt="6" spacing="3">
          <Center>
            <Heading size="md">Name</Heading>
          </Center>

          <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design
            with a sprinkle of vintage design.
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <Center>
        <CardFooter>
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
        </CardFooter>
      </Center>
    </Card>
  );
};
export default ProfileCard;
