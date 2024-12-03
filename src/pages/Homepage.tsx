import * as React from "react";
import { EventToolbar } from "@Components/ui/EventToolbar";
import { EventCardBigDesktop } from "@Components/ui";
import { Flex } from "@Panda/jsx";
import { Spinner } from "@ParkComponents/spinner";

export const Homepage: React.FC = () => {

  const generateMockEvents = (count) => {
    const events = [];
    const cities = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Miami, FL", "Denver, CO", "San Francisco, CA", "Seattle, WA", "Phoenix, AZ", "Boston, MA"];
    const firstNames = ["Emma", "Olivia", "Ava", "Sophia", "Isabella", "Mason", "Liam", "Noah", "Ethan", "James"];
    const lastNames = ["Smith", "Johnson", "Brown", "Taylor", "Anderson", "Thomas", "Harris", "Martinez", "Garcia", "Clark"];
    
    for (let i = 1; i <= count; i++) {
      const id = `event${i}`;
      const name = `Event ${i}`;
      const image = `https://via.placeholder.com/350x250?text=${encodeURIComponent(name)}`;
      const date = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split("T")[0];
      const place = cities[Math.floor(Math.random() * cities.length)];
  
      // Generate a random member
      const memberId = `member${i}`;
      const memberFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const memberLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const memberImageUrl = `https://via.placeholder.com/50?text=${memberFirstName[0]}${memberLastName[0]}`;
  
      const member = {
        member: {
          id: memberId,
          name: memberFirstName,
          surname: memberLastName,
          imageUrl: memberImageUrl,
        },
      };
  
      events.push({
        id,
        name,
        image,
        date,
        place,
        memberList: [member], // Add the random member here
      });
    }
    
    return events;
  };
  
  const mockEvents = generateMockEvents(50);

	const [events, setEvents] = React.useState<any[]>([]); // Rendered events
	const [isLoading, setIsLoading] = React.useState(false); // Loading state
	const [hasMore, setHasMore] = React.useState(true); // Flag for more data

	const allEvents = React.useRef(mockEvents); // All mock data (replace with backend API fetch)
	const observer = React.useRef<IntersectionObserver | null>(null); // Intersection Observer reference
	const lastEventRef = React.useRef<HTMLDivElement | null>(null); // Reference to last element

	const loadMoreEvents = React.useCallback(() => {
		if (!hasMore || isLoading) return;

		setIsLoading(true);
		// Simulate backend fetch: load 5 more events
		setTimeout(() => {
			const nextEvents = allEvents.current.slice(
				events.length,
				events.length + 5
			);
			setEvents((prev) => [...prev, ...nextEvents]);
			setIsLoading(false);
			if (events.length + nextEvents.length >= allEvents.current.length)
				setHasMore(false); // Stop if no more data
		}, 1000); // Simulate delay
	}, [events.length, hasMore, isLoading]);

	// Observer to detect scrolling to the last element
	React.useEffect(() => {
		if (isLoading) return;

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
			// Cleanup observer
			if (observer.current && lastEventRef.current) {
				observer.current.unobserve(lastEventRef.current);
			}
		};
	}, [loadMoreEvents]);

	React.useEffect(() => {
		// Load the first batch of events
		loadMoreEvents();
	}, []); // Initial load

	return (
		<>
			<EventToolbar />
			<Flex gap="16px" mt={"20px"} flexWrap={"wrap"} justifyContent="center">
				{events.map((event, index) => {
					const isLast = index === events.length - 1;
					return (
						<div
							key={event.id}
							ref={isLast ? lastEventRef : null} // Attach ref to the last event
						>
							<EventCardBigDesktop event={event} />
						</div>
					);
				})}
			</Flex>
			{isLoading && (
				<Flex justifyContent="center" mt="20px">
					<Spinner size="lg" /> {/* Loading spinner */}
				</Flex>
			)}
			{!hasMore && (
				<p style={{ textAlign: "center", margin: "20px" }}>
					No more events to load
				</p>
			)}
		</>
	);
};
