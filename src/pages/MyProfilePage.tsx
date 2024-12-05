import * as React from "react";
import { useEffect } from "react";
import axios from "axios";
import axiosClient from "../../axiosClient";
import { useShowToast } from "src/hooks";

import { Box, Divider, VStack } from "@Panda/jsx";
import { Text } from "@ParkComponents/text";
import { MyProfile, RatingCard } from "@Components/ui";
import useAuthState from "src/hooks/useAuthState";

export const MyProfilePage: React.FC = () => {
  const [showEvents, setShowEvents] = React.useState(true);
  const showToast = useShowToast();
  const { user, loading } = useAuthState()
  let userData = null
  if(loading){
    return
  }else{
    userData = user?.data
    console.log(userData)
  }

    


  const mockUser = {
    id: "4",
    name: "Jon",
    surname: "Jones",
    imageUrl: "https://via.placeholder.com/40",
    rating: 3.5,
    ratings: [
      {
        user: {
          id: "1",
          name: "Alice",
          surname: "Brown",
        },
        ratingNumber: 5,
        comment:
          "Jon was incredibly professional and helpful throughout the workshop. A fantastic experience!",
      },
      {
        user: {
          id: "2",
          name: "Bob",
          surname: "Smith",
        },
        ratingNumber: 4,
        comment:
          "Jon is a great instructor, but I felt the session was a bit rushed.",
      },
      {
        user: {
          id: "3",
          name: "Charlie",
          surname: "Johnson",
        },
        ratingNumber: 3,
        comment:
          "Jon was friendly, but I expected more advanced techniques in the workshop.",
      },
      {
        user: {
          id: "4",
          name: "Diana",
          surname: "Evans",
        },
        ratingNumber: 2,
        comment:
          "Jon's insights were invaluable. He made sure everyone felt included and learned something new.",
      },
      {
        user: {
          id: "5",
          name: "Ethan",
          surname: "Williams",
        },
        ratingNumber: 5,
        comment:
          "Jon was excellent, but I wish the workshop had more hands-on exercises.",
      },
    ],
  };

  return (
    <Box>
      {/* User profile */}
      <MyProfile user={userData} />

      {/* Divider */}
      <Divider orientation="horizontal" thickness="2px" mt="10px" mb="10px" />

      {/* Rating cards */}
      <Box
        w="100%"
        pl={{ base: "0px", md: "10%" }}
        pr={{ base: "0px", md: "10%" }}
      >
        <Text fontSize="2xl" fontWeight={620} mb="20px">
          Users Ratings
        </Text>
        <VStack>
          {mockUser.ratings.map((rating, index) => (
            <RatingCard key={index} rating={rating} />
          ))}
        </VStack>
      </Box>
    </Box>
  );
};
