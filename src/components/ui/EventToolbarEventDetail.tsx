import { HStack, Spacer } from "@Panda/jsx";
import { Button } from "@ParkComponents/button";
import { Text } from "@ParkComponents/text";
import axios from "axios";
import axiosClient from "axiosClient";
import { CirclePlus, DoorOpen } from "lucide-react";
import * as React from "react";
import { useShowToast } from "src/hooks";
import useAuthStore from "src/store/authStore";
import { useEventStore } from "src/store/eventStore";

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

export const EventToolbarEventDetail: React.FC<EventToolbarEventDetailProps> = ({ event }) => {
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);  // Getting the authenticated user from global state
  const { updateAttendees } = useEventStore();  // Extracting the global store method for updating attendees

  const [isAlreadyJoined, setIsAlreadyJoined] = React.useState(false);

  const handleJoinEvent = async (eventId: string) => {
    try {
      const response = await axiosClient.post(
        `/event/${eventId}/attendance`
      );

      if (response) {
        const newAttendee = { ...authUser };  // Create new attendee object based on authUser
        const updatedAttendees = [...event.attendees, newAttendee];
        updateAttendees(updatedAttendees);  // Update global attendees list

        setIsAlreadyJoined(true);
        showToast("Success", "You joined the event!", "success");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast("Error", `Joining event failed: ${error.response?.data?.message || error.message}`, "error");
      } else {
        showToast("Error", `Unexpected error occurred: ${error}`, "error");
      }
    }
  };

  const handleLeaveEvent = async (eventId: string) => {
    try {
      const response = await axiosClient.delete(
        `/event/${eventId}/attendance`
      );

      if (response) {
        const updatedAttendees = event.attendees.filter(
          (attendee) => attendee._id !== authUser?._id
        );
        updateAttendees(updatedAttendees);  // Update global attendees list

        setIsAlreadyJoined(false);
        showToast("Success", "You left the event!", "success");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast("Error", `Leaving event failed: ${error.response?.data?.message || error.message}`, "error");
      } else {
        showToast("Error", `Unexpected error occurred: ${error}`, "error");
      }
    }
  };

  // Sync the initial attendees with the local state on load or user change
  React.useEffect(() => {
    setIsAlreadyJoined(event.attendees?.some((attendee) => attendee._id === authUser?._id));
  }, [event, authUser]);

  return (
    <HStack mb="10px">
      <Text fontSize={{ base: "2xl", md: "3xl", xl: "4xl" }} fontWeight="500">
        {event?.name}
      </Text>
      <Spacer />
      <Button onClick={() => (isAlreadyJoined ? handleLeaveEvent(event?._id) : handleJoinEvent(event?._id))}>
        {isAlreadyJoined ? <DoorOpen /> : <CirclePlus />}
        <Text>{isAlreadyJoined ? "Leave Event" : "Join event"}</Text>
      </Button>
    </HStack>
  );
};