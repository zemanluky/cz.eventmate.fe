import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Stack,
  VStack,
} from "@Panda/jsx";
import { Avatar } from "@ParkComponents/avatar";
import { Button } from "@ParkComponents/button";
import { Dialog } from "@ParkComponents/dialog";
import { FormLabel } from "@ParkComponents/form-label";
import { IconButton } from "@ParkComponents/icon-button";
import { Input } from "@ParkComponents/input";
import { RatingGroup } from "@ParkComponents/rating-group";
import { Text } from "@ParkComponents/text";
import { XIcon } from "lucide-react";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { z } from "zod";

interface User {
  _id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
  bio: string;
  friends: string[];
  ratings: string[];
}

// Validation schema using zod
const ratingFormSchema = z.object({
  ratingValue: z.string().nonempty("Rating is required"),
  comment: z.string().nonempty("Comment is required"),
});
type RatingFormValues = z.infer<typeof ratingFormSchema>;

export const Profile: React.FC<User> = ({ user }) => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RatingFormValues>({
    resolver: zodResolver(ratingFormSchema),
  });

  const onSubmit: SubmitHandler<RatingFormValues> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); //simulated call for isSubmitting state
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "error", //set up for backend errors
      });
    }
  };

  return (
    <Flex flexDirection={{ base: "column", sm: "row" }} alignItems="center">
      <Avatar
        h={{ base: "300px", md: "250px", sm: "200px" }}
        w={{ base: "300px", md: "250px", sm: "200px" }}
        name={`${user.name} ${user.surname}`}
      />
      {/* Spacer */}
      <Box w="20px" h="20px" />
      <Flex
        flexDirection="column"
        justifyContent={{ base: "center", sm: "flex-start" }}
        alignItems={{ base: "center", sm: "flex-start" }}
        w={{ base: "100%", md: "auto" }}
      >
        <Text fontWeight="700" fontSize="5xl">
          {user.name} {user.surname}
        </Text>
        <HStack mb="10px">
          {/* Conditional rendering if no ratings */}
          {user.ratings.length === 0 ? (
            <Flex gap={"8px"} alignItems={"center"}>
              <Text fontSize="xs" color="fg.subtle" fontWeight="500">
                No ratings yet
              </Text>
              <Divider h="20px" thickness="2px" orientation="vertical" />
              {/* add functionality */}
              <Text color="bg.buttonSmall" cursor={"pointer"}>
                Be the first one to rate this user !
              </Text>
            </Flex>
          ) : (
            <>
              <RatingGroup count={5} defaultValue={user.ratings} disabled />
              <Box w="5px" h="5px" borderRadius="full" bg="fg.subtle" />
              <Text fontSize="xs" color="fg.subtle" fontWeight="500">
                {12} events hosted
              </Text>
            </>
          )}
        </HStack>
        <HStack mb="10px">
          {/* Conditional rendering for no friends */}
          {user.friends.length === 0 ? (
            <Flex gap={"8px"} alignItems={"center"}>
              <Text fontSize="xs" color="fg.subtle" fontWeight="500">
                No friends yet
              </Text>
              <Divider h="20px" thickness="2px" orientation="vertical" />
              {/* add functionality */}
              <Text color="bg.buttonSmall" cursor={"pointer"}>
                Be the first one to send a friend request!
              </Text>
            </Flex>
          ) : (
            <>
              <Text fontSize="lg">Friends: {user.friends.length}</Text>
            </>
          )}
        </HStack>
        <Grid gridTemplateColumns="repeat(5, 1fr)" w="100%">
          <GridItem colSpan={{ base: 5, sm: 4 }}>
            <Button
              w="100%"
              h={{ base: "40px", sm: "55px" }}
              bg="bg.buttonLarge"
              color="fg.buttonLarge"
            >
              <Text fontSize={{ base: "md", md: "xl" }}>
                Send friend request
              </Text>
            </Button>
          </GridItem>

          <GridItem colSpan={{ base: 5, sm: 1 }}>
            {/* Rating modal */}
            <Dialog.Root>
              <Dialog.Trigger asChild>
                {/* Modal trigger */}
                <Button
                  w="100%"
                  h={{ base: "40px", sm: "55px" }}
                  bg="bg.buttonLarge"
                  color="fg.buttonLarge"
                >
                  <Text fontSize={{ base: "md", md: "xl" }}>Rate User</Text>
                </Button>
              </Dialog.Trigger>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  {/* Rating form */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack gap="8" p="6" w="100%">
                      <Stack gap="1" w="100%">
                        {/* Tittle */}
                        <Dialog.Title>
                          <Text textAlign="center">
                            You are rating {user.name} {user.surname}
                          </Text>
                        </Dialog.Title>
                        <Divider
                          orientation="horizontal"
                          thickness="2px"
                          mt="10px"
                          mb="10px"
                          w="100%"
                        />
                        {/* Body content */}
                        <Dialog.Description>
                          <VStack>
                            {/* Star rating */}
                            <Controller
                              control={control}
                              name="ratingValue"
                              render={({ field }) => (
                                <Box
                                  w="150px"
                                  p="5px"
                                  h="36px"
                                  rounded="full"
                                  borderWidth="2px"
                                  borderColor="grey"
                                  display="flex"
                                  justifyContent="center"
                                >
                                  <RatingGroup
                                    onChange={(ratingValue) =>
                                      field.onChange(ratingValue)
                                    }
                                  />
                                </Box>
                              )}
                            />
                            {errors.ratingValue && (
                              <Text color="red">
                                {errors.ratingValue.message}
                              </Text>
                            )}

                            {/* Comment rating */}
                            <Stack h="20%" w="100%" gap="1.5">
                              <FormLabel htmlFor="description">
                                Comment:
                              </FormLabel>
                              <Input
                                {...register("comment")}
                                h="100px"
                                id="comment"
                                placeholder={`Your comment about ${user.name}`}
                              />
                              {errors.comment && (
                                <Text color="red">
                                  {errors.comment.message}
                                </Text>
                              )}
                            </Stack>
                          </VStack>
                        </Dialog.Description>
                      </Stack>
                      {/* Buttons */}
                      <Stack gap="3" direction="row" width="full">
                        <Dialog.CloseTrigger asChild>
                          <Button variant="outline" width="full">
                            Cancel
                          </Button>
                        </Dialog.CloseTrigger>
                        {/* Submit button */}
                        <Button width="full" type="submit">
                          <Text>{isSubmitting ? "Loading..." : "Confirm"}</Text>
                        </Button>
                      </Stack>
                    </VStack>
                    <Dialog.CloseTrigger
                      asChild
                      position="absolute"
                      top="2"
                      right="2"
                    >
                      <IconButton
                        aria-label="Close Dialog"
                        variant="ghost"
                        size="sm"
                      >
                        <XIcon />
                      </IconButton>
                    </Dialog.CloseTrigger>
                  </form>
                </Dialog.Content>
              </Dialog.Positioner>
            </Dialog.Root>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};
