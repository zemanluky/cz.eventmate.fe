import { Grid, GridItem, HStack, Spacer, Stack } from "@Panda/jsx";
import { Card } from "@ParkComponents/card";
import { Icon } from "@ParkComponents/icon";
import { Text } from "@ParkComponents/text";
import { MapPin, PencilLineIcon, Trash, XIcon } from "lucide-react";
import * as React from "react";
import { AvatarGroup } from "./AvatarGroup";
import { Dialog } from "@ParkComponents/dialog";
import { IconButton } from "@ParkComponents/icon-button";
import { Button } from "@ParkComponents/button";
import { useNavigate } from "react-router-dom";
import useDeleteEventById from "src/hooks/useDeleteEventById";
import { useShowToast } from "src/hooks";
import { Spinner } from "@ParkComponents/spinner";
import { format } from "date-fns";

interface EventCardMobileProps {
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
  image_paths: string[];
  attendees: Member[];
  __v: number;
  author: User;
}

export const EventCardWithButtonsMobile: React.FC<EventCardMobileProps> = ({
  event,
}) => {
  const navigate = useNavigate();

  const { deleteEvent, loading } = useDeleteEventById();
  const showToast = useShowToast();

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
      <Card.Root w="350px">
        <Card.Header w="100%" h="170px" bg="bg.emphasized" p="0px">
          <img
            src={`https://127.0.0.1${event?.image_paths[0]}`}
            alt={event.name}
          ></img>
        </Card.Header>
        <Card.Body p="20px" w="100%">
          <Grid
            gridTemplateColumns="repeat(5, 1fr)"
            gridTemplateRows="repeat(3, 1fr)"
            gap={0}
            w="100%"
          >
            <GridItem
              colSpan={3}
              rowSpan={1}
              display="flex"
              alignItems="center"
            >
              <Text size="lg" fontWeight="semibold">
                {event?.name}
              </Text>
            </GridItem>

            <GridItem
              colSpan={2}
              rowSpan={1}
              display="flex"
              alignItems="center"
              justifyContent="end"
            >
              <Text size="sm">
                {format(new Date(event?.date), "	eee dd.MM.yyyy")}
              </Text>
            </GridItem>

            <GridItem
              colSpan={3}
              rowSpan={1}
              display="flex"
              alignItems="center"
            >
              <HStack>
                <Icon>
                  <MapPin />
                </Icon>
                <Text size="sm">{event?.location}</Text>
              </HStack>
            </GridItem>

            <GridItem
              colSpan={2}
              rowSpan={1}
              display="flex"
              alignItems="center"
              justifyContent="end"
            >
              <AvatarGroup members={event?.attendees} />
            </GridItem>

            {/* Buttons */}
            <GridItem colSpan={5} rowSpan={1}>
              <Dialog.Root role="alertdialog">
                <HStack mt="10px">
                  <Button
                    key={event?._id}
                    onClick={() => navigate(`/edit-event/${event?._id}`)}
                  >
                    {/* size nefunguje */}
                    <PencilLineIcon strokeWidth={2} size={40} />
                    <Text>Edit</Text>
                  </Button>
                  <Spacer />
                  <Dialog.Trigger asChild>
                    <Button>
                      {/* size nefunguje */}
                      <Trash strokeWidth={2} size={40} />
                      <Text>Delete</Text>
                    </Button>
                  </Dialog.Trigger>
                </HStack>

                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content w="500px">
                    <Stack gap="8" p="6">
                      <Stack gap="1">
                        <Dialog.Title>
                          Are you sure you want to delete this event?
                        </Dialog.Title>
                        <Dialog.Description>
                          Deleting this event is permanent and cannot be undone.
                          All event details, including participants and media,
                          will be removed. Please confirm if you're sure you
                          want to proceed with this action.
                        </Dialog.Description>
                      </Stack>
                      <Stack gap="3" direction="row" width="full">
                        <Dialog.CloseTrigger asChild>
                          <Button variant="outline" width="full">
                            Cancel
                          </Button>
                        </Dialog.CloseTrigger>
                        <Button
                          onClick={() => handleDeleteEvent(event?._id)}
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
      </Card.Root>
    </>
  );
};
