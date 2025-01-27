import { Box, Flex, HStack, Stack, VStack } from "@Panda/jsx";
import { Button } from "@ParkComponents/button";
import { FormLabel } from "@ParkComponents/form-label";
import { Input } from "@ParkComponents/input";
import { Text } from "@ParkComponents/text";
import * as React from "react";
import { DatePickerComponent } from "./DatePickerComponent";
import { ComboBoxComponent } from "./ComboBoxComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "@ParkComponents/spinner";
import { useShowToast } from "src/hooks";
import { useNavigate } from "react-router-dom";
import axiosClient from "axiosClient";
import axios from "axios";
import useGetEventById from "src/hooks/useGetEventById";
interface EditEventFormProps {
  eventToEditId: string;
}

export const EditEventForm: React.FC<EditEventFormProps> = ({
  eventToEditId,
}) => {
  // Getting event by id
  const { event, loading } = useGetEventById(eventToEditId);

  const eventTypes = [
    { label: "Public", value: false },
    { label: "Private", value: true },
  ];

  // Validation schema using zod
  const eventFormSchema = z.object({
    name: z.string().nonempty("Name is required"),
    place: z.string().nonempty("Place is required"),
    description: z.string().nonempty("Description is required"),
    category: z.string().nonempty("Category is required"),
    type: z.boolean(),
    date: z.date(),
  });
  type EventFormValues = z.infer<typeof eventFormSchema>;

  //const eventData = handleLoad(eventToEditId);
  const mockEvent = {
    category: event?.category,
    date: new Date(event?.date), // new Date if important for ISO 8601 format
    description: event?.description,
    name: event?.name,
    place: event?.location,
    type: event?.private,
  };

  const [files, setFiles] = React.useState<File[]>([]); //file upload images

  const showToast = useShowToast();

  const navigate = useNavigate();

  const eventData = mockEvent;

  const [eventCategories, setEventCategories] = React.useState<
    { value: string; label: string }[]
  >([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset, // Import the reset function
  } = useForm<EventFormValues>({
    defaultValues: {
      name: "",
      place: "",
      description: "",
      category: "",
      type: false,
      date: new Date(),
    },
    resolver: zodResolver(eventFormSchema),
  });
  // Update form values when event data is loaded
  React.useEffect(() => {
    if (event) {
      const eventData = {
        category: event?.category?._id,
        date: new Date(event?.date), // new Date if important for ISO 8601 format
        description: event?.description,
        name: event?.name,
        place: event?.location,
        type: event?.private ? true : false,
      };
      reset(eventData); // Dynamically update form values
    }
  }, [event, reset]);

  const isoParser = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const onSubmit: SubmitHandler<EventFormValues> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); //simulated call for isSubmitting state
      const formData = {
        name: data.name,
        description: data.description,
        location: data.place,
        private: data.type ? true : false,
        date: isoParser(data.date),
        category: data.category,
        image_paths: event?.image_paths,
      };

      try {
        const response = await axiosClient.put(
          `/event/${eventToEditId}`,
          formData
        );

        // Success message
        if (response.status === 200) {
          showToast("Success", "Event updated successfully!", "success");
          navigate("/my-events");
        } else {
          showToast("Warning", "Updating event failed", "alert");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showToast(
            "Error",
            `Updating event failed ${error.response?.data?.message || error.message}`,
            "error"
          );
        } else {
          showToast("Error", `Unexpected error occured : ${error}`, "error");
        }
      }
    } catch (error) {
      showToast("Error", `Error occured on submission: ${error}`, "error");
    }
  };

  const getCategories = async () => {
    const response = await axiosClient.get(`/event/category`);
    const data = response?.data?.data;
    return data;
  };

  interface Category {
    _id: string;
    name: string;
  }

  const getEventCategories = async () => {
    const categories: Category[] = await getCategories();
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

  const defaultCategory = (category: Category) => {
    const defaultCategoryObject = {
      value: category._id,
      label: category.name,
    };
    return defaultCategoryObject.label;
  };

  const defaultType = (type: boolean) => {
    const defaultCategoryObject = {
      value: type ? true : false,
      label: type ? "Private" : "Public",
    };
    return defaultCategoryObject.label;
  };

  return (
    <>
      {loading ? (
        <Box display="grid" placeItems="center" height={`calc(100vh - 150px)`}>
          <Spinner />
        </Box>
      ) : (
        <>
          {/* Title */}
          <Text
            fontSize={{ sm: "4xl", base: "4xl" }}
            fontWeight="500"
            mb="28px"
          >
            Edit Event
          </Text>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
              <Stack gap={5} w="50%">
                {/* Name input */}
                <Stack w="100%" gap="1.5">
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    {...register("name")}
                    id="name"
                    placeholder="Event name"
                  />
                  {errors.name && (
                    <Text color="red">{errors.name.message}</Text>
                  )}
                </Stack>

                {/* Place input */}
                <Stack w="100%" gap="1.5">
                  <FormLabel htmlFor="place">Place</FormLabel>
                  <Input
                    {...register("place")}
                    id="place"
                    placeholder="Place of event"
                  />
                  {errors.place && (
                    <Text color="red">{errors.place.message}</Text>
                  )}
                </Stack>

                {/* Date input */}
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <DatePickerComponent
                      defaultDate={eventData?.date}
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />

                {errors.date && <Text color="red">{errors.date.message}</Text>}

                {/* Category input */}
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <ComboBoxComponent
                      {...field}
                      label="Category:"
                      placeholder="Event categories"
                      inputCollection={eventCategories}
                      defaultValue={defaultCategory(event?.category)}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  )}
                />
                {errors.category && (
                  <Text color="red">{errors.category.message}</Text>
                )}

                {/* Type input */}
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <ComboBoxComponent
                      {...field}
                      label="Type:"
                      placeholder="Event types"
                      defaultValue={defaultType(event?.private)}
                      inputCollection={eventTypes}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
                {errors.type && ( // Correctly displaying the error for "type"
                  <Text color="red">{errors.type.message}</Text>
                )}

                {/* Description input */}
                <Stack
                  h="20%"
                  w="100%"
                  gap="1.5"
                  mt={{ base: "16px", sm: "0px" }}
                >
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Input
                    {...register("description")}
                    h="80%"
                    id="description"
                    placeholder="About event"
                    py={"32px"}
                    px={"8px"}
                  />
                  {errors.description && (
                    <Text color="red">{errors.description.message}</Text>
                  )}
                </Stack>

                {/* Buttons */}
                <HStack
                  h="10%"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Button
                    size="xl"
                    bg="bg.cancel"
                    type="button"
                    cursor={"pointer"}
                    onClick={() => {
                      navigate("/my-events");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="xl">
                    <Text>
                      {isSubmitting ? (
                        <Spinner
                          colorPalette="white"
                          borderWidth="4px"
                          zIndex={1}
                        />
                      ) : (
                        "Update event"
                      )}
                    </Text>
                  </Button>
                </HStack>
              </Stack>
            </VStack>
          </form>
        </>
      )}
    </>
  );
};
