import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Spacer,
  Stack,
} from "@Panda/jsx";
import { Card } from "@ParkComponents/card";
import { Icon } from "@ParkComponents/icon";
import { Text } from "@ParkComponents/text";
import {
  Calendar,
  Clock,
  MapPin,
  PencilLineIcon,
  Trash,
  XIcon,
} from "lucide-react";
import * as React from "react";
import { AvatarGroup } from "./AvatarGroup";
import { IconButton } from "@ParkComponents/icon-button";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@ParkComponents/dialog";
import { Button } from "@ParkComponents/button";
import { useShowToast } from "src/hooks";
import useDeleteEventById from "src/hooks/useDeleteEventById";
import { Spinner } from "@ParkComponents/spinner";
import { format } from "date-fns";

interface EventCardLongDesktopProps {
  event: Event;
}

interface Rating {
  author: string;
  starRating: number;
  comment: string;
  _id: string;
  createdAt: string; // ISO date string
}

interface User {
  _id: string;
  name: string;
  surname: string;
  username: string;
  __v: number;
  ratings?: Rating[]; // Optional because only the author has ratings
  average_rating?: number; // Optional because only the author has it
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

interface Event {
  category: Category;
  _id: string;
  name: string;
  description: string;
  date: string;
  private: boolean;
  location: string;
  attendees: Member[];
  __v: number;
  author: User;
}

export const EventCardLongDesktop: React.FC<EventCardLongDesktopProps> = ({
  event,
}) => {
  console.log(event);
  const navigate = useNavigate();
  const showToast = useShowToast();
  const { deleteEvent, loading } = useDeleteEventById();

  // deleting event
  const handleDeleteEvent = async (eventId: string) => {
    try {
      const response = await deleteEvent(eventId);
      if (response) {
        showToast("Success", "Event deleted successfully", "success");
      }
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

  return (
    <>
      <Card.Root w="100%" h="300px" bg="bg.card" color="fg.card">
        <HStack>
          <Card.Header w="300px" h="300px" bg="bg.emphasized">
            {event?.image}
          </Card.Header>
          <Card.Body p="25px" w="700px">
            <Grid gridTemplateColumns="repeat(7, 1fr)" h="100%" gap={0}>
              {/* Content */}
              <GridItem colSpan={6}>
                <Stack gap={10}>
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
                  <Spacer />
                  <HStack pr="25px">
                    <Stack gap={12}>
                      {/* Event date */}
                      <HStack>
                        <Icon>
                          <Calendar />
                        </Icon>
                        <Text>
                          {format(new Date(event.date), "eee dd.MM.yyyy")}
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
                    <Spacer />
                    {/* Event members */}
                    <Box
                      hideBelow="lg"
                      p="10px"
                      mt="auto"
                      rounded="full"
                      bg="bg.muted"
                      px={"16px"}
                    >
                      <HStack>
                        <Text>Attendees:</Text>
                        <AvatarGroup members={event?.attendees} />
                      </HStack>
                    </Box>
                  </HStack>
                </Stack>
              </GridItem>

              {/* Buttons */}
              <GridItem colSpan={1}>
                <Dialog.Root role="alertdialog">
                  <Flex
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={12}
                  >
                    <IconButton
                      w="95px"
                      h="95px"
                      key={event._id}
                      onClick={() => navigate(`/edit-event/${event._id}`)}
                      aria-label="Edit Event"
                    >
                      {/* size nefunguje */}
                      <PencilLineIcon strokeWidth={3} size={40} />
                    </IconButton>
                    <Dialog.Trigger asChild>
                      <IconButton w="95px" h="95px" aria-label="Delete Event">
                        {/* size nefunguje */}
                        <Trash strokeWidth={3} size={40} />
                      </IconButton>
                    </Dialog.Trigger>
                  </Flex>

                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content w="500px">
                      <Stack gap="8" p="6">
                        <Stack gap="1">
                          <Dialog.Title>
                            Are you sure you want to delete this event?
                          </Dialog.Title>
                          <Dialog.Description>
                            Deleting this event is permanent and cannot be
                            undone. All event details, including participants
                            and media, will be removed. Please confirm if you're
                            sure you want to proceed with this action.
                          </Dialog.Description>
                        </Stack>
                        <Stack gap="3" direction="row" width="full">
                          <Dialog.CloseTrigger asChild>
                            <Button variant="outline" width="full">
                              Cancel
                            </Button>
                          </Dialog.CloseTrigger>
                          <Button
                            onClick={() => handleDeleteEvent(event._id)}
                            width="full"
                          >
                            {loading ? (
                              <Spinner colorPalette={"white"} />
                            ) : (
                              "Delete"
                            )}
                          </Button>
                        </Stack>
                      </Stack>
                      <Dialog.CloseTrigger
                        asChild
                        position="absolute"
                        top="2"
                        right="2"
                      >
                        <IconButton
                          aria-label="Close Dialog"
                          variant="ghost"
                          size="sm"
                        >
                          <XIcon />
                        </IconButton>
                      </Dialog.CloseTrigger>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Dialog.Root>
              </GridItem>
            </Grid>
          </Card.Body>
        </HStack>
      </Card.Root>
    </>
  );
};
