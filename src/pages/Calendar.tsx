import { DatePicker } from "@ParkComponents/date-picker";
import { Box, Flex, Stack, VStack } from "@Panda/jsx";
import { Spinner } from "@ParkComponents/spinner";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@ParkComponents/button";
import { IconButton } from "@ParkComponents/icon-button";
import { Input } from "@ParkComponents/input";
import { parseISO } from "date-fns";
import { Text } from "@ParkComponents/text";
import { EventCardCalendarDesktop } from "@Components/ui/EventCardCalendarDesktop";
import { EventCardMobile } from "@Components/ui";

export const Calendar: React.FC = () => {
  const mockEvents = [
    {
      _id: "event1",
      name: "Photography Workshop",
      image: "https://via.placeholder.com/350x250?text=Event+1",
      date: "2024-12-10T00:00:00.000Z",
      location: "New York City, NY",
      private: true,
      memberList: [
        {
          member: {
            _id: "1",
            name: "John",
            surname: "Doe",
            imageUrl: "https://via.placeholder.com/50?text=JD",
          },
        },
        {
          member: {
            _id: "2",
            name: "Jane",
            surname: "Smith",
            imageUrl: "https://via.placeholder.com/50?text=JS",
          },
        },
      ],
    },
    {
      _id: "event2",
      name: "Tech Expo 2024",
      image: "https://via.placeholder.com/350x250?text=Event+2",
      date: "2024-12-15T00:00:00.000Z",
      location: "San Francisco, CA",
      private: false,
      memberList: [
        {
          member: {
            _id: "3",
            name: "Alice",
            surname: "Johnson",
            imageUrl: "https://via.placeholder.com/50?text=AJ",
          },
        },
        {
          member: {
            _id: "4",
            name: "Bob",
            surname: "Brown",
            imageUrl: "https://via.placeholder.com/50?text=BB",
          },
        },
        {
          member: {
            _id: "5",
            name: "Charlie",
            surname: "Wilson",
            imageUrl: "https://via.placeholder.com/50?text=CW",
          },
        },
      ],
    },
    {
      _id: "event3",
      name: "Art & Design Conference",
      image: "https://via.placeholder.com/350x250?text=Event+3",
      date: "2024-12-20T00:00:00.000Z",
      location: "Austin, TX",
      private: true,
      memberList: [
        {
          member: {
            _id: "6",
            name: "Emily",
            surname: "Clark",
            imageUrl: "https://via.placeholder.com/50?text=EC",
          },
        },
      ],
    },
    {
      _id: "event4",
      name: "Music Festival",
      image: "https://via.placeholder.com/350x250?text=Event+4",
      date: "2024-12-30T00:00:00.000Z",
      location: "Los Angeles, CA",
      private: false,
      memberList: [
        {
          member: {
            _id: "7",
            name: "David",
            surname: "Evans",
            imageUrl: "https://via.placeholder.com/50?text=DE",
          },
        },
        {
          member: {
            _id: "8",
            name: "Sophia",
            surname: "Green",
            imageUrl: "https://via.placeholder.com/50?text=SG",
          },
        },
        {
          member: {
            _id: "9",
            name: "Liam",
            surname: "Hall",
            imageUrl: "https://via.placeholder.com/50?text=LH",
          },
        },
      ],
    },
    {
      _id: "event5",
      name: "Startup Pitch Night",
      image: "https://via.placeholder.com/350x250?text=Event+5",
      date: "2025-01-05T00:00:00.000Z",
      location: "Seattle, WA",
      private: true,
      memberList: [
        {
          member: {
            _id: "10",
            name: "Olivia",
            surname: "Harris",
            imageUrl: "https://via.placeholder.com/50?text=OH",
          },
        },
        {
          member: {
            _id: "11",
            name: "Ethan",
            surname: "Martinez",
            imageUrl: "https://via.placeholder.com/50?text=EM",
          },
        },
      ],
    },
  ];

  const events = mockEvents;

  const todayString = new Date().toISOString().split("T")[0];

  return (
    <>
      {/* Title */}
      <Text fontSize={{ sm: "4xl", base: "4xl" }} fontWeight="500" mb="28px">
        Calendar
      </Text>

      <Stack w="100%" direction={{ base: "column", md: "row" }}>
        {/* Calendar */}
        <VStack
          w={{ base: "100%", xl: "40%" }}
          h={{ base: "450px", xl: "auto" }}
        >
          <DatePicker.Root startOfWeek={1} selectionMode="single" open={true}>
            <DatePicker.Label>Today is:</DatePicker.Label>
            <DatePicker.Control>
              <DatePicker.Input value={todayString} disabled index={0} asChild>
                <Input />
              </DatePicker.Input>
              <DatePicker.Trigger disabled asChild>
                <IconButton variant="outline" aria-label="Open date picker">
                  <CalendarIcon />
                </IconButton>
              </DatePicker.Trigger>
            </DatePicker.Control>

            <DatePicker.Positioner>
              <DatePicker.Content>
                <DatePicker.View view="day">
                  <DatePicker.Context>
                    {(api) => (
                      <>
                        <DatePicker.ViewControl>
                          <DatePicker.PrevTrigger asChild>
                            <IconButton variant="ghost" size="sm">
                              <ChevronLeftIcon />
                            </IconButton>
                          </DatePicker.PrevTrigger>
                          <DatePicker.ViewTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <DatePicker.RangeText />
                            </Button>
                          </DatePicker.ViewTrigger>
                          <DatePicker.NextTrigger asChild>
                            <IconButton variant="ghost" size="sm">
                              <ChevronRightIcon />
                            </IconButton>
                          </DatePicker.NextTrigger>
                        </DatePicker.ViewControl>
                        <DatePicker.Table>
                          <DatePicker.TableHead>
                            <DatePicker.TableRow>
                              {api.weekDays.map((weekDay, id) => (
                                <DatePicker.TableHeader key={id}>
                                  {weekDay.narrow}
                                </DatePicker.TableHeader>
                              ))}
                            </DatePicker.TableRow>
                          </DatePicker.TableHead>
                          <DatePicker.TableBody>
                            {api.weeks.map((week, weekIndex) => (
                              <DatePicker.TableRow key={weekIndex}>
                                {week.map((day, dayIndex) => {
                                  const isoDateString = `${day.year}-${String(day.month).padStart(2, "0")}-${String(day.day).padStart(2, "0")}`;
                                  const matchDate = parseISO(isoDateString);

                                  const isEventDate = events.some(
                                    (event) =>
                                      parseISO(event.date)
                                        .toISOString()
                                        .split("T")[0] ===
                                      matchDate.toISOString().split("T")[0]
                                  );

                                  return (
                                    <DatePicker.TableCell
                                      key={dayIndex}
                                      value={day}
                                    >
                                      <Box
                                        w="40px"
                                        h="40px"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        borderRadius="8px"
                                        bg={
                                          isEventDate
                                            ? "rgba(255, 99, 71, 0.3)"
                                            : "white"
                                        }
                                      >
                                        {day.day}
                                      </Box>
                                    </DatePicker.TableCell>
                                  );
                                })}
                              </DatePicker.TableRow>
                            ))}
                          </DatePicker.TableBody>
                        </DatePicker.Table>
                      </>
                    )}
                  </DatePicker.Context>
                </DatePicker.View>
                <DatePicker.View view="month">
                  <DatePicker.Context>
                    {(api) => (
                      <>
                        <DatePicker.ViewControl>
                          <DatePicker.PrevTrigger asChild>
                            <IconButton variant="ghost" size="sm">
                              <ChevronLeftIcon />
                            </IconButton>
                          </DatePicker.PrevTrigger>
                          <DatePicker.ViewTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <DatePicker.RangeText />
                            </Button>
                          </DatePicker.ViewTrigger>
                          <DatePicker.NextTrigger asChild>
                            <IconButton variant="ghost" size="sm">
                              <ChevronRightIcon />
                            </IconButton>
                          </DatePicker.NextTrigger>
                        </DatePicker.ViewControl>
                        <DatePicker.Table>
                          <DatePicker.TableBody>
                            {api
                              .getMonthsGrid({ columns: 4, format: "short" })
                              .map((months, id) => (
                                <DatePicker.TableRow key={id}>
                                  {months.map((month, id) => (
                                    <DatePicker.TableCell
                                      key={id}
                                      value={month.value}
                                    >
                                      <DatePicker.TableCellTrigger asChild>
                                        <Button variant="ghost">
                                          {month.label}
                                        </Button>
                                      </DatePicker.TableCellTrigger>
                                    </DatePicker.TableCell>
                                  ))}
                                </DatePicker.TableRow>
                              ))}
                          </DatePicker.TableBody>
                        </DatePicker.Table>
                      </>
                    )}
                  </DatePicker.Context>
                </DatePicker.View>
                <DatePicker.View view="year">
                  <DatePicker.Context>
                    {(api) => (
                      <>
                        <DatePicker.ViewControl>
                          <DatePicker.PrevTrigger asChild>
                            <IconButton variant="ghost" size="sm">
                              <ChevronLeftIcon />
                            </IconButton>
                          </DatePicker.PrevTrigger>
                          <DatePicker.ViewTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <DatePicker.RangeText />
                            </Button>
                          </DatePicker.ViewTrigger>
                          <DatePicker.NextTrigger asChild>
                            <IconButton variant="ghost" size="sm">
                              <ChevronRightIcon />
                            </IconButton>
                          </DatePicker.NextTrigger>
                        </DatePicker.ViewControl>
                        <DatePicker.Table>
                          <DatePicker.TableBody>
                            {api
                              .getYearsGrid({ columns: 4 })
                              .map((years, id) => (
                                <DatePicker.TableRow key={id}>
                                  {years.map((year, id) => (
                                    <DatePicker.TableCell
                                      key={id}
                                      value={year.value}
                                    >
                                      <DatePicker.TableCellTrigger asChild>
                                        <Button variant="ghost">
                                          {year.label}
                                        </Button>
                                      </DatePicker.TableCellTrigger>
                                    </DatePicker.TableCell>
                                  ))}
                                </DatePicker.TableRow>
                              ))}
                          </DatePicker.TableBody>
                        </DatePicker.Table>
                      </>
                    )}
                  </DatePicker.Context>
                </DatePicker.View>
              </DatePicker.Content>
            </DatePicker.Positioner>
          </DatePicker.Root>
        </VStack>

        {/* Events */}
        <VStack w={{ base: "100%", xl: "60%" }}>
          <Flex
            gap="16px"
            mt={"20px"}
            flexWrap={"wrap"}
            justifyContent="center"
          >
            {events.map((event, index) => {
              //const isLast = index === events.length - 1;
              return (
                <div
                  key={event._id}
                  //ref={isLast ? lastEventRef : null} // Attach ref to the last event
                >
                  <EventCardCalendarDesktop event={event} />
                </div>
              );
            })}
          </Flex>

          {/* {isLoading && (
            <Flex justifyContent="center" mt="20px">
              <Spinner size="lg" />
            </Flex>
          )}
          {!hasMore && !isLoading && (
            <p style={{ textAlign: "center", margin: "20px" }}>
              No more events to load
            </p>
          )} */}
        </VStack>
      </Stack>
    </>
  );
};
