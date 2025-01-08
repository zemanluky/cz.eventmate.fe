import { Divider, HStack, Stack } from "@Panda/jsx";
import { Card } from "@ParkComponents/card";
import { Icon } from "@ParkComponents/icon";
import { Text } from "@ParkComponents/text";
import { Calendar, LayoutList, MapPin } from "lucide-react";
import * as React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface EventCardCalendarDesktopProps {
  event: {
    _id: string;
    category: Category;
    name: string;
    image: string;
    date: string;
    location: string;
    private: boolean;
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
interface Category {
  _id: string;
  name: string;
  description: string;
  __v: number;
}

export const EventCardCalendarDesktop: React.FC<
  EventCardCalendarDesktopProps
> = ({ event }) => {
  return (
    <>
      <Link to={`/event-detail/${event?._id}`}>
        <Card.Root w="100%" h="200px" bg="bg.card" color="fg.card">
          <HStack>
            <Card.Header w="200px" h="200px" bg="bg.emphasized" p="0px">
              <img
                style={{
                  objectFit: "cover",
                }}
                src={`https://127.0.0.1${event?.image_paths[0]}`}
                alt={event?.name}
              ></img>
            </Card.Header>
            <Card.Body p="25px" w="350px">
              {/* Content */}

              <Stack gap={8}>
                {/* Tittle + type */}
                <HStack>
                  <Text size="xl" fontWeight="semibold">
                    {event.name}
                  </Text>
                  <Divider
                    orientation="vertical"
                    thickness="2px"
                    h="15px"
                    hideBelow="lg"
                  />
                  <Text hideBelow="lg">
                    {event.private ? "Private" : "Public"}
                  </Text>
                </HStack>
                <HStack>
                  <Stack gap={1}>
                    {/* Event date */}
                    <HStack>
                      <Icon>
                        <Calendar />
                      </Icon>
                      <Text>
                        {format(new Date(event.date), "	eee dd.MM.yyyy")}
                      </Text>
                    </HStack>
                    {/* Event category */}
                    <HStack>
                      <Icon>
                        <LayoutList />
                      </Icon>
                      <Text>{event?.category.name}</Text>
                    </HStack>
                    <HStack></HStack>
                    {/* Event place */}
                    <HStack>
                      <Icon>
                        <MapPin />
                      </Icon>
                      <Text>{event.location}</Text>
                    </HStack>
                  </Stack>
                </HStack>
              </Stack>
            </Card.Body>
          </HStack>
        </Card.Root>
      </Link>
    </>
  );
};
