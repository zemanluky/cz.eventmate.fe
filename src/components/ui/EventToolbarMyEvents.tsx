import { HStack, Spacer } from "@Panda/jsx";
import { Button } from "@ParkComponents/button";
import { useNavigate } from "react-router-dom";
import { Text } from "@ParkComponents/text";
import { CirclePlus } from "lucide-react";
import * as React from "react";

export const EventToolbarMyEvents: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <HStack mb="10px">
        <Text fontSize={{ base: "2xl", md: "3xl", xl: "4xl" }} fontWeight="500">
          My events
        </Text>
        <Spacer />
        <Button onClick={() => navigate("/create-event")}>
          <CirclePlus />
          <Text>Create event</Text>
        </Button>
      </HStack>
    </>
  );
};
