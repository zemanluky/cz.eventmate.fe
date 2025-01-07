import { AvatarGroup, EventToolbarEventDetail } from "@Components/ui";
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Stack,
  VStack,
} from "@Panda/jsx";
import { Avatar } from "@ParkComponents/avatar";
import { Carousel } from "@ParkComponents/carousel";
import { IconButton } from "@ParkComponents/icon-button";
import { RatingGroup } from "@ParkComponents/rating-group";
import { Text } from "@ParkComponents/text";
import {
  Calendar,
  ChevronLeftIcon,
  ChevronRightIcon,
  LayoutList,
  Lock,
  MapPin,
  XIcon,
} from "lucide-react";
import * as React from "react";
import { Link, useParams } from "react-router-dom";

// Mock images
import party1 from "@Components/assets/images/party_1.jpg";
import party2 from "@Components/assets/images/party_2.jpg";
import party3 from "@Components/assets/images/party_3.jpg";
import party4 from "@Components/assets/images/party_4.jpg";
import party5 from "@Components/assets/images/party_5.jpg";
import useGetEventById from "src/hooks/useGetEventById";
import { useEventStore } from "src/store/eventStore";
import { format } from "date-fns";
import { Dialog } from "@ParkComponents/dialog";
import { Button } from "@ParkComponents/button";

export const EventDetail: React.FC = () => {
  const params = useParams();
  const eventId = params.eventId;

  // Zustand store to manage global state
  const { event, setEvent, setLoading, setError } = useEventStore();

  // Use the custom hook directly inside the component
  const {
    event: fetchedEvent,
    loading: fetchLoading,
    error: fetchError,
  } = useGetEventById(eventId);

  React.useEffect(() => {
    if (fetchedEvent) {
      setEvent(fetchedEvent);
      setError(null);
    }
    if (fetchError) {
      setError(fetchError);
    }
    setLoading(fetchLoading);
  }, [fetchedEvent, fetchError, fetchLoading, setEvent, setLoading, setError]);

  const eventData = {
    _id: event?._id,
    name: event?.name,
    description: event?.description,
    category: event?.category.name,
    date: event?.date,
    location: event?.location,
    author: event?.author,
    attendees: event?.attendees, // The attendees will be automatically updated via global state
    images: [party1, party2, party3, party4, party5],
  };

  const handleOpenAttendeesDialog = () => {};

  return (
    <>
      <EventToolbarEventDetail event={eventData} />
      <Grid
        gridTemplateColumns="repeat(4, 1fr)"
        gridTemplateRows="repeat(4, 1fr)"
      >
        <GridItem colSpan={{ base: 4, lg: 3 }} rowSpan={{ base: 2, lg: 2 }}>
          {/* Carousel */}
          <Carousel.Root>
            <Carousel.Viewport>
              <Carousel.ItemGroup>
                {eventData?.images.map((image, index) => (
                  <Carousel.Item key={index} index={index}>
                    <img
                      src={image}
                      alt={`Slide ${index}`}
                      style={{
                        height: "400px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel.ItemGroup>
              <Carousel.Control>
                <Carousel.PrevTrigger asChild>
                  <IconButton
                    size="sm"
                    variant="link"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                </Carousel.PrevTrigger>
                <Carousel.IndicatorGroup>
                  {eventData?.images.map((_, index) => (
                    <Carousel.Indicator
                      key={index}
                      index={index}
                      aria-label={`Goto slide ${index + 1}`}
                    />
                  ))}
                </Carousel.IndicatorGroup>
                <Carousel.NextTrigger asChild>
                  <IconButton size="sm" variant="link" aria-label="Next Slide">
                    <ChevronRightIcon />
                  </IconButton>
                </Carousel.NextTrigger>
              </Carousel.Control>
            </Carousel.Viewport>
          </Carousel.Root>
        </GridItem>

        <GridItem
          colSpan={{ base: 4, md: 2, lg: 1 }}
          rowSpan={{ base: 2, lg: 2 }}
        >
          {/* Author */}
          <VStack>
            <Link to={`/profile/${eventData?.author?._id}`}>
              <Avatar
                h="200px"
                w="200px"
                name={`${eventData?.author?.name} ${eventData?.author?.surname}`}
              />
            </Link>
            <RatingGroup
              count={5}
              defaultValue={eventData?.author?.rating}
              disabled
            />
            <Text>
              {eventData?.author?.name} {eventData?.author?.surname}
            </Text>
            <Divider orientation="horizontal" thickness="2px" width="100%" />
            {/* dialog for attendees */}
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Box cursor={"pointer"}>
                  <Text>Attendees:</Text>
                  <AvatarGroup members={eventData?.attendees} />
                </Box>
              </Dialog.Trigger>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Stack gap="8" p="6">
                    <Stack gap="1">
                      <Dialog.Title>Attendees List</Dialog.Title>
                      <VStack gap="16px" mt="16px">
                        {/* Displaying attendees List */}
                        {eventData?.attendees?.map((attendee) => (
                          <Flex
                            key={attendee._id}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            gap="8px"
                            width="100%"
                          >
                            <Link to={`/profile/${attendee._id}`}>
                              <Flex alignItems={"center"} gap={4}>
                                <Avatar
                                  name={`${attendee.name} ${attendee.surname}`}
                                  size="sm"
                                />
                                <Text>{`${attendee.name} ${attendee.surname}`}</Text>
                              </Flex>
                            </Link>
                          </Flex>
                        ))}
                      </VStack>
                    </Stack>
                    <Stack gap="3" direction="row" width="full">
                      <Dialog.CloseTrigger asChild>
                        <Button variant="outline" width="full">
                          Close
                        </Button>
                      </Dialog.CloseTrigger>
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
          </VStack>
        </GridItem>

        <GridItem
          colSpan={{ base: 4, md: 2, lg: 4 }}
          rowSpan={{ base: 2, lg: 2 }}
        >
          {/* Content */}
          <Stack
            direction={{ base: "column", lg: "row" }}
            gap={{ base: "5", lg: "0" }}
            mt="25px"
          >
            <Stack w={{ base: "100%", lg: "50%" }}>
              {/* Date */}
              <HStack>
                <Calendar />
                <Text fontWeight={700}>Date: </Text>
                <Text>{eventData?.date?.split("T")[0]}</Text>
              </HStack>

              {/* Place */}
              <HStack>
                <MapPin />
                <Text fontWeight={700}>Place: </Text>
                <Text>{eventData?.location}</Text>
              </HStack>

              {/* Category */}
              <HStack>
                <LayoutList />
                <Text fontWeight={700}>Category: </Text>
                <Text>{eventData?.category}</Text>
              </HStack>

              {/* Type */}
              <HStack>
                <Lock />
                <Text fontWeight={700}>Type: </Text>
                <Text>{eventData?.private ? "Private" : "Public"}</Text>
              </HStack>
            </Stack>

            <Stack w={{ base: "100%", lg: "50%" }}>
              {/* Description */}
              <Text>
                <Text fontWeight={700}>Description:</Text>{" "}
                {eventData?.description}
              </Text>
            </Stack>
          </Stack>
        </GridItem>
      </Grid>
    </>
  );
};
