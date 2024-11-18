import { Flex, HStack, Stack } from "@Panda/jsx";
import { Button } from "@ParkComponents/button";
import { FormLabel } from "@ParkComponents/form-label";
import { IconButton } from "@ParkComponents/icon-button";
import { Input } from "@ParkComponents/input";
import { Text } from "@ParkComponents/text";
import * as React from "react";
import { Form } from "react-router-dom";
import { FileUpload } from "@ParkComponents/file-upload";
import { DatePickerComponent } from "./DatePickerComponent";
import { Trash2Icon } from "lucide-react";
import { ComboBoxComponent } from "./ComboBoxComponent";

interface EventFormValues {
  name: string;
  place: string;
  address: string;
  description: string;
  category: string;
  type: string;
  date: Date | null;
}

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
  { label: "Public", value: "public" },
  { label: "Private", value: "private" },
];

export const CreateEventForm: React.FC = () => {
  const [formValues, setFormValues] = React.useState<EventFormValues>({
    name: "",
    place: "",
    address: "",
    description: "",
    category: "",
    type: "",
    date: null,
  });
  const [files, setFiles] = React.useState<File[]>([]);

  const isFormValid =
    formValues.name.trim() &&
    formValues.place.trim() &&
    formValues.address.trim() &&
    formValues.description.trim() &&
    formValues.category &&
    formValues.type &&
    formValues.date;

  const handleChange = <T extends keyof EventFormValues>(
    field: T,
    value: EventFormValues[T]
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submitted Data:", {
      ...formValues,
      files,
    });
  };

  return (
    <>
      <Text>Create Event</Text>

      <Form onSubmit={handleSubmit}>
        <Flex
          direction={{ base: "column", md: "row" }}
          h={{ base: "auto", md: "80vh" }}
          pb={{ base: "none", md: "30px" }}
        >
          <Flex
            direction="column"
            justifyContent="space-between"
            h={{ base: "auto", md: "100%" }}
            w={{ base: "100%", md: "48%" }}
            mr={{ base: "none", md: "2%" }}
          >
            <Stack w="100%" gap="1.5">
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                placeholder="Event name"
                value={formValues.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </Stack>

            <Stack w="100%" gap="1.5">
              <FormLabel htmlFor="place">Place</FormLabel>
              <Input
                id="place"
                placeholder="Place of event"
                value={formValues.place}
                onChange={(e) => handleChange("place", e.target.value)}
              />
            </Stack>

            <Stack w="100%" gap="1.5">
              <FormLabel htmlFor="address">Address</FormLabel>
              <Input
                id="address"
                placeholder="Address of event"
                value={formValues.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </Stack>

            <DatePickerComponent
              onChange={(date: Date) => handleChange("date", date)}
            />

            <ComboBoxComponent
              key="category"
              inputCollection={eventCategories}
              onChange={(value: string) => handleChange("category", value)}
            />

            <ComboBoxComponent
              key="type"
              inputCollection={eventTypes}
              onChange={(value: string) => handleChange("type", value)}
            />
          </Flex>

          <Stack
            h={{ base: "1000px", md: "80vh" }}
            w={{ base: "100%", md: "48%" }}
            ml={{ base: "none", md: "2%" }}
          >
            <Stack h="20%" w="100%" gap="1.5">
              <FormLabel htmlFor="description">Description</FormLabel>
              <Input
                h="80%"
                id="description"
                placeholder="About event"
                value={formValues.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </Stack>
            <Stack>
              <FormLabel htmlFor="eventPhotos">Event photos</FormLabel>
              <FileUpload.Root
                maxFiles={3}
                onFileChange={(details) => {
                  const acceptedFiles = details.acceptedFiles;
                  setFiles(acceptedFiles);
                }}
              >
                <FileUpload.Dropzone>
                  <FileUpload.Label>Drop your files here</FileUpload.Label>
                  <FileUpload.Trigger asChild>
                    <Button size="sm">Open Dialog</Button>
                  </FileUpload.Trigger>
                </FileUpload.Dropzone>
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
            <HStack h="10%" pl="40%" justifyContent="space-between">
              <Button size="xl" bg="bg.cancel" type="button">
                <Text>Cancel</Text>
              </Button>
              <Button type="submit" size="xl" /*disabled={!isFormValid}*/>
                <Text>Create</Text>
              </Button>
            </HStack>
          </Stack>
        </Flex>
      </Form>
    </>
  );
};
