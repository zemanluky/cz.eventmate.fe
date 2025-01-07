import { Grid, GridItem, HStack, Stack } from "@Panda/jsx";
import { Card } from "@ParkComponents/card";
import { Icon } from "@ParkComponents/icon";
import { Text } from "@ParkComponents/text";
import {
  Calendar,
  ChartColumn,
  ChartColumnStacked,
  LayoutList,
  MapPin,
} from "lucide-react";
import * as React from "react";
import { AvatarGroup } from "./AvatarGroup";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface EventCardBigDesktopProps {
  event: {
    _id: string;
    name: string;
    image: string;
    date: string;
    location: string;
    category: Object;
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
      <Link to={`/event-detail/${event?._id}`}>
        <Card.Root w="350px" h="430px" bg="bg.card" color="fg.card">
          <Card.Header w="100%" h="250px" bg="bg.emphasized">
            {/* {event.image} */}
          </Card.Header>
          <Card.Body p="25px" w="100%">
            <Grid gridTemplateColumns="repeat(7, 1fr)" h="100%" gap={0}>
              <GridItem colSpan={5}>
                <Stack justifyContent="space-between" h="100%">
                  <Text size="xl" fontWeight="semibold">
                    {event?.name}
                  </Text>
                  <HStack>
                    <Icon>
                      <Calendar />
                    </Icon>
                    <Text>
                      {format(new Date(event?.date), "	eee dd.MM.yyyy")}
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon>
                      <LayoutList />
                    </Icon>
                    <Text>{event?.category.name}</Text>
                  </HStack>
                  <HStack>
                    <Icon>
                      <MapPin />
                    </Icon>
                    <Text>{event?.location}</Text>
                  </HStack>
                </Stack>
              </GridItem>
              <GridItem
                colSpan={2}
                display="flex"
                alignItems="start"
                justifyContent="end"
              >
                <AvatarGroup members={event?.attendees} />
              </GridItem>
            </Grid>
          </Card.Body>
        </Card.Root>
      </Link>
    </>
  );
};
