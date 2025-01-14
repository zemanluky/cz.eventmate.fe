import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import axiosClient from "axiosClient";

// Define types for the event, error, and the return value of the hook
interface Event {
  _id: string;
  name: string;
  date: Date;
  description: string;
  location: string;
  private: boolean;
  // Add other event properties as needed
}

interface UseGetEventByIdReturn {
  fetchEvent: (eventId: string) => Promise<Event | null>; // Async function that returns a Promise
  event: Event | null;
  loading: boolean;
  error: string | null;
}

const useGetEventById = (eventId: string): UseGetEventByIdReturn => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = async (id: string): Promise<Event | null> => {
    try {
      setLoading(true); // Ensure loading is set to true on fetch start
      const response = await axiosClient.get<Event>(
        `/event/${id}`
      );

      // restructuring response data
      const eventData = response.data?.data

      setEvent(eventData);
      setError(null); // Clear previous errors if the fetch is successful
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Unknown error"
      );
      setEvent(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent(eventId);
  }, [eventId]); // Re-run when the eventId changes

  return { fetchEvent, event, loading, error };
};

export default useGetEventById;
