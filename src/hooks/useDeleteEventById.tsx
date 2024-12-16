import axiosClient from "axiosClient";
import { useState, useCallback } from "react";
import { useShowToast } from "./useShowToast";
import { AxiosError } from "axios";

interface UseDeleteEventByIdReturn {
  deleteEvent: (eventId: string) => Promise<null | undefined>;
  loading: boolean;
  error: string | null;
}

const useDeleteEventById = (): UseDeleteEventByIdReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const showToast = useShowToast();

  const deleteEvent = useCallback(async (eventId: string) => {
    try {
      setLoading(true);
      const response = await axiosClient.delete(
        `${import.meta.env.VITE_API_KEY}/event/${eventId}`
      );

      if (response?.status === 200) {
        showToast("Success", "Event deleted successfully", "success");
      }
      setError(null);
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Unknown error"
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, [showToast]); // `showToast` is a dependency

  return { deleteEvent, loading, error };
};

export default useDeleteEventById;