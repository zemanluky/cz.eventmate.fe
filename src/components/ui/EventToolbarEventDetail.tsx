import { HStack, Spacer } from "@Panda/jsx";
import { Button } from "@ParkComponents/button";

import { Text } from "@ParkComponents/text";
import { CirclePlus } from "lucide-react";
import * as React from "react";

interface EventToolbarEventDetailProps {
  eventName: string;
  /*eventId: string;
  userId: string;*/
}

export const EventToolbarEventDetail: React.FC<
  EventToolbarEventDetailProps
> = ({ eventName /*eventId, userId*/ }) => {
  return (
    <>
      <HStack mb="10px">
        <Text fontSize={{ base: "2xl", md: "3xl", xl: "4xl" }} fontWeight="500">
          {eventName}
        </Text>
        <Spacer />
        <Button /*onClick={() => handleJoinEvent(eventId, userId)}*/>
          <CirclePlus />
          <Text>Join event</Text>
        </Button>
      </HStack>
    </>
  );
};
