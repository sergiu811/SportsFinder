import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Heading,
  Button,
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
import { useGlobalContext } from "../../context";

const ProfileCard = () => {
  const [user, setUser] = useState();
  const [height, setHeight] = useState();
  const [age, setAge] = useState();
  const { setMessage, setError } = useGlobalContext();

  const getUserDetails = async () => {
    const decodedToken = jwt_decode(localStorage.getItem("token"));

    try {
      const response = await fetch(
        `http://localhost:5001/player/${decodedToken.username}`
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data[0]);
        setHeight(data[0].height);
        setAge(data[0].age);
      }
    } catch (error) {
      setError("Failed to load profile");
    }
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
      if (height !== user.height || age !== user.age) {
        if ((height && height <= 0) || (age && age <= 0)) {
          setError("Height and age must be greater than 0.");
          setHeight(user.height);
          setAge(user.age);
          return;
        }

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
          setMessage("User details updated successfully!");
          setUser({ ...user, age: age, height: height });
        } else {
          setError("Failed to update user details");
        }
      } else {
        setError("User details did not change!");
      }
    } catch (error) {
      setError("Error updating user details.");
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
            <Heading color="rgba(240,240,240,0.9)" fontSize={"30px"} size="md">
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
                <Heading color="rgba(240,240,240,0.9)" fontSize={"24px"}>
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
                <Heading color="rgba(240,240,240,0.9)" fontSize={"24px"}>
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
                <Heading color="rgba(240,240,240,0.9)" fontSize={"24px"}>
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
            Update Information
          </Button>
        </CardFooter>
      </Center>
    </Card>
  ) : (
    <></>
  );
};

export default ProfileCard;
