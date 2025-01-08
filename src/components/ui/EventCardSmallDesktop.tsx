import { Grid, GridItem, HStack, Stack } from "@Panda/jsx";
import { Card } from "@ParkComponents/card";
import { Icon } from "@ParkComponents/icon";
import { Text } from "@ParkComponents/text";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";
import defaultImage from "@Components/assets/images/default.jpg";


interface EventCardSmallDesktopProps {
  event: {
    _id: string;
    name: string;
    image: string;
    date: string;
    location: string;
    image_paths: string[];
    memberList: {
      member: Member;
    }[];
  };
}
interface Member {
  _id: string;
  name: string;
  surname: string;
  imageUrl: string;
}

export const EventCardSmallDesktop: React.FC<EventCardSmallDesktopProps> = ({
  event,
}) => {
  return (
    <>
      <Link to={`/eventDetail/${event?._id}`}>
        <Card.Root w="350px" h="120px">
          <Card.Body p={0} w="100%" h="100%">
            <Grid
              gridTemplateColumns="repeat(8, 1fr)"
              gap={0}
              w="100%"
              h="100%"
            >
              <GridItem colSpan={3} bg="bg.emphasized">
                <img
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  src={`https://127.0.0.1${event?.image_paths[0]}` == 'https://127.0.0.1undefined' ? defaultImage : `https://127.0.0.1${event?.image_paths[0]}`}
                  alt={event?.name}
                ></img>
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
                    {event?.name}
                  </Text>
                  <HStack>
                    <Icon>
                      <Calendar />
                    </Icon>
                    <Text size="sm">
                      {format(new Date(event?.date), "	eee dd.MM.yyyy")}
                    </Text>
                  </HStack>
                  <HStack>
                    <Icon>
                      <MapPin />
                    </Icon>
                    <Text size="sm"> {event?.location}</Text>
                  </HStack>
                </Stack>
              </GridItem>
            </Grid>
          </Card.Body>
        </Card.Root>
      </Link>
    </>
  );
};
