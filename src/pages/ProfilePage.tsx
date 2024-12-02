import * as React from "react";
import { useEffect } from "react";
import axios from "axios";
import axiosClient from "../../axiosClient";
import { useShowToast } from "src/hooks";
import { Profile } from "@Components/ui";
import { Box, Divider, Flex } from "@Panda/jsx";
import { Text } from "@ParkComponents/text";
import { Button } from "@ParkComponents/button";

export const ProfilePage: React.FC = () => {
  const [showEvents, setShowEvents] = React.useState(true);
  const showToast = useShowToast();

  const getProfileDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        showToast(
          "Auth Error",
          "User is not authenticated. Please log in.",
          "error"
        );
        return;
      }

      // Make the profile request
      const response = await axiosClient.get(
        `${import.meta.env.VITE_API_KEY}/user/profile`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Profile data acquired successfully!", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(
          "Error",
          `Fetching data failed: ${error.response?.data?.message || error.message}`,
          "error"
        );
      } else {
        showToast("Unexpected Error", "Please try again later", "error");
      }
    }
  };

  useEffect(() => {
    getProfileDetails(); // Attempt to get profile data on component mount
  }, []);

  const mockUser = {
    id: "4",
    name: "Bob",
    surname: "Brown",
    imageUrl: "https://via.placeholder.com/40",
    rating: 3.5,
  };

  return (
    <Box>
      <Profile user={mockUser} />
      <Divider orientation="horizontal" thickness="2px" mt="10px" mb="10px" />
      {/* Switch */}
      <Box w="150px" p="5px" h="36px" rounded="full" bg="bg.muted">
        <Flex justifyItems="center">
          <Button
            w="70px"
            h="26px"
            rounded="full"
            bg={showEvents ? "bg.buttonSmall" : "transparent"}
            onClick={() => setShowEvents(true)}
          >
            <Text>Events</Text>
          </Button>
          <Button
            w="70px"
            h="26px"
            rounded="full"
            bg={showEvents ? "transparent" : "bg.buttonSmall"}
            onClick={() => setShowEvents(false)}
          >
            <Text>Ratings</Text>
          </Button>
        </Flex>
      </Box>
      {/* Content (Events or Ratings) */}
      <Box>{showEvents ? <Text>Events</Text> : <Text>Ratings</Text>}</Box>
    </Box>
  );
};
