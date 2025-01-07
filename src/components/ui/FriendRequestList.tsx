import { Flex, Stack } from "@Panda/jsx";
import * as React from "react";
import { FriendRequestCard } from "./FriendRequestCard";
import { Text } from "@ParkComponents/text";
import useAuthState from "src/hooks/useAuthState";
import useUserProfileStore from "src/store/userProfileStore";
import useAuthStore from "src/store/authStore";

interface RequestsData {
  data: FriendRequest[];
}

export interface FriendRequest {
  _id: string;
  sender: User;
  receiver: string;
  createdAt: string;
  state: string;
  __v: number;
}

interface User {
  _id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
  bio: string | null;
  profile_picture_path: string | null;
  friends: string[];
  ratings: string[];
  __v: number;
}

export const FriendRequestList: React.FC<RequestsData> = ({ requestsData }) => {
  const [requests, setRequests] = React.useState(requestsData); // Local state for requests

  // Function to handle request removal
  const removeRequest = (requestId: string) => {
    setRequests((prevRequests) =>
      prevRequests.filter((request) => request._id !== requestId)
    );
  };

  return (
    <Stack w="100%">
      {requests?.length > 0 ? (
        requests?.map((request) => (
          <FriendRequestCard
            key={request._id}
            request={request}
            onRequestUpdate={removeRequest} // Pass function to card
          />
        ))
      ) : (
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Text fontWeight={500} color="fg.subtle">
            You have no friend requests
          </Text>
        </Flex>
      )}
    </Stack>
  );
};
