import { HStack, Spacer, Stack } from "@Panda/jsx";
import { Card } from "@ParkComponents/card";
import { Icon } from "@ParkComponents/icon";
import { Text } from "@ParkComponents/text";
import { LayoutList, MapPin } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import defaultImage from "@Components/assets/images/default.jpg";


interface EventCardMobileProps {
  event: Event;
}
interface Event {
  category: Category;
  _id: string;
  name: string;
  description: string;
  date: string;
  private: boolean;
  location: string;
  image_paths: string[];
  attendees: Member[];
  __v: number;
}

interface Category {
  _id: string;
  name: string;
  description: string;
  __v: number;
}
interface Member {
  _id: string;
  name: string;
  surname: string;
  imageUrl: string;
}

export const EventCardMobile: React.FC<EventCardMobileProps> = ({ event }) => {
  return (
    <>
      <Link to={`/event-detail/${event?._id}`}>
        <Card.Root w="350px" h="270px">
          <Card.Header w="100%" h="170px" bg="bg.emphasized" p={0}>
            <img
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
              src={`https://127.0.0.1${event?.image_paths[0]}` == 'https://127.0.0.1undefined' ? defaultImage : `https://127.0.0.1${event?.image_paths[0]}`}
              alt={event?.name}
            ></img>
          </Card.Header>
          <Card.Body p="20px" w="100%">
            <Stack>
              <HStack>
                {/* Event name */}
                <Text size="lg" fontWeight="semibold">
                  {event?.name}
                </Text>
                <Spacer />
                {/* Event date */}
                <Text size="sm">
                  {format(new Date(event?.date), "	eee dd.MM.yyyy")}
                </Text>
              </HStack>

              <HStack>
                {/* Event category */}
                <HStack>
                  <Icon>
                    <LayoutList />
                  </Icon>
                  <Text>{event?.category.name}</Text>
                </HStack>
                <Spacer />
                {/* Event location */}
                <HStack>
                  <Icon>
                    <MapPin />
                  </Icon>
                  <Text size="sm">{event?.location}</Text>
                </HStack>
              </HStack>
            </Stack>
          </Card.Body>
        </Card.Root>
      </Link>
    </>
  );
};
