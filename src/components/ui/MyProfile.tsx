import { Box, Divider, Flex, HStack, Stack } from "@Panda/jsx";
import { Avatar } from "@ParkComponents/avatar";
import { Button } from "@ParkComponents/button";
import { RatingGroup } from "@ParkComponents/rating-group";
import { Text } from "@ParkComponents/text";
import { Settings, Star } from "lucide-react";
import * as React from "react";

interface User {
  user: {
    id: string;
    name: string;
    surname: string;
    imageUrl: string;
    rating: number;
  };
}

export const MyProfile: React.FC<User> = ({ user }) => {
  return (
    <>
      {/* Avatar */}
      <Flex flexDirection={{ base: "column", sm: "row" }} alignItems="center">
        <Avatar
          h={{ base: "300px", md: "250px", sm: "200px" }}
          w={{ base: "300px", md: "250px", sm: "200px" }}
          name={`${user.name} ${user.surname}`}
        />

        {/* Spacer */}
        <Box w="20px" h="20px" />

        {/* User info */}
        <Flex
          flexDirection="column"
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={{ base: "center", sm: "flex-start" }}
          w="100%"
        >
          {/* User name */}
          <Text fontWeight="700" fontSize="5xl">
            {user.name} {user.surname}
          </Text>

          {/* Rating + Hosted events */}
          <HStack mb="10px">
            <RatingGroup count={5} defaultValue={user.rating} disabled />
            <Box w="5px" h="5px" borderRadius="full" bg="fg.subtle" />
            <Text fontSize="xs" color="fg.subtle" fontWeight="500">
              {12} events hosted
            </Text>
          </HStack>

          {/* Following/Followers */}
          <HStack mb="10px">
            <Text fontSize="lg">Following: {45}</Text>
            <Divider h="20px" thickness="2px" orientation="vertical" />
            <Text fontSize="lg">Followers: {120}</Text>
          </HStack>
        </Flex>
        <Stack>
          {/* Rating */}
          <HStack>
            <Text fontSize={60} fontWeight={650}>
              {user.rating}
            </Text>
            <Star size={60} />
          </HStack>

          {/* Button */}
          <Button
            w={{ base: "40px", sm: "55px" }}
            h={{ base: "40px", sm: "55px" }}
            ml={{ base: "", sm: "auto" }}
          >
            {/* size nefunguje */}
            <Settings size={40} />
          </Button>
        </Stack>
      </Flex>
    </>
  );
};
