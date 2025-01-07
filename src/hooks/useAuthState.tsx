import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import axiosClient from "axiosClient";

// Define types for the user, error, and the return value of the hook
interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
  bio: string;
  ratings: string[];
  // Add other user properties as needed
}

interface UseAuthStateReturn {
  fetchUserProfile: () => Promise<void>; // Async function that returns a Promise
  user: User | null;
  loading: boolean;
  error: string | null;
}

const useAuthState = (): UseAuthStateReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async (): Promise<User | null> => {
    try {
      const token = localStorage.getItem("authToken");
  
      if (!token) {
        setUser(null);
        setLoading(false);
        return null;
      }
  
      const response = await axiosClient.get<User>(
        `/user/profile`
      );
  
      setUser(response.data);
      return response.data; // Return the fetched user data
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(
        axiosError.response?.data?.message || axiosError.message || "Unknown error"
      );
      setUser(null);
      return null; // Return null if there's an error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []); // Runs once on component mount

  return { fetchUserProfile, user, loading, error };
};

export default useAuthState;
