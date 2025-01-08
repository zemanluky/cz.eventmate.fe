import { parseDate, useDatePicker } from "@ark-ui/react";
import { Box, Flex } from "@Panda/jsx";
import { Button } from "@ParkComponents/button";
import { DatePicker } from "@ParkComponents/date-picker";
import { FormLabel } from "@ParkComponents/form-label";
import { Icon } from "@ParkComponents/icon";
import { IconButton } from "@ParkComponents/icon-button";
import { Input } from "@ParkComponents/input";
import { Menu } from "@ParkComponents/menu";
import { Text } from "@ParkComponents/text";
import { parseISO } from "date-fns";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SlidersHorizontal,
} from "lucide-react";
import React, { useState } from "react";
import { useFilterContext } from "src/contexts/FilterContext";
import { ComboBoxComponent } from "./ComboBoxComponent";
import axiosClient from "axiosClient";
import useAuthStore from "src/store/authStore";

export const EventToolbar: React.FC = () => {
  const authUser = useAuthStore((state) => state.user);
  const [showEvents, setShowEvents] = useState(true);
  const { setFilters } = useFilterContext();
  const [eventCategories, setEventCategories] = React.useState([]);

  const [filterInputs, setFilterInputs] = useState({
    location: "",
    category: "",
    date: {
      dateStart: "",
      dateEnd: "",
    },
  });

  const isoParser = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const datePicker = useDatePicker({
    closeOnSelect: true,
    positioning: { sameWidth: true },
    startOfWeek: 1,
    selectionMode: "range",
    onValueChange(details) {
      const [startDate, endDate] = details.valueAsString || ["", ""];
      if (startDate && endDate) {
        const parsedStartDate = isoParser(parseISO(startDate));
        const parsedEndDate = isoParser(parseISO(endDate));
        setFilterInputs((prev) => ({
          ...prev,
          date: {
            dateStart: parsedStartDate,
            dateEnd: parsedEndDate,
          },
        }));
      }
    },
  });

  const getCategories = async () => {
    const response = await axiosClient.get(`/event/category`);
    const data = response?.data?.data;
    return data;
  };

  const getEventCategories = async () => {
    const categories = await getCategories();
    const transformedCategories = categories?.map(
      ({ _id: value, name: label }) => ({
        value,
        label,
      })
    );
    return transformedCategories;
  };

  React.useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getEventCategories();
      setEventCategories(categories);
    };
    fetchCategories();
  }, []);

  const handleFiltersSubmit = async () => {
    // Dynamically construct the formData object without empty string values
    const formData = Object.fromEntries(
      Object.entries({
        location: filterInputs.location,
        category: filterInputs.category,
        dateStart: filterInputs.date.dateStart,
        dateEnd: filterInputs.date.dateEnd,
      }).filter(([_, value]) => value !== "")
    );

    setFilters(formData);
  };

  const handleClearFilters = () => {
    setFilterInputs({
      location: "",
      category: "",
      date: {
        dateStart: "",
        dateEnd: "",
      },
    });
    datePicker.setValue(null); // Clear the DatePicker value
  };

  return (
    <Menu.Root positioning={{ placement: "bottom-start" }}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text fontSize={{ sm: "5xl", base: "4xl" }} fontWeight="500">
          Events
        </Text>
        <Flex gap={{ sm: "40px", base: "16px" }} alignItems={"center"}>
          {authUser && (
            <Box w="150px" p="5px" h="36px" rounded="full" bg="bg.muted">
              <Flex justifyItems="center">
                <Button
                  w="70px"
                  h="26px"
                  rounded="full"
                  bg={showEvents ? "bg.buttonSmall" : "transparent"}
                  onClick={() => setShowEvents(true)}
                >
                  <Text>Public</Text>
                </Button>
                <Button
                  w="70px"
                  h="26px"
                  rounded="full"
                  bg={showEvents ? "transparent" : "bg.buttonSmall"}
                  onClick={() => setShowEvents(false)}
                >
                  <Text>Private</Text>
                </Button>
              </Flex>
            </Box>
          )}

          <Menu.Trigger asChild>
            <Button p={"0px"}>
              <Icon>
                <SlidersHorizontal />
              </Icon>
            </Button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content w="360px" maxH="650px" borderRadius={"16px"}>
              <Menu.ItemGroup>
                <Menu.ItemGroupLabel>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text fontSize="18px" ml="8px">
                      Add Filters
                    </Text>
                    <Button
                      variant="ghost"
                      color="bg.buttonLarge"
                      onClick={handleClearFilters}
                    >
                      Clear all
                    </Button>
                  </Flex>
                </Menu.ItemGroupLabel>
                <Menu.Separator />
                <Flex px="32px" my="16px" flexDirection={"column"} gap="16px">
                  {/* Location input */}
                  <FormLabel fontSize="14px">Search event location</FormLabel>
                  <Input
                    value={filterInputs.location}
                    size="md"
                    placeholder="Event location"
                    borderRadius="16px"
                    onChange={(e) =>
                      setFilterInputs({
                        ...filterInputs,
                        location: e.target.value,
                      })
                    }
                  />
                  {/* Date range input */}
                  <DatePicker.RootProvider value={datePicker}>
                    <DatePicker.Label>Date range of event</DatePicker.Label>
                    <DatePicker.Control>
                      <DatePicker.Input index={0} asChild>
                        <Input />
                      </DatePicker.Input>
                      <DatePicker.Input index={1} asChild>
                        <Input />
                      </DatePicker.Input>
                      <DatePicker.Trigger asChild>
                        <IconButton
                          variant="outline"
                          aria-label="Open date picker"
                        >
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
                                    {api.weeks.map((week, id) => (
                                      <DatePicker.TableRow key={id}>
                                        {week.map((day, id) => (
                                          <DatePicker.TableCell
                                            key={id}
                                            value={day}
                                          >
                                            <DatePicker.TableCellTrigger
                                              asChild
                                            >
                                              <IconButton variant="ghost">
                                                {day.day}
                                              </IconButton>
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
                                      .getMonthsGrid({
                                        columns: 4,
                                        format: "short",
                                      })
                                      .map((months, id) => (
                                        <DatePicker.TableRow key={id}>
                                          {months.map((month, id) => (
                                            <DatePicker.TableCell
                                              key={id}
                                              value={month.value}
                                            >
                                              <DatePicker.TableCellTrigger
                                                asChild
                                              >
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
                                              <DatePicker.TableCellTrigger
                                                asChild
                                              >
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
                  </DatePicker.RootProvider>

                  <ComboBoxComponent
                    label="Category"
                    placeholder="Event categories"
                    inputCollection={eventCategories}
                    onChange={(value) => {
                      setFilterInputs({
                        ...filterInputs,
                        category: value,
                      });
                    }}
                  />
                </Flex>
                <Menu.Separator />
                <Button m={"auto"} w="225px" onClick={handleFiltersSubmit}>
                  Apply filters
                </Button>
              </Menu.ItemGroup>
            </Menu.Content>
          </Menu.Positioner>
        </Flex>
      </Flex>
    </Menu.Root>
  );
};
