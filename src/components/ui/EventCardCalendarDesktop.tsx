import { Divider, HStack, Stack } from "@Panda/jsx";
import { Card } from "@ParkComponents/card";
import { Icon } from "@ParkComponents/icon";
import { Text } from "@ParkComponents/text";
import { Calendar, MapPin } from "lucide-react";
import * as React from "react";
import { format } from "date-fns";

interface EventCardCalendarDesktopProps {
  event: {
    _id: string;
    name: string;
    image: string;
    date: string;
    location: string;
    private: boolean;
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

export const EventCardCalendarDesktop: React.FC<
  EventCardCalendarDesktopProps
> = ({ event }) => {
  return (
    <>
      <Card.Root w="100%" h="200px" bg="bg.card" color="fg.card">
        <HStack>
          <Card.Header w="200px" h="200px" bg="bg.emphasized">
            <img src={event.image} />
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
                <Stack gap={8}>
                  {/* Event date */}
                  <HStack>
                    <Icon>
                      <Calendar />
                    </Icon>
                    <Text>
                      {format(new Date(event.date), "	eee dd.MM.yyyy")}
                    </Text>
                  </HStack>
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
    </>
  );
};
