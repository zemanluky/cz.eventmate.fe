import { Grid, GridItem, HStack, Stack } from "@Panda/jsx";
import { Card } from "@ParkComponents/card";
import { Icon } from "@ParkComponents/icon";
import { Text } from "@ParkComponents/text";
import { Calendar, MapPin } from "lucide-react";
import * as React from "react";
import { AvatarGroup } from "./AvatarGroup";
import { Link } from "react-router-dom";

interface EventCardBigDesktopProps {
  event: {
    _id: string;
    name: string;
    image: string;
    date: string;
    location: string;
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
      <Link to={`/event-detail/${event._id}`}>
        <Card.Root w="350px" h="430px" bg="bg.card" color="fg.card">
          <Card.Header w="100%" h="250px" bg="bg.emphasized">
            {/* {event.image} */}
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
                      <MapPin />
                    </Icon>
                    <Text>{event.location}</Text>
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
      </Link>
    </>
  );
};
