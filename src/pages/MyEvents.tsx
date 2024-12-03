import {
  EventCardLongDesktop,
  EventCardWithButtonsMobile,
  EventToolbarMyEvents,
} from "@Components/ui";
import { VStack } from "@Panda/jsx";
import * as React from "react";

export const MyEvents: React.FC = () => {
  const mockEvents = [
    {
      id: "event1",
      name: "Photography Workshop",
      image: "https://via.placeholder.com/350x250?text=Event+1",
      date: "2024-12-10",
      place: "New York City, NY",
      private: true,
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
    },
    {
      id: "event2",
      name: "Tech Expo 2024",
      image: "https://via.placeholder.com/350x250?text=Event+2",
      date: "2024-12-15",
      place: "San Francisco, CA",
      private: false,
      memberList: [
        {
          member: {
            id: "3",
            name: "Alice",
            surname: "Johnson",
            imageUrl: "https://via.placeholder.com/50?text=AJ",
          },
        },
        {
          member: {
            id: "4",
            name: "Bob",
            surname: "Brown",
            imageUrl: "https://via.placeholder.com/50?text=BB",
          },
        },
        {
          member: {
            id: "5",
            name: "Charlie",
            surname: "Wilson",
            imageUrl: "https://via.placeholder.com/50?text=CW",
          },
        },
      ],
    },
    {
      id: "event3",
      name: "Art & Design Conference",
      image: "https://via.placeholder.com/350x250?text=Event+3",
      date: "2024-12-20",
      place: "Austin, TX",
      private: true,
      memberList: [
        {
          member: {
            id: "6",
            name: "Emily",
            surname: "Clark",
            imageUrl: "https://via.placeholder.com/50?text=EC",
          },
        },
      ],
    },
    {
      id: "event4",
      name: "Music Festival",
      image: "https://via.placeholder.com/350x250?text=Event+4",
      date: "2024-12-30",
      place: "Los Angeles, CA",
      private: false,
      memberList: [
        {
          member: {
            id: "7",
            name: "David",
            surname: "Evans",
            imageUrl: "https://via.placeholder.com/50?text=DE",
          },
        },
        {
          member: {
            id: "8",
            name: "Sophia",
            surname: "Green",
            imageUrl: "https://via.placeholder.com/50?text=SG",
          },
        },
        {
          member: {
            id: "9",
            name: "Liam",
            surname: "Hall",
            imageUrl: "https://via.placeholder.com/50?text=LH",
          },
        },
      ],
    },
    {
      id: "event5",
      name: "Startup Pitch Night",
      image: "https://via.placeholder.com/350x250?text=Event+5",
      date: "2025-01-05",
      place: "Seattle, WA",
      private: true,
      memberList: [
        {
          member: {
            id: "10",
            name: "Olivia",
            surname: "Harris",
            imageUrl: "https://via.placeholder.com/50?text=OH",
          },
        },
        {
          member: {
            id: "11",
            name: "Ethan",
            surname: "Martinez",
            imageUrl: "https://via.placeholder.com/50?text=EM",
          },
        },
      ],
    },
  ];

  return (
    <>
      <EventToolbarMyEvents />

      <VStack hideBelow="md" gap={5}>
        {mockEvents.map((event) => (
          <EventCardLongDesktop key={event.id} event={event} />
        ))}
      </VStack>
      <VStack hideFrom="md">
        {mockEvents.map((event) => (
          <EventCardWithButtonsMobile key={event.id} event={event} />
        ))}
      </VStack>
    </>
  );
};
