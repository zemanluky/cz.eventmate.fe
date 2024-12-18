import { Stack } from "@Panda/jsx";
import * as React from "react";
import { FriendRequestCard } from "./FriendRequestCard";

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

  return (
    <Stack w="100%">
      {requestsData.map((request) => (
        <FriendRequestCard key={request._id} request={request} />
      ))}
    </Stack>
  );
};
