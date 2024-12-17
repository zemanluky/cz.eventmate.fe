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

  console.log(user);

  const mockEvents = [
    {
      _id: "event-1",
      name: "Tech Innovators Meetup",
      image: "https://via.placeholder.com/300x200?text=Tech+Meetup",
      date: "2024-12-15",
      location: "San Francisco, CA",
      memberList: [
        {
          member: {
            id: "member-1",
            name: "Alice",
            surname: "Smith",
            imageUrl: "https://via.placeholder.com/100?text=Alice",
          },
        },
        {
          member: {
            id: "member-2",
            name: "Bob",
            surname: "Johnson",
            imageUrl: "https://via.placeholder.com/100?text=Bob",
          },
        },
      ],
    },
    {
      _id: "event-2",
      name: "Art & Design Expo",
      image: "https://via.placeholder.com/300x200?text=Art+Expo",
      date: "2024-12-20",
      location: "New York, NY",
      memberList: [
        {
          member: {
            id: "member-3",
            name: "Catherine",
            surname: "Davis",
            imageUrl: "https://via.placeholder.com/100?text=Catherine",
          },
        },
        {
          member: {
            id: "member-4",
            name: "Daniel",
            surname: "Brown",
            imageUrl: "https://via.placeholder.com/100?text=Daniel",
          },
        },
      ],
    },
    {
      _id: "event-3",
      name: "Startup Pitch Night",
      image: "https://via.placeholder.com/300x200?text=Startup+Pitch",
      date: "2025-01-10",
      location: "Austin, TX",
      memberList: [
        {
          member: {
            id: "member-5",
            name: "Emma",
            surname: "Clark",
            imageUrl: "https://via.placeholder.com/100?text=Emma",
          },
        },
        {
          member: {
            id: "member-6",
            name: "Frank",
            surname: "Wilson",
            imageUrl: "https://via.placeholder.com/100?text=Frank",
          },
        },
        {
          member: {
            id: "member-7",
            name: "Grace",
            surname: "Martinez",
            imageUrl: "https://via.placeholder.com/100?text=Grace",
          },
        },
      ],
    },
  ];

  const mockRatings = [
    {
      user: {
        id: "user-1",
        name: "Alice",
        surname: "Johnson",
      },
      ratingNumber: 5,
      comment: "Amazing event! Learned so much and met incredible people.",
    },
    {
      user: {
        id: "user-2",
        name: "Bob",
        surname: "Smith",
      },
      ratingNumber: 4,
      comment: "Great experience overall, but the venue was a bit crowded.",
    },
    {
      user: {
        id: "user-3",
        name: "Catherine",
        surname: "Brown",
      },
      ratingNumber: 3,
      comment: "It was okay, but I expected more from the keynote speaker.",
    },
    {
      user: {
        id: "user-4",
        name: "Daniel",
        surname: "Taylor",
      },
      ratingNumber: 2,
      comment: "Not well organized, and the schedule was delayed.",
    },
    {
      user: {
        id: "user-5",
        name: "Emma",
        surname: "Williams",
      },
      ratingNumber: 5,
      comment: "Fantastic! The workshops were top-notch and very engaging.",
    },
  ];

  const [showEvents, setShowEvents] = React.useState(true);
  const showToast = useShowToast();

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

  const mockUser = {
    id: "4",
    name: "Bob",
    surname: "Brown",
    imageUrl: "https://via.placeholder.com/40",
    rating: 3.5,
  };

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
                  {user.ratings.length > 0 ? (

                    <VStack mt="20px" gap="16px">
                      {user.ratings?.map((rating, index) => (
                        <RatingCard key={index} rating={rating} />
                      ))}
                    </VStack>
                  ) : (
                    <VStack>

                      <Text fontWeight={600} fontSize={"32px"} color="fg.subtle">This user has no ratings yet</Text>
                    </VStack>
                  )
                    
                  }
                </>
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
