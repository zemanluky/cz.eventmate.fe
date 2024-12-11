import * as React from "react";
import { useEffect } from "react";
import axios from "axios";
import axiosClient from "../../axiosClient";
import { useShowToast } from "src/hooks";
import { EventCardBigDesktop, Profile, RatingCard } from "@Components/ui";
import { Box, Divider, Flex, VStack } from "@Panda/jsx";
import { Text } from "@ParkComponents/text";
import { Button } from "@ParkComponents/button";
//import { useParams } from "react-router-dom";

export const ProfilePage: React.FC = () => {
  //const params = useParams();
  //const userId = params.userId as string;
  //const user = handleGetUser(userId) */

  const mockEvents = [
    {
      _id: "event-1",
      name: "Tech Innovators Meetup",
      image: "https://via.placeholder.com/300x200?text=Tech+Meetup",
      date: "2024-12-15",
      location: "San Francisco, CA",
      memberList: [
        {
          member: {
            id: "member-1",
            name: "Alice",
            surname: "Smith",
            imageUrl: "https://via.placeholder.com/100?text=Alice",
          },
        },
        {
          member: {
            id: "member-2",
            name: "Bob",
            surname: "Johnson",
            imageUrl: "https://via.placeholder.com/100?text=Bob",
          },
        },
      ],
    },
    {
      _id: "event-2",
      name: "Art & Design Expo",
      image: "https://via.placeholder.com/300x200?text=Art+Expo",
      date: "2024-12-20",
      location: "New York, NY",
      memberList: [
        {
          member: {
            id: "member-3",
            name: "Catherine",
            surname: "Davis",
            imageUrl: "https://via.placeholder.com/100?text=Catherine",
          },
        },
        {
          member: {
            id: "member-4",
            name: "Daniel",
            surname: "Brown",
            imageUrl: "https://via.placeholder.com/100?text=Daniel",
          },
        },
      ],
    },
    {
      _id: "event-3",
      name: "Startup Pitch Night",
      image: "https://via.placeholder.com/300x200?text=Startup+Pitch",
      date: "2025-01-10",
      location: "Austin, TX",
      memberList: [
        {
          member: {
            id: "member-5",
            name: "Emma",
            surname: "Clark",
            imageUrl: "https://via.placeholder.com/100?text=Emma",
          },
        },
        {
          member: {
            id: "member-6",
            name: "Frank",
            surname: "Wilson",
            imageUrl: "https://via.placeholder.com/100?text=Frank",
          },
        },
        {
          member: {
            id: "member-7",
            name: "Grace",
            surname: "Martinez",
            imageUrl: "https://via.placeholder.com/100?text=Grace",
          },
        },
      ],
    },
  ];

  const mockRatings = [
    {
      user: {
        id: "user-1",
        name: "Alice",
        surname: "Johnson",
      },
      ratingNumber: 5,
      comment: "Amazing event! Learned so much and met incredible people.",
    },
    {
      user: {
        id: "user-2",
        name: "Bob",
        surname: "Smith",
      },
      ratingNumber: 4,
      comment: "Great experience overall, but the venue was a bit crowded.",
    },
    {
      user: {
        id: "user-3",
        name: "Catherine",
        surname: "Brown",
      },
      ratingNumber: 3,
      comment: "It was okay, but I expected more from the keynote speaker.",
    },
    {
      user: {
        id: "user-4",
        name: "Daniel",
        surname: "Taylor",
      },
      ratingNumber: 2,
      comment: "Not well organized, and the schedule was delayed.",
    },
    {
      user: {
        id: "user-5",
        name: "Emma",
        surname: "Williams",
      },
      ratingNumber: 5,
      comment: "Fantastic! The workshops were top-notch and very engaging.",
    },
  ];

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
      <Box>
        {showEvents ? (
          <Flex
            gap="16px"
            mt={"20px"}
            flexWrap={"wrap"}
            justifyContent="center"
          >
            {mockEvents.map((event) => (
              <EventCardBigDesktop key={event._id} event={event} />
            ))}
          </Flex>
        ) : (
          <VStack mt="20px" gap="16px">
            {mockRatings.map((rating, index) => (
              <RatingCard key={index} rating={rating} />
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  );
};
