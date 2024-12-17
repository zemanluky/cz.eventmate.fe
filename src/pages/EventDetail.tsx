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
//import { useParams } from "react-router-dom";

/*interface EventDetailProps {
  event: {
    id: string;
    creator: Creator;
    name: string;
    images: string[];
    date: string;
    place: string;
    private: boolean;
    description: string;
    memberList: {
      member: Member;
    }[];
  };
}
interface Creator {
  id: string;
  name: string;
  surname: string;
  imageUrl: string;
  rating: number;
}
interface Member {
  id: string;
  name: string;
  surname: string;
  imageUrl: string;
}*/

//mockImages
import party1 from "@Components/assets/images/party_1.jpg";
import party2 from "@Components/assets/images/party_2.jpg";
import party3 from "@Components/assets/images/party_3.jpg";
import party4 from "@Components/assets/images/party_4.jpg";
import party5 from "@Components/assets/images/party_5.jpg";
import useGetEventById from "src/hooks/useGetEventById";
import { Link, useParams } from "react-router-dom";

export const EventDetail: React.FC /*<EventDetailProps>*/ = () => {
  const params = useParams();
  const eventId = params.eventId;
  const { event, loading, error } = useGetEventById(eventId);

console.log(event)

  const eventData = {
    name: event?.name,
    description: event?.description,
    date: event?.date,
    location: event?.location,
    // mock creator
    author: event?.author,
    // mock members
    memberList: [
      {
        member: {
          id: "1",
          name: "John",
          surname: "Doe",
          imageUrl: "https://via.placeholder.com/50?text=JD",
        },
      },
      {
        member: {
          id: "2",
          name: "Jane",
          surname: "Smith",
          imageUrl: "https://via.placeholder.com/50?text=JS",
        },
      },
    ],
    // mock images
    images: [party1, party2, party3, party4, party5],
  };

  console.log(eventData)

  return (
    <>
      <EventToolbarEventDetail
        eventName={eventData.name} /*userId={loggedInUser.id}*/
      />
      <HStack mb="10px" gap={10}>
        {/* Carousel */}
        <Carousel.Root>
          <Carousel.Viewport>
            <Carousel.ItemGroup>
              {eventData.images.map((image, index) => (
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
                {eventData.images.map((_, index) => (
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
          <Link to={`/profile/${eventData.author?._id}`}>
            <Avatar
              h="200px"
              w="200px"
              name={`${eventData.author?.name} ${eventData.author?.surname}`}
            />
          </Link>
          <RatingGroup count={5} defaultValue={eventData.author?.rating} disabled />

          <Text>
            {eventData.author?.name} {eventData.author?.surname}
          </Text>
          <Divider orientation="horizontal" thickness="2px" width="100%" />
          <Text>Attendees:</Text>
          <AvatarGroup members={eventData.memberList} />
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
            <Text>{eventData?.date}</Text>
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
