import { AvatarGroup, EventToolbarEventDetail } from "@Components/ui";
import { Divider, Grid, GridItem, HStack, VStack } from "@Panda/jsx";
import { Avatar } from "@ParkComponents/avatar";
import { Carousel } from "@ParkComponents/carousel";
import { IconButton } from "@ParkComponents/icon-button";
import { RatingGroup } from "@ParkComponents/rating-group";
import { Text } from "@ParkComponents/text";
import {
  Calendar,
  ChevronLeftIcon,
  ChevronRightIcon,
  Clock,
  Lock,
  MapPin,
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

export const EventDetail: React.FC = () => {
  const params = useParams();
  const eventId = params.eventId;

  // Zustand store to manage global state
  const { event, loading, error, setEvent, setLoading, setError } =
    useEventStore();

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
    date: event?.date,
    location: event?.location,
    author: event?.author,
    attendees: event?.attendees, // The attendees will be automatically updated via global state
    images: [party1, party2, party3, party4, party5],
  };

  return (
    <>
      <EventToolbarEventDetail event={eventData} />
      <HStack mb="10px" gap={10}>
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
          <Text>Attendees:</Text>
          <AvatarGroup members={eventData?.attendees} />
        </VStack>
      </HStack>
      {/* Content */}
      <Grid
        gridTemplateColumns="repeat(2, 1fr)"
        gridTemplateRows="repeat(4, 1fr)"
      >
        {/* Date */}
        <GridItem colSpan={1} rowSpan={1}>
          <HStack>
            <Calendar />
            <Text fontWeight={700}>Date: </Text>
            <Text>{eventData?.date}</Text>
          </HStack>
        </GridItem>

        {/* Description */}
        <GridItem colSpan={1} rowSpan={4}>
          <Text>
            <Text fontWeight={700}>Description:</Text> {eventData?.description}
          </Text>
        </GridItem>

        {/* Place */}
        <GridItem colSpan={1} rowSpan={1}>
          <HStack>
            <MapPin />
            <Text fontWeight={700}>Place: </Text>
            <Text>{eventData?.location}</Text>
          </HStack>
        </GridItem>

        {/* Time */}
        <GridItem colSpan={1} rowSpan={1}>
          <HStack>
            <Clock />
            <Text fontWeight={700}>Time: </Text>
            <Text>{format(new Date(eventData?.date), "	eee dd.MM.yyyy")}</Text>
          </HStack>
        </GridItem>

        {/* Type */}
        <GridItem colSpan={1} rowSpan={1}>
          <HStack>
            <Lock />
            <Text fontWeight={700}>Type: </Text>
            <Text>{eventData?.private ? "Private" : "Public"}</Text>
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};
