import { Box, Flex, HStack, Stack } from "@Panda/jsx";
import { Button } from "@ParkComponents/button";
import { FormLabel } from "@ParkComponents/form-label";
import { IconButton } from "@ParkComponents/icon-button";
import { Input } from "@ParkComponents/input";
import { Text } from "@ParkComponents/text";
import * as React from "react";
import { FileUpload } from "@ParkComponents/file-upload";
import { DatePickerComponent } from "./DatePickerComponent";
import { Trash2Icon } from "lucide-react";
import { ComboBoxComponent } from "./ComboBoxComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "@ParkComponents/spinner";
import { useShowToast } from "src/hooks";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "axiosClient";
import axios from "axios";
import useGetEventById from "src/hooks/useGetEventById";

//handleLoad(eventId) => {return handleGetEventData(eventId)};

//const eventCategories = handleGetCategories()
const eventCategories = [
  { label: "Workshops", value: "workshops" },
  { label: "Conferences", value: "conferences" },
  { label: "Webinars", value: "webinars" },
  { label: "Meetups", value: "meetups" },
  { label: "Hackathons", value: "hackathons" },
  { label: "Networking Events", value: "networking" },
  { label: "Seminars", value: "seminars" },
  { label: "Trade Shows", value: "trade_shows" },
  { label: "Product Launches", value: "product_launches" },
  { label: "Charity Events", value: "charity" },
];
const eventTypes = [
  { label: "Public", value: false },
  { label: "Private", value: true },
];

// Validation schema using zod
const eventFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  place: z.string().nonempty("Place is required"),
  address: z.string().nonempty("Address is required"),
  description: z.string().nonempty("Description is required"),
  category: z.string().nonempty("Category is required"),
  type: z.boolean(),
  date: z.date(),
});
type EventFormValues = z.infer<typeof eventFormSchema>;

interface EditEventFormProps {
  eventToEditId: string;
}

export const EditEventForm: React.FC<EditEventFormProps> = ({
  eventToEditId,
}) => {
  // Getting event by id
  const { event, loading, error } = useGetEventById(eventToEditId);

  //const eventData = handleLoad(eventToEditId);
  const mockEvent = {
    address: "Holešovice",
    category: "meetups",
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

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
    reset, // Import the reset function
  } = useForm<EventFormValues>({
    defaultValues: {
      name: "",
      place: "",
      address: "",
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
        address: "Holešovice",
        category: "meetups",
        date: new Date(event?.date), // new Date if important for ISO 8601 format
        description: event?.description,
        name: event?.name,
        place: event?.location,
        type: event?.private ? true : false,
      };
      reset(eventData); // Dynamically update form values
    }
  }, [event, reset]);

  const isoParser = (date) => {
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
      console.log(data, files);
      const formData = {
        name: data.name,
        description: data.description,
        location: data.place,
        private: data.type ? true : false,
        date: isoParser(data.date),
      };

      try {
        const response = await axiosClient.put(
          `${import.meta.env.VITE_API_KEY}/event/${eventToEditId}`,
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

  return (
    <>
      {loading ? (
        <Box display="grid" placeItems="center" height={`calc(100vh - 150px)`}>
          <Spinner />
        </Box>
      ) : (
        <>
          {/* Title */}
          <Text fontSize={{ sm: "4xl", base: "4xl" }} fontWeight="500" mb="28px">
            Edit Event
          </Text>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
              direction={{ base: "column", md: "row" }}
              pb={{ base: "none", md: "30px" }}
            >
              {/* Left part of form */}
              <Flex
                direction="column"
                justifyContent="space-between"
                w={{ base: "100%", md: "48%" }}
                mr={{ base: "none", md: "2%" }}
                gap={{base : "16px", sm:"0px"}}
              >
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

                {/* Address input */}
                <Stack w="100%" gap="1.5">
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <Input
                    {...register("address")}
                    id="address"
                    placeholder="Address of event"
                  />
                  {errors.address && (
                    <Text color="red">{errors.address.message}</Text>
                  )}
                </Stack>

                {/* Date input */}
                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <DatePickerComponent
                      defaultDate={eventData.date}
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
                      defaultValue={eventData?.category}
                      onChange={(value) => field.onChange(value)}
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
                      inputCollection={eventTypes}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
                {errors.type && ( // Correctly displaying the error for "type"
                  <Text color="red">{errors.type.message}</Text>
                )}
              </Flex>

              {/* Right part of form */}
              <Stack
                w={{ base: "100%", md: "48%" }}
                ml={{ base: "none", md: "2%" }}
                pb="32px"
                gap="16x"
              >
                {/* Description input */}
                <Stack h="20%" w="100%" gap="1.5" mt={{base:"16px", sm:"0px"}}>
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

                {/* Image input */}
                <Stack>
                  {/* Label */}
                  <FormLabel htmlFor="eventPhotos">Event photos</FormLabel>
                  <FileUpload.Root
                    maxFiles={3}
                    onFileChange={(details) => {
                      const acceptedFiles = details.acceptedFiles;
                      setFiles(acceptedFiles);
                    }}
                    maxHeight={"256px"}
                  >
                    {/* Image dropzone */}
                    <FileUpload.Dropzone>
                      <FileUpload.Label>Drop your files here</FileUpload.Label>
                      <FileUpload.Trigger asChild>
                        <Button size="sm">Open Dialog</Button>
                      </FileUpload.Trigger>
                    </FileUpload.Dropzone>
                    {/* Submitted images */}
                    <FileUpload.ItemGroup>
                      <FileUpload.Context>
                        {({ acceptedFiles }: { acceptedFiles: File[] }) =>
                          acceptedFiles.map((file, id) => (
                            <FileUpload.Item key={id} file={file}>
                              <FileUpload.ItemPreview type="image/*">
                                <FileUpload.ItemPreviewImage />
                              </FileUpload.ItemPreview>
                              <FileUpload.ItemName />
                              <FileUpload.ItemSizeText />
                              <FileUpload.ItemDeleteTrigger asChild>
                                <IconButton variant="link" size="sm">
                                  <Trash2Icon />
                                </IconButton>
                              </FileUpload.ItemDeleteTrigger>
                            </FileUpload.Item>
                          ))
                        }
                      </FileUpload.Context>
                    </FileUpload.ItemGroup>
                    <FileUpload.HiddenInput />
                  </FileUpload.Root>
                </Stack>

                {/* Buttons */}
                <HStack
                  h="10%"
                  alignItems="center"
                  justifyContent="space-between"
                  mt="80px"
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
            </Flex>
          </form>
        </>
      )}
    </>
  );
};
