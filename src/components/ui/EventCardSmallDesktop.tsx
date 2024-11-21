import { Grid, GridItem, HStack, Stack } from "@Panda/jsx";
import { Card } from "@ParkComponents/card";
import { Icon } from "@ParkComponents/icon";
import { Text } from "@ParkComponents/text";
import { Calendar,MapPin } from "lucide-react";
import * as React from "react";

interface EventCardSmallDesktopProps {
  event: {
    id: string;
    name: string;
    image: string;
    date: string;
    place: string;
    memberList: {
      member: Member;
    }[];
  };
}
interface Member {
  id: string;
  name: string;
  surname: string;
  imageUrl: string;
}

export const EventCardSmallDesktop: React.FC<EventCardSmallDesktopProps> = ({
  event,
}) => {
  return (
    <>
      <Card.Root w="350px" h="100px">
        <Card.Body p={0} w="100%" h="100%">
          <Grid gridTemplateColumns="repeat(7, 1fr)" gap={0} w="100%" h="100%">
            <GridItem colSpan={2} bg="bg.emphasized">
              <img src={event.image} alt={event.name} />
            </GridItem>
            <GridItem
              colSpan={5}
              p="10px"
              pl="20px"
              display="flex"
              alignItems="center"
            >
              <Stack
                display="flex"
                justifyContent="space-between"
                h="100%"
                gap={0}
              >
                <Text size="md" fontWeight="semibold">
                  {event.name}
                </Text>
                <HStack>
                  <Icon>
                    <Calendar />
                  </Icon>
                  <Text size="sm">{event.date}</Text>
                </HStack>
                <HStack>
                  <Icon>
                    <MapPin />
                  </Icon>
                  <Text size="sm"> {event.place}</Text>
                </HStack>
              </Stack>
            </GridItem>
          </Grid>
        </Card.Body>
      </Card.Root>
    </>
  );
};
