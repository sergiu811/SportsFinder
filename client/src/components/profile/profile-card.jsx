import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Heading,
  Button,
  Text,
  Divider,
  CardBody,
  Stack,
  CardFooter,
  Center,
  VStack,
  Input,
  Grid,
} from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import ReactStars from "react-rating-stars-component";
import { FaStar, FaRegStar, FaStarHalf } from "react-icons/fa";

const ProfileCard = () => {
  const [user, setUser] = useState();
  const [height, setHeight] = useState();
  const [age, setAge] = useState();

  const getUserDetails = async () => {
    const decodedToken = jwt_decode(localStorage.getItem("token"));

    const response = await fetch(
      `http://localhost:5001/player/${decodedToken.username}`
    );
    const data = await response.json();
    setUser(data[0]);
    setHeight(data[0].height);
    setAge(data[0].age);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/player/${user.username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            height: height ? height : null,
            age: age ? age : null,
          }),
        }
      );

      if (response.ok) {
        // Update the user object with the new height and age values
        setUser((prevUser) => ({
          ...prevUser,
          height: height,
          age: age,
        }));
        console.log("User details updated successfully!");
      } else {
        console.log("Failed to update user details");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return user ? (
    <Card
      width="100%"
      margin="auto"
      shadow={"dark-lg"}
      borderRadius={"10px"}
      height="82vh"
      bg={"rgba(25, 25, 25, 0.9)"}
    >
      <CardBody>
        <Center>
          <Avatar name={user.username}></Avatar>
        </Center>

        <Stack mt="6" spacing="3">
          <Center>
            <Heading fontSize={"30px"} color="rgba(240,240,240,0.9)" size="md">
              {user.username}
            </Heading>
          </Center>
          <Divider />
          <Center>
            <VStack spacing={4}>
              <Grid
                templateColumns="1fr 9fr"
                justifyContent={"center"}
                alignItems="center"
                gap={6}
              >
                <Heading fontSize={"24px"} color="rgba(240,240,240,0.9)">
                  Rating:
                </Heading>
                <ReactStars
                  size={24}
                  edit={false}
                  fullIcon={<FaStar></FaStar>}
                  halfIcon={<FaStarHalf></FaStarHalf>}
                  emptyIcon={<FaRegStar></FaRegStar>}
                  value={user.rating}
                ></ReactStars>
                <Heading fontSize={"24px"} color="rgba(240,240,240,0.9)">
                  Age:
                </Heading>
                <Input
                  fontSize={"24px"}
                  color="rgba(240,240,240,0.9)"
                  fontWeight={"bold"}
                  type="number"
                  value={age ? age : ""}
                  onChange={handleAgeChange}
                />
                <Heading fontSize={"24px"} color="rgba(240,240,240,0.9)">
                  Height:
                </Heading>
                <Input
                  fontSize={"24px"}
                  color="rgba(240,240,240,0.9)"
                  fontWeight={"bold"}
                  min={0}
                  type="number"
                  value={height ? height : ""}
                  onChange={handleHeightChange}
                />
              </Grid>
            </VStack>
          </Center>
        </Stack>
      </CardBody>
      <Divider />
      <Center>
        <CardFooter>
          <Button
            paddingLeft={"30px"}
            paddingRight={"30px"}
            fontSize={"24px"}
            color="rgba(240,240,240,0.9)"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </CardFooter>
      </Center>
    </Card>
  ) : (
    <></>
  );
};

export default ProfileCard;
