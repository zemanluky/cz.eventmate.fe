import { Grid, GridItem, HStack, Stack } from "@Panda/jsx";
import { Card } from "@ParkComponents/card";
import { Icon } from "@ParkComponents/icon";
import { Text } from "@ParkComponents/text";
import { Calendar, LocateIcon } from "lucide-react";
import * as React from "react";
import { AvatarGroup } from "./AvatarGroup";

interface EventCardBigDesktopProps {
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

export const EventCardBigDesktop: React.FC<EventCardBigDesktopProps> = ({
  event,
}) => {
  return (
    <>
      <Card.Root w="350px" h="430px">
        <Card.Header w="100%" h="250px" bg="bg.emphasized">
          {event.image}
        </Card.Header>
        <Card.Body p="25px" w="100%">
          <Grid gridTemplateColumns="repeat(7, 1fr)" h="100%" gap={0}>
            <GridItem colSpan={5}>
              <Stack justifyContent="space-between" h="100%">
                <Text size="xl" fontWeight="semibold">
                  {event.name}
                </Text>
                <HStack>
                  <Icon>
                    <Calendar />
                  </Icon>
                  <Text>{event.date}</Text>
                </HStack>
                <HStack>
                  <Icon>
                    <LocateIcon />
                  </Icon>
                  <Text>{event.place}</Text>
                </HStack>
              </Stack>
            </GridItem>
            <GridItem
              colSpan={2}
              display="flex"
              alignItems="start"
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