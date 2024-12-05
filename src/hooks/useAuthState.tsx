import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import axiosClient from "axiosClient";

// Define types for the user, error, and the return value of the hook
interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  username:string;
  bio:string;
  ratings:string[];
  // Add other user properties as needed
}

interface UseAuthStateReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const useAuthState = (): UseAuthStateReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          // If no token exists, set user to null and stop loading
          setUser(null);
          setLoading(false);
          return;
        }

        // Make an authenticated request to fetch the user profile
        const response = await axiosClient.get( // Explicitly typing response as User
          `${import.meta.env.VITE_API_KEY}/user/profile`,
        );

        // If successful, update the user state
        setUser(response.data);
      } catch (err) {
        const axiosError = err as AxiosError; // Type the error as AxiosError
        setError(
          axiosError.response?.data?.message || axiosError.message || "Unknown error"
        );
        setUser(null); // Ensure user is logged out if there's an error
      } finally {
        setLoading(false); // Mark loading as complete
      }
    };

    fetchUserProfile();
  }, []); // Runs once on component mount

  return { user, loading, error };
};

export default useAuthState;
