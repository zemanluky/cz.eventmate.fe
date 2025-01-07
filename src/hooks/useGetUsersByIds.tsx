import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import axiosClient from "axiosClient";

interface User {
  _id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
  bio: string;
  friends: string[];
  ratings: string[];
}

interface UseGetUsersByIdsReturn {
  fetchUsers: (userIds: string[]) => Promise<User[]>;
  users: User[];
  loading: boolean;
  error: string | null;
}

const useGetUsersByIds = (): UseGetUsersByIdsReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async (userIds: string[]): Promise<User[]> => {
    try {
      setLoading(true);
      const fetchedUsers: User[] = [];
      for (const userId of userIds) {
        const response = await axiosClient.get<User>(
          `${import.meta.env.VITE_BASE_API_URL}/user/${userId}`
        );
        fetchedUsers.push(response.data?.data);
      }
      setUsers(fetchedUsers);
      setError(null);
      return fetchedUsers;
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Unknown error"
      );
      setUsers([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { fetchUsers, users, loading, error };
};

export default useGetUsersByIds;