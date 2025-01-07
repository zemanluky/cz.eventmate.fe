import { useState, useEffect } from "react";
import { AxiosError } from "axios";
import axiosClient from "axiosClient";

// define types for user document, loading, error

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

// define types of returns
interface UseGetUserByIdReturn {
    fetchUser: (eventId :string ) => Promise<User | null>
    user: User | null;
    loading : boolean;
    error: string | null;
}

const useGetUserById = (userId : string) : UseGetUserByIdReturn => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUser = async (userId : string) : Promise<User | null> => {
        try {
            setLoading(true)
            const response = await axiosClient.get<User>(
                `/user/${userId}`
            )

            // destructuring response
            const userData = response.data?.data

            setUser(userData)
            setError(null)
            return userData
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(
              axiosError.response?.data?.message ||
                axiosError.message ||
                "Unknown error"
            );
            setUser(null);
            return null;
        }finally{
            setLoading(false)
        }

    }
    useEffect(() =>{
        fetchUser(userId)
    }, [userId]) // Re-run if userId changes

    return {fetchUser, user, loading, error}
}

export default useGetUserById