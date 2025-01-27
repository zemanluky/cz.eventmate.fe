import * as React from "react";
import { EventToolbar } from "@Components/ui/EventToolbar";
import { EventCardBigDesktop } from "@Components/ui";
import { Flex } from "@Panda/jsx";
import { Spinner } from "@ParkComponents/spinner";
import axiosClient from "axiosClient"; // assuming this is set up for axios
import { useFilterContext } from "../contexts/FilterContext";

export const Homepage: React.FC = () => {
  const { filters } = useFilterContext(); // Filters from filter context
  const [events, setEvents] = React.useState<any[]>([]); // Rendered events
  const [isLoading, setIsLoading] = React.useState(false); // Loading state
  const [hasMore, setHasMore] = React.useState(true); // Flag for more data
  const [pageNumber, setPageNumber] = React.useState(1); // Current page number
  const pageSize = 10; // Number of events per page
  const [appliedFilter, setAppliedFilter] = React.useState("public-only"); // Active filter logic


  const lastEventRef = React.useRef<HTMLDivElement | null>(null); // Reference to last element
  const observer = React.useRef<IntersectionObserver | null>(null); // Intersection Observer reference

    // Update filter logic dynamically
    const handleFilterChange = React.useCallback((newFilter: string) => {
      setAppliedFilter(newFilter);
      setEvents([]); // Clear events
      setPageNumber(1); // Reset pagination
      setHasMore(true); // Enable fetching more

    }, []);

React.useEffect(()=>{
  console.log(appliedFilter)
},[appliedFilter])

  // Fetch events from the backend
  const fetchEvents = React.useCallback(async () => {
    if (isLoading) return; // Don't fetch if already loading or no more events
    const userJson = localStorage.getItem("user-info");
    const userObject = JSON.parse(userJson);
    setIsLoading(true); // Set loading state

    try {
      const parameters = {
        pageSize,
        pageNumber,
        location: filters.location,
        dateStart: filters.dateStart === "" ? null : filters.dateStart,
        dateEnd: filters.dateEnd === "" ? null : filters.dateEnd,
        rating: null,
        category: filters.category,
        filter: appliedFilter,
      };

      // fetching events by parameters
      const response = await axiosClient.get(`/event/`, {
        params: parameters,
      });
      // data from response
      const fetchedEvents = response.data?.data;

      // setting events
      setEvents((prev) => {
        const newEvents = fetchedEvents?.filter(
          (event: any) =>
            !prev.some((existingEvent: any) => existingEvent._id === event._id)
        );

        return [...prev, ...newEvents];
      });

      // if there are no more events don't fetch even when filters are applied
      if (fetchedEvents.length < pageSize) {
        setHasMore(false); // No more events to fetch
      } else {
        setHasMore(true); // Allow fetching more events
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setHasMore(false); // Stop fetching on error
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }, [isLoading, hasMore, pageNumber, filters, appliedFilter]);

  // filters changing logic
  React.useEffect(() => {
    setEvents([]); // Clear events when filters change
    setPageNumber(1); // Reset to the first page
    setHasMore(true); // Allow fetching new data
  }, [filters]);

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
  }, [pageNumber, filters,appliedFilter]);

  return (
    <>
      <EventToolbar onFilterChange={handleFilterChange}/>
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
