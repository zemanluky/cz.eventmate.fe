import * as React from "react";
import { useEffect } from "react";
import axios from "axios";
import axiosClient from "../../axiosClient";
import { useShowToast } from "src/hooks";
import { EventCardBigDesktop, Profile, RatingCard } from "@Components/ui";
import { Box, Divider, Flex, VStack } from "@Panda/jsx";
import { Text } from "@ParkComponents/text";
import { Button } from "@ParkComponents/button";
import { useParams } from "react-router-dom";
import useGetUserById from "src/hooks/useGetUserById";
import { Spinner } from "@ParkComponents/spinner";

export const ProfilePage: React.FC = () => {
  const params = useParams();
  const userId = params.userId as string;
  const [events, setEvents] = React.useState<any[]>([]); // Rendered events
  const [isLoading, setIsLoading] = React.useState(false); // Loading state
  const [hasMore, setHasMore] = React.useState(true); // Flag for more data
  const [pageNumber, setPageNumber] = React.useState(1); // Current page number
  const pageSize = 10; // Number of events per page

  const lastEventRef = React.useRef<HTMLDivElement | null>(null); // Reference to last element
  const observer = React.useRef<IntersectionObserver | null>(null); // Intersection Observer reference

  const { fetchUser, user, loading, error } = useGetUserById(userId);

  const [showEvents, setShowEvents] = React.useState(true);
  const showToast = useShowToast();
  const [ratings, setRatings] = React.useState<any[]>([]); // State to store ratings
  const [isFetchingRatings, setIsFetchingRatings] = React.useState(false); // State to track loading

  // Function to fetch ratings
  const fetchRatings = React.useCallback(async (userId: string) => {
    if (!userId) return;
    setIsFetchingRatings(true); // Start loading state
    try {
      const response = await axiosClient.get(
        `${import.meta.env.VITE_BASE_API_URL}/user/${userId}/rating`
      );
      setRatings(response.data?.data || []); // Save fetched ratings
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(
          "Error",
          error.response?.data?.message || error.message,
          "error"
        );
      } else {
        showToast("Unexpected Error", "Please try again later", "error");
      }
    } finally {
      setIsFetchingRatings(false); // Stop loading state
    }
  }, []);

  React.useEffect(() => {
    if (!showEvents && user?.ratings?.length > 0) {
      // Fetch ratings only if toggled to "Ratings" tab and ratings exist
      fetchRatings(user?._id);
    }
  }, [showEvents, user, fetchRatings]);

  // Fetch events from the backend
  const fetchEvents = React.useCallback(async () => {
    if (isLoading || !hasMore) return; // Don't fetch if already loading or no more events
    setIsLoading(true); // Set loading state

    try {
      const response = await axiosClient.get(`/event/`, {
        params: {
          userId: userId, // Adjust based on your logic
          pageSize,
          pageNumber,
        },
      });

      const fetchedEvents = response.data?.data;

      // Avoid duplicates by filtering out events already in the state
      setEvents((prev) => {
        const newEvents = fetchedEvents?.filter(
          (event: any) =>
            !prev.some((existingEvent: any) => existingEvent._id === event._id)
        );
        return [...prev, ...newEvents];
      });

      if (fetchedEvents.length < pageSize) {
        setHasMore(false); // No more events to fetch
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setHasMore(false); // Stop fetching on error
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }, [isLoading, hasMore, pageNumber]);

  // Load the next page of events
  const loadMoreEvents = React.useCallback(() => {
    if (!isLoading && hasMore) {
      setPageNumber((prev) => prev + 1); // Increment the page number
    }
  }, [isLoading, hasMore]);

  // Observer to detect scrolling to the last element
  React.useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "200px", // Trigger 200px before the element comes into view
      threshold: 1.0, // Full visibility
    };

    observer.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) loadMoreEvents(); // Fetch more events when intersecting
    }, options);

    if (lastEventRef.current) {
      observer.current.observe(lastEventRef.current);
    }

    return () => {
      if (observer.current && lastEventRef.current) {
        observer.current.unobserve(lastEventRef.current);
      }
    };
  }, [loadMoreEvents]);

  // Fetch events whenever the page number changes
  React.useEffect(() => {
    fetchEvents();
  }, [pageNumber]);

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  return (
    <>
      {loading ? (
        <Box display="grid" placeItems="center" height={`calc(100vh - 150px)`}>
          <Spinner />
        </Box>
      ) : (
        <>
          <Box>
            <Profile user={user} />
            <Divider
              orientation="horizontal"
              thickness="2px"
              mt="10px"
              mb="10px"
            />
            {/* Switch */}
            <Box w="150px" p="5px" h="36px" rounded="full" bg="bg.muted">
              <Flex justifyItems="center">
                <Button
                  w="70px"
                  h="26px"
                  rounded="full"
                  bg={showEvents ? "bg.buttonSmall" : "transparent"}
                  onClick={() => setShowEvents(true)}
                >
                  <Text>Events</Text>
                </Button>
                <Button
                  w="70px"
                  h="26px"
                  rounded="full"
                  bg={showEvents ? "transparent" : "bg.buttonSmall"}
                  onClick={() => setShowEvents(false)}
                >
                  <Text>Ratings</Text>
                </Button>
              </Flex>
            </Box>
            {/* Content (Events or Ratings) */}
            <Box>
              {showEvents ? (
                <Flex
                  gap="16px"
                  mt={"20px"}
                  flexWrap={"wrap"}
                  justifyContent="center"
                >
                  {events.map((event) => (
                    <EventCardBigDesktop key={event._id} event={event} />
                  ))}
                </Flex>
              ) : (
                <>
                  {isFetchingRatings ? ( // Show spinner when loading ratings
                    <Box display="grid" placeItems="center" mt="20px">
                      <Spinner />
                    </Box>
                  ) : ratings.length > 0 ? ( // Render ratings if available
                    <VStack mt="20px" gap="16px">
                      {ratings.map((rating, index) => (
                        <RatingCard key={index} rating={rating} />
                      ))}
                    </VStack>
                  ) : (
                    // No ratings available
                    <VStack>
                      <Text
                        fontWeight={600}
                        fontSize={"32px"}
                        color="fg.subtle"
                      >
                        This user has no ratings yet
                      </Text>
                    </VStack>
                  )}
                </>
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
