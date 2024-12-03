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

export const EventDetail: React.FC /*<EventDetailProps>*/ = () => {
  //const params = useParams();
  //const eventId = params.eventId as string;
  //event = handleGetEvent(eventId);

  //mock event:
  const event = {
    id: "event1",
    creator: {
      id: "36",
      name: "Jon",
      surname: "Jones",
      imageUrl: "https://via.placeholder.com/50?text=JD",
      rating: 3,
    },
    name: "Photography Workshop",
    images: [party1, party2, party3, party4, party5],
    date: "2024-12-10",
    place: "New York City, NY",
    private: false,
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis",
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
  };

  return (
    <>
      <EventToolbarEventDetail
        eventName={event.name} /*userId={loggedInUser.id}*/
      />
      <HStack mb="10px" gap={10}>
        {/* Carousel */}
        <Carousel.Root>
          <Carousel.Viewport>
            <Carousel.ItemGroup>
              {event.images.map((image, index) => (
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
                {event.images.map((_, index) => (
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

        {/* Creator */}
        <VStack>
          <Avatar
            h="200px"
            w="200px"
            name={`${event.creator.name} ${event.creator.surname}`}
          />
          <RatingGroup count={5} defaultValue={event.creator.rating} disabled />

          <Text>
            {event.creator.name} {event.creator.surname}
          </Text>
          <Divider orientation="horizontal" thickness="2px" width="100%" />
          <Text>Attendees:</Text>
          <AvatarGroup members={event.memberList} />
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
            <Text>{event.date}</Text>
          </HStack>
        </GridItem>

        {/* Description */}
        <GridItem colSpan={1} rowSpan={4}>
          <Text>
            <Text fontWeight={700}>Description:</Text> {event.description}
          </Text>
        </GridItem>

        {/* Place */}
        <GridItem colSpan={1} rowSpan={1}>
          <HStack>
            <MapPin />
            <Text fontWeight={700}>Place: </Text>
            <Text>{event.place}</Text>
          </HStack>
        </GridItem>

        {/* Time */}
        <GridItem colSpan={1} rowSpan={1}>
          <HStack>
            <Clock />
            <Text fontWeight={700}>Time: </Text>
            <Text>{event.date}</Text>
          </HStack>
        </GridItem>

        {/* Type */}
        <GridItem colSpan={1} rowSpan={1}>
          <HStack>
            <Lock />
            <Text fontWeight={700}>Type: </Text>
            <Text>{event.private ? "Private" : "Public"}</Text>
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};
