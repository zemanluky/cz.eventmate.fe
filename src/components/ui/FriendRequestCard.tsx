import { Box, Divider, HStack } from "@Panda/jsx";
import { Avatar } from "@ParkComponents/avatar";
import { Button } from "@ParkComponents/button";
import { Text } from "@ParkComponents/text";
import * as React from "react";
import { Link } from "react-router-dom";

interface User {
  user: { id: string; name: string; surname: string; imageUrl: string };
}

export const FriendRequestCard: React.FC<User> = ({ user }) => {
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
      <Link to={`/profile/${user.id}`}>
        <HStack>
          <Avatar src={user.imageUrl} name={`${user.name} ${user.surname}`} />
          <Text>
            {user.name} {user.surname}
          </Text>
        </HStack>
      </Link>

      <HStack h="100%">
        <Button
          size="xs" /*onClick={ acceptFriendRequest(user.id, loggedInUser.id) }*/
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
          bg="bg.reject" /*onClick={ rejectFriendRequest(user.id, loggedInUser.id) }*/
        >
          <Text>Reject</Text>
        </Button>
      </HStack>
    </Box>
  );
};
