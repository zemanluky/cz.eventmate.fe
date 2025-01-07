import { AxiosError } from "axios";
import axiosClient from "axiosClient";
import { useEffect, useState } from "react";

export interface FriendRequests {
  data: FriendRequest[];
}

export interface FriendRequest {
  _id: string;
  sender: User;
  receiver: string;
  createdAt: string;
  state: string;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
  bio: string | null;
  profile_picture_path: string | null;
  friends: string[];
  ratings: string[];
  __v: number;
}

export interface UseGetFriendRequestsReturn {
  friendRequests: FriendRequest[] | null; // Friend requests can be null initially
  loading: boolean; // Indicates if the data is being loaded
  error: string | null; // Error message or null if no error
}

const useGetFriendRequests = (): UseGetFriendRequestsReturn => {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[] | []>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get(`/user/friend-request`);

      //destructuring data from response
      const requestData = response.data?.data;
      setFriendRequests(requestData);
      setError(null);
      return requestData;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Unknown error"
      );
      setFriendRequests(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return { friendRequests, loading, error };
};

export default useGetFriendRequests;
