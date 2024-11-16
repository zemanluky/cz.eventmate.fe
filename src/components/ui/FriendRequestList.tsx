import { Stack } from "@Panda/jsx";
import * as React from "react";
import { FriendRequestCard } from "./FriendRequestCard";

interface UserList {
  userList: User[];
}

interface User {
  user: { id: string; name: string; surname: string; imageUrl: string };
}

export const FriendRequestList: React.FC<UserList> = ({ userList }) => {
  return (
    <Stack w="100%">
      {userList.map(({ user }) => (
        <FriendRequestCard key={user.id} user={user} />
      ))}
    </Stack>
  );
};
