import { Box, Divider, Flex, Grid, GridItem, HStack } from "@Panda/jsx";
import { Avatar } from "@ParkComponents/avatar";
import { Button } from "@ParkComponents/button";
import { RatingGroup } from "@ParkComponents/rating-group";
import { Text } from "@ParkComponents/text";
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

export const Profile: React.FC<User> = ({ user }) => {
  return (
    <Flex flexDirection={{ base: "column", sm: "row" }} alignItems="center">
      <Avatar
        h={{ base: "300px", md: "250px", sm: "200px" }}
        w={{ base: "300px", md: "250px", sm: "200px" }}
        name={`${user.name} ${user.surname}`}
      />
      {/* Spacer */}
      <Box w="20px" h="20px" />
      <Flex
        flexDirection="column"
        justifyContent={{ base: "center", sm: "flex-start" }}
        alignItems={{ base: "center", sm: "flex-start" }}
        w={{ base: "100%", md: "auto" }}
      >
        <Text fontWeight="700" fontSize="5xl">
          {user.name} {user.surname}
        </Text>
        <HStack mb="10px">
          <RatingGroup count={5} defaultValue={user.rating} disabled />
          <Box w="5px" h="5px" borderRadius="full" bg="fg.subtle" />
          <Text fontSize="xs" color="fg.subtle" fontWeight="500">
            {12} events hosted
          </Text>
        </HStack>
        <HStack mb="10px">
          <Text fontSize="lg">Following: {45}</Text>
          <Divider h="20px" thickness="2px" orientation="vertical" />
          <Text fontSize="lg">Followers: {120}</Text>
        </HStack>
        <Grid gridTemplateColumns="repeat(5, 1fr)" w="100%">
          <GridItem colSpan={{ base: 5, sm: 4 }}>
            <Button
              w="100%"
              h={{ base: "40px", sm: "55px" }}
              bg="bg.buttonLarge"
              color="fg.buttonLarge"
            >
              <Text fontSize={{ base: "md", md: "xl" }}>
                Send friend request
              </Text>
            </Button>
          </GridItem>

          <GridItem colSpan={{ base: 5, sm: 1 }}>
            <Button
              w="100%"
              h={{ base: "40px", sm: "55px" }}
              bg="bg.buttonLarge"
              color="fg.buttonLarge"
            >
              <Text fontSize={{ base: "md", md: "xl" }}>Rate User</Text>
            </Button>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};
