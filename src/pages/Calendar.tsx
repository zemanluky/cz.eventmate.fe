import { DatePicker } from "@ParkComponents/date-picker";
import { Box, Flex, Stack, VStack } from "@Panda/jsx";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@ParkComponents/button";
import { IconButton } from "@ParkComponents/icon-button";
import { Input } from "@ParkComponents/input";
import { Text } from "@ParkComponents/text";
import { EventCardCalendarDesktop } from "@Components/ui/EventCardCalendarDesktop";
import axiosClient from "axiosClient";
import { EventCardMobile } from "@Components/ui";
import { Spinner } from "@ParkComponents/spinner";

export const Calendar: React.FC = () => {
  const today = new Date().toISOString();
  const [eventsMonthByDay, setEventsMonthByDay] = React.useState<any[]>([]); // Events in arrays by days in a month
  const [currentCalendarMonth, setCurrentCalendarMonth] = React.useState(today); // Current month in calendar
  const [isLoading, setIsLoading] = React.useState(false); // Loading state

  const fetchEvents = React.useCallback(async () => {
    if (isLoading) return; // Don't fetch if already loading
    setIsLoading(true); // Set loading state

    try {
      const response = await axiosClient.get(`/event/month-overview`, {
        params: {
          date: currentCalendarMonth, // Adjust based on your logic
        },
      });

      const fetchedEvents = response.data?.data;

      setEventsMonthByDay(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }, [isLoading, currentCalendarMonth]);

  React.useEffect(() => {
    fetchEvents();
  }, [currentCalendarMonth]);

  const events = Object.values(eventsMonthByDay).flatMap(
    (eventArray) => eventArray
  );

  const changeCalendarMonth = (direction: "prev" | "next") => {
    setEventsMonthByDay([]);

    const currentDate = new Date(currentCalendarMonth);
    let newDate: Date;

    if (direction === "prev") {
      newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1)); // Go to previous month
    } else {
      newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1)); // Go to next month
    }

    setCurrentCalendarMonth(newDate.toISOString().split("T")[0]);
  };

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
                            <IconButton
                              variant="ghost"
                              size="sm"
                              onClick={() => changeCalendarMonth("prev")}
                            >
                              <ChevronLeftIcon />
                            </IconButton>
                          </DatePicker.PrevTrigger>
                          <DatePicker.ViewTrigger asChild>
                            <Button variant="ghost" size="sm" disabled>
                              <DatePicker.RangeText />
                            </Button>
                          </DatePicker.ViewTrigger>
                          <DatePicker.NextTrigger asChild>
                            <IconButton
                              variant="ghost"
                              size="sm"
                              onClick={() => changeCalendarMonth("next")}
                            >
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
                                  const isEventDate =
                                    Array.isArray(eventsMonthByDay[day.day]) &&
                                    eventsMonthByDay[day.day].length > 0;

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
                                        bgColor={isEventDate ? "red" : "white"}
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
        {isLoading ? (
          <VStack w={{ base: "100%", xl: "60%" }}>
            <Spinner />
          </VStack>
        ) : (
          <>
            <VStack hideBelow="lg" w={{ base: "100%", xl: "60%" }}>
              {events.map((event) => {
                return (
                  <div key={event._id}>
                    <EventCardCalendarDesktop event={event} />
                  </div>
                );
              })}
            </VStack>
            <VStack hideFrom="lg" w={{ base: "100%", xl: "60%" }}>
              {events.map((event) => {
                return (
                  <div key={event._id}>
                    <EventCardMobile event={event} />
                  </div>
                );
              })}
            </VStack>
          </>
        )}
      </Stack>
    </>
  );
};
