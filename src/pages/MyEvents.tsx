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
  const [pageNumber, setPageNumber] = React.useState(1); // Current page number
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

  const handleDeleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((event) => event._id !== eventId));
  };
  

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

  return (
    <>
      <EventToolbarMyEvents />

      <VStack hideBelow="md" gap={5}>
        {events.map((event, index) => {
          const isLast = index === events.length - 1;
          return (
            <div ref={isLast ? lastEventRef : null} key={event._id}>
              <EventCardLongDesktop event={event} onDelete={handleDeleteEvent}/>
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
