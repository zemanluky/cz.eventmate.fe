import { Grid, GridItem, HStack } from "@Panda/jsx";
import { Card } from "@ParkComponents/card";
import { Icon } from "@ParkComponents/icon";
import { Text } from "@ParkComponents/text";
import { LocateIcon } from "lucide-react";
import * as React from "react";
import { AvatarGroup } from "./AvatarGroup";

interface EventCardMobileProps {
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

export const EventCardMobile: React.FC<EventCardMobileProps> = ({ event }) => {
  return (
    <>
      <Card.Root w="350px" h="270px">
        <Card.Header w="100%" h="170px" bg="bg.emphasized">
          {event.image}
        </Card.Header>
        <Card.Body p="20px" w="100%">
          <Grid
            gridTemplateColumns="repeat(5, 1fr)"
            gridTemplateRows="repeat(2, 1fr)"
            gap={0}
            h="100px"
            w="100%"
          >
            <GridItem
              colSpan={3}
              rowSpan={1}
              display="flex"
              alignItems="center"
            >
              <Text size="lg" fontWeight="semibold">
                {event.name}
              </Text>
            </GridItem>

            <GridItem
              colSpan={2}
              rowSpan={1}
              display="flex"
              alignItems="center"
              justifyContent="end"
            >
              <Text size="sm">{event.date}</Text>
            </GridItem>

            <GridItem
              colSpan={3}
              rowSpan={1}
              display="flex"
              alignItems="center"
            >
              <HStack>
                <Icon>
                  <LocateIcon />
                </Icon>
                <Text size="sm">{event.place}</Text>
              </HStack>
            </GridItem>

            <GridItem
              colSpan={2}
              rowSpan={1}
              display="flex"
              alignItems="center"
              justifyContent="end"
            >
              <AvatarGroup members={event.memberList} />
            </GridItem>
          </Grid>
        </Card.Body>
      </Card.Root>
    </>
  );
};
