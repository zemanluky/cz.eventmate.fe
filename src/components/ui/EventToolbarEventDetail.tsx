import { HStack, Spacer } from "@Panda/jsx";
import { Button } from "@ParkComponents/button";

import { Text } from "@ParkComponents/text";
import axios from "axios";
import axiosClient from "axiosClient";
import { CirclePlus, DoorOpen } from "lucide-react";
import * as React from "react";
import { useShowToast } from "src/hooks";
import useAuthStore from "src/store/authStore";

interface EventCategory {
  _id: string;
  name: string;
  description: string;
  __v: number;
}

interface Attendee {
  _id: string;
  name: string;
  surname: string;
  username: string;
  __v: number;
}

interface Author extends Attendee {
  ratings: number[]; // Assuming ratings is an array of numbers
  average_rating: number | null;
}

interface Event {
  category: EventCategory;
  _id: string;
  name: string;
  description: string;
  date: string; // ISO 8601 string
  private: boolean;
  location: string;
  attendees: Attendee[];
  __v: number;
  author: Author;
}

interface EventToolbarEventDetailProps {
  event: Event;
}

export const EventToolbarEventDetail: React.FC<
  EventToolbarEventDetailProps
> = ({ event }) => {
  const showToast = useShowToast();

  const handleJoinEvent = async (eventId: string) => {
    try {

      const response = await axiosClient.post(
        `${import.meta.env.VITE_API_KEY}/event/${eventId}/attendance`
      );

      if(response) return;
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(
          "Error",
          `Creating event failed ${error.response?.data?.message || error.message}`,
          "error"
        );
      } else {
        showToast("Error", `Unexpected error occured : ${error}`, "error");
      }
    }
  };

  const handleLeaveEvent = async (eventId: string) => {
    try {

      const response = await axiosClient.delete(
        `${import.meta.env.VITE_API_KEY}/event/${eventId}/attendance`
      );

      if(response){
        showToast("Success", "You left an event", "success");
        return;
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(
          "Error",
          `Creating event failed ${error.response?.data?.message || error.message}`,
          "error"
        );
      } else {
        showToast("Error", `Unexpected error occured : ${error}`, "error");
      }
    }
  };

  // calling authenticated user
  const authUser = useAuthStore((state) => state.user);
  console.log(event);

  const [isAlreadyJoined, setIsAlreadyJoined] = React.useState(false);

  // checking if authenticated user is in the attendees _ids
  React.useEffect(() => {
    event?.attendees?.forEach((attendee) => {
      console.log(attendee);
      if (attendee._id === authUser?._id) {
        setIsAlreadyJoined(true);
        return;
      }
    });
  }, [event?.attendees]);

  return (
    <>
      <HStack mb="10px">
        <Text fontSize={{ base: "2xl", md: "3xl", xl: "4xl" }} fontWeight="500">
          {event?.name}
        </Text>
        <Spacer />
        <Button
          onClick={() =>
            isAlreadyJoined
              ? handleLeaveEvent(event?._id)
              : handleJoinEvent(event?._id)
          }
        >
          {isAlreadyJoined ? <DoorOpen /> : <CirclePlus />}

          <Text>{isAlreadyJoined ? "Leave Event" : "Join event"}</Text>
        </Button>
      </HStack>
    </>
  );
};
