import {
  EventCardLongDesktop,
  EventCardWithButtonsMobile,
  EventToolbarMyEvents,
} from "@Components/ui";
import { VStack } from "@Panda/jsx";
import axiosClient from "axiosClient";
import * as React from "react";

export const MyEvents: React.FC = () => {
  const [events, setEvents] = React.useState<any[]>([]); // Rendered events
  const [isLoading, setIsLoading] = React.useState(false); // Loading state
  const [hasMore, setHasMore] = React.useState(true); // Flag for more data
  const [pageNumber, setPageNumber] = React.useState(0); // Current page number
  const pageSize = 10; // Number of events per page

  const lastEventRef = React.useRef<HTMLDivElement | null>(null); // Reference to last element
  const observer = React.useRef<IntersectionObserver | null>(null); // Intersection Observer reference

  // Fetch events from the backend
  const fetchEvents = React.useCallback(async () => {
    if (isLoading || !hasMore) return; // Don't fetch if already loading or no more events
    const userJson = localStorage.getItem("user-info");
    const userObject = JSON.parse(userJson);

    setIsLoading(true); // Set loading state

    try {
      const response = await axiosClient.get(`/event/`, {
        params: {
          userId: userObject._id, // Adjust based on your logic
          pageSize,
          pageNumber,
        },
      });

      const fetchedEvents = response.data;
      console.log(response);

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
  const mockEvents = [
    {
      id: "event1",
      name: "Photography Workshop",
      image: "https://via.placeholder.com/350x250?text=Event+1",
      date: "2024-12-10",
      place: "New York City, NY",
      private: true,
      memberList: [
        {
          member: {
            id: "1",
            name: "John",
            surname: "Doe",
            imageUrl: "https://via.placeholder.com/50?text=JD",
          },
        },
        {
          member: {
            id: "2",
            name: "Jane",
            surname: "Smith",
            imageUrl: "https://via.placeholder.com/50?text=JS",
          },
        },
      ],
    },
    {
      id: "event2",
      name: "Tech Expo 2024",
      image: "https://via.placeholder.com/350x250?text=Event+2",
      date: "2024-12-15",
      place: "San Francisco, CA",
      private: false,
      memberList: [
        {
          member: {
            id: "3",
            name: "Alice",
            surname: "Johnson",
            imageUrl: "https://via.placeholder.com/50?text=AJ",
          },
        },
        {
          member: {
            id: "4",
            name: "Bob",
            surname: "Brown",
            imageUrl: "https://via.placeholder.com/50?text=BB",
          },
        },
        {
          member: {
            id: "5",
            name: "Charlie",
            surname: "Wilson",
            imageUrl: "https://via.placeholder.com/50?text=CW",
          },
        },
      ],
    },
    {
      id: "event3",
      name: "Art & Design Conference",
      image: "https://via.placeholder.com/350x250?text=Event+3",
      date: "2024-12-20",
      place: "Austin, TX",
      private: true,
      memberList: [
        {
          member: {
            id: "6",
            name: "Emily",
            surname: "Clark",
            imageUrl: "https://via.placeholder.com/50?text=EC",
          },
        },
      ],
    },
    {
      id: "event4",
      name: "Music Festival",
      image: "https://via.placeholder.com/350x250?text=Event+4",
      date: "2024-12-30",
      place: "Los Angeles, CA",
      private: false,
      memberList: [
        {
          member: {
            id: "7",
            name: "David",
            surname: "Evans",
            imageUrl: "https://via.placeholder.com/50?text=DE",
          },
        },
        {
          member: {
            id: "8",
            name: "Sophia",
            surname: "Green",
            imageUrl: "https://via.placeholder.com/50?text=SG",
          },
        },
        {
          member: {
            id: "9",
            name: "Liam",
            surname: "Hall",
            imageUrl: "https://via.placeholder.com/50?text=LH",
          },
        },
      ],
    },
    {
      id: "event5",
      name: "Startup Pitch Night",
      image: "https://via.placeholder.com/350x250?text=Event+5",
      date: "2025-01-05",
      place: "Seattle, WA",
      private: true,
      memberList: [
        {
          member: {
            id: "10",
            name: "Olivia",
            surname: "Harris",
            imageUrl: "https://via.placeholder.com/50?text=OH",
          },
        },
        {
          member: {
            id: "11",
            name: "Ethan",
            surname: "Martinez",
            imageUrl: "https://via.placeholder.com/50?text=EM",
          },
        },
      ],
    },
  ];

  return (
    <>
      <EventToolbarMyEvents />

      <VStack hideBelow="md" gap={5}>
        {events.map((event, index) => {
          const isLast = index === events.length - 1;
          return (
            <div ref={isLast ? lastEventRef : null} key={event._id}>
              <EventCardLongDesktop event={event} />
            </div>
          );
        })}
      </VStack>
      <VStack hideFrom="md">
        {events.map((event, index) => {
          const isLast = index === events.length - 1;
          return (
            <div ref={isLast ? lastEventRef : null} key={event._id}>
              <EventCardWithButtonsMobile event={event} />
            </div>
          );
        })}
      </VStack>
    </>
  );
};
