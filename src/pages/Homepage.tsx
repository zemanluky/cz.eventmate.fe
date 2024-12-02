import * as React from "react";
import { EventToolbar } from "@Components/ui/EventToolbar";
import { EventCardBigDesktop } from "@Components/ui";
import { Flex } from "@Panda/jsx";

export const Homepage: React.FC = () => {
  const mockEvents = [
    {
      id: "event1",
      name: "Photography Workshop",
      image: "https://via.placeholder.com/350x250?text=Event+1",
      date: "2024-12-10",
      place: "New York City, NY",
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
      <EventToolbar />
      <Flex gap="16px" mt={"20px"} flexWrap={"wrap"} justifyContent="center">
        {mockEvents.map((event) => (
          <EventCardBigDesktop key={event.id} event={event} />
        ))}
      </Flex>
    </>
  );
};
