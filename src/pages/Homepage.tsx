import * as React from "react";
import { EventToolbar } from "@Components/ui/EventToolbar";
import { EventCardBigDesktop } from "@Components/ui";
import { Flex } from "@Panda/jsx";
import { Spinner } from "@ParkComponents/spinner";
import axiosClient from "axiosClient"; // assuming this is set up for axios

export const Homepage: React.FC = () => {
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

    setIsLoading(true); // Set loading state

    try {
      const response = await axiosClient.get(`/event`, {
        params: {
          userId: "null", // Adjust based on your logic
          pageSize,
          pageNumber,
        },
      });

      const fetchedEvents = response.data;

      // Avoid duplicates by filtering out events already in the state
      setEvents((prev) => {
        const newEvents = fetchedEvents.filter(
          (event: any) => !prev.some((existingEvent: any) => existingEvent._id === event._id)
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

  return (
    <>
      <EventToolbar />
      <Flex gap="16px" mt={"20px"} flexWrap={"wrap"} justifyContent="center">
        {events.map((event, index) => {
          const isLast = index === events.length - 1;
          return (
            <div
              key={event._id}
              ref={isLast ? lastEventRef : null} // Attach ref to the last event
            >
              <EventCardBigDesktop event={event} />
            </div>
          );
        })}
      </Flex>
      {isLoading && (
        <Flex justifyContent="center" mt="20px">
          <Spinner size="lg" />
        </Flex>
      )}
      {!hasMore && !isLoading && (
        <p style={{ textAlign: "center", margin: "20px" }}>
          No more events to load
        </p>
      )}
    </>
  );
};
