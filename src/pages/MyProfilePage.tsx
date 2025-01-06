import * as React from "react";
import { useShowToast } from "src/hooks";
import { Box, Divider, VStack } from "@Panda/jsx";
import { Text } from "@ParkComponents/text";
import { MyProfile, RatingCard } from "@Components/ui";
import useAuthStore from "src/store/authStore";
import { Spinner } from "@ParkComponents/spinner";
import axios from "axios";
import axiosClient from "axiosClient";

export const MyProfilePage: React.FC = () => {
  const user = useAuthStore((state) => state.user); // Getting the authenticated user from global state

  return (
    <Box>
      {/* User profile */}
      <MyProfile user={user} />

      {/* Divider */}
      <Divider orientation="horizontal" thickness="2px" mt="10px" mb="10px" />

      {/* Rating cards */}
      <Box
      >
        <Text fontSize="2xl" fontWeight={600} mb="20px">
          Users Ratings
        </Text>
        <VStack>
          {user?.ratings.length > 0 ? ( // Render ratings if available
            <VStack mt="20px" gap="16px" w="full">
              {user?.ratings?.map((rating, index) => (
                <RatingCard key={index} rating={rating} />
              ))}
            </VStack>
          ) : (
            // No ratings available
            <VStack>
              <Text fontWeight={600} fontSize={"32px"} color="fg.subtle">
                This user has no ratings yet
              </Text>
            </VStack>
          )}
        </VStack>
      </Box>
    </Box>
  );
};
