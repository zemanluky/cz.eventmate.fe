import { Box, Divider, HStack } from "@Panda/jsx";
import { Avatar } from "@ParkComponents/avatar";
import { Button } from "@ParkComponents/button";
import { Text } from "@ParkComponents/text";
import axios from "axios";
import axiosClient from "axiosClient";
import * as React from "react";
import { Link } from "react-router-dom";
import { useShowToast } from "src/hooks";

export interface User {
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

interface FriendRequest {
  _id: string;
  sender: User;
  receiver: string;
  createdAt: string;
  state: string;
  __v: number;
}

export const FriendRequestCard: React.FC<FriendRequest[]> = ({ request }) => {
  const showToast = useShowToast();

  // rejecting friend request
  const handleRejectFriendRequest = async (friendRequestId: string) => {
    try {
      const body = { accept: false };
      console.log(friendRequestId)
      const response = await axiosClient.patch(
        `${import.meta.env.VITE_API_KEY}/user/friend-request/${friendRequestId}`,
        body
      );
      if (response.status === 204) {
        showToast("Success", "Rejected friend request", "success");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(
          "Error",
          error.response?.data?.message || error.message,
          "error"
        );
      } else {
        showToast("Unexpected Error", "Please try again later", "error");
      }
    }
  };

  // accepting friend request
  const handleAcceptFriendRequest = async (friendRequestId: string) => {
    try {
      const body = { accept: true };
      const response = await axiosClient.patch(
        `${import.meta.env.VITE_API_KEY}/user/friend-request/${friendRequestId}`,
        body
      );
      if (response.status === 204) {
        showToast("Success", "Accepted friend request", "success");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(
          "Error",
          error.response?.data?.message || error.message,
          "error"
        );
      } else {
        showToast("Unexpected Error", "Please try again later", "error");
      }
    }
  };

  return (
    <Box
      w="100%"
      h="50px"
      p="5px"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Link to={`/profile/${request.sender?._id}`}>
        <HStack>
          <Avatar
            src={request.sender?.imageUrl}
            name={`${request.sender?.name} ${request.sender?.surname}`}
          />
          <Text>
            {request.sender?.name} {request.sender?.surname}
          </Text>
        </HStack>
      </Link>

      <HStack h="100%">
        <Button
          size="xs"
          onClick={() => {
            handleAcceptFriendRequest(request._id);
          }}
        >
          <Text>Accept</Text>
        </Button>
        <Divider
          orientation="vertical"
          thickness="4px"
          h="40%"
          color="grey.200"
          borderRadius={2}
        />
        <Button
          size="xs"
          bg="bg.reject"
          onClick={() => {
            handleRejectFriendRequest(request._id);
          }}
        >
          <Text>Reject</Text>
        </Button>
      </HStack>
    </Box>
  );
};
