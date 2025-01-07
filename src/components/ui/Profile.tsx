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
import axiosClient from "axiosClient";
import { useShowToast } from "src/hooks";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Spinner } from "@ParkComponents/spinner";
import useAuthStore from "src/store/authStore";
import { useDialog } from "@ark-ui/react";

interface User {
  user: {
    _id: string;
    name: string;
    surname: string;
    email: string;
    username: string;
    bio: string;
    friends: string[];
    ratings: string[];
  };
}

// Validation schema using zod
const ratingFormSchema = z.object({
  ratingValue: z.string().nonempty("Rating is required"),
  comment: z.string().nonempty("Comment is required"),
});
type RatingFormValues = z.infer<typeof ratingFormSchema>;

export const Profile: React.FC<User> = ({ user }) => {
  const params = useParams();
  const userId = params.userId as string;
  const authUser = useAuthStore((state) => state.user); // Getting the authenticated user from global state
  const showToast = useShowToast();
  const [ratings, setRatings] = React.useState<any[]>([]); // State to store ratings
  const [isFetchingRatings, setIsFetchingRatings] = React.useState(false); // State to track loading
  const [averageRating, setAverageRating] = React.useState<number>(0);
  const [isCalculating, setIsCalculating] = React.useState<boolean>(false);
  const [isAlreadyFriend, setIsAlreadyFriend] = React.useState<boolean>(false);
  const dialog = useDialog() // dialog control
  const [isFriendRequestSent, setIsFriendRequestSent] = React.useState<boolean>(false);

  const calculateAverageRating = React.useCallback(() => {
    if (ratings.length === 0) {
      setAverageRating(0);
    } else {
      const totalStars = ratings.reduce(
        (sum, review) => sum + review.starRating,
        0
      );
      setAverageRating(totalStars / ratings.length);
    }
    setIsCalculating(false);
  }, [ratings]);

  React.useEffect(() => {
    const fetchRatingsAndCalculate = async () => {
      setIsCalculating(true);
      try {
        const response = await axiosClient.get(`/user/${userId}/rating`);
        setRatings(response.data?.data || []);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showToast(
            "Error",
            error.response?.data?.message || error.message,
            "error"
          );
        } else {
          showToast("Unexpected Error", "Please try again later", "error");
        }
      }
    };

    fetchRatingsAndCalculate();
  }, [userId]); // Fetch ratings when `userId` changes

  React.useEffect(() => {
    calculateAverageRating();
  }, [ratings, calculateAverageRating]); // Recalculate average when `ratings` changes
  React.useEffect(() => {
    user?.friends?.forEach((friendId) => {
      if (friendId === authUser?._id) {
        setIsAlreadyFriend(true);
        console.log("hit");
        return;
      }
    });
  }, [user]);

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
      const formData = {
        starRating: Number(data?.ratingValue),
        comment: data?.comment,
      };
      try {
        const response = await axiosClient.post(
          `/user/${user._id}/rating`,
          formData
        );
        console.log(formData);
        // success messages
        showToast("Success", "Rating submitted successfully", "success");
      } catch (error) {
        // Check for server errors or network issues
        if (axios.isAxiosError(error)) {
          showToast(
            "Error",
            error.response?.data?.message || error.message,
            "error"
          );
        } else {
          showToast("Unexpected Error", "Please try again later", "error");
        }
      }
      console.log(formData);
    } catch (error) {
      setError("root", {
        message: "error", //set up for backend errors
      });
    }finally {
      //todo
      dialog().setOpen(false)
    }
  };

  const handleSendFriendRequest = async (receiverId: string) => {
    try {
      const body = { receiver: receiverId };
      const response = await axiosClient.post(`/user/friend-request/`, body);
      if (response.status === 204) {
        showToast("Success", "Friend Request Sent", "success");
      }
      console.log(response)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(
          "Error",
          error.response?.data?.message || error.message,
          "error"
        );
      } else {
        showToast("Unexpected Error", "Please try again later", "error");
      }
    }finally{
      setIsFriendRequestSent(true)
    }
  };

  const handleCancelFriendRequest = async (requestId: string) => {
    try {
      const response = await axiosClient.delete(`/user/friend-request/${requestId}`);
      if (response.status === 204) {
        showToast("Success", "Friend Request cancelled", "success");
      }
      console.log(response)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast(
          "Error",
          error.response?.data?.message || error.message,
          "error"
        );
      } else {
        showToast("Unexpected Error", "Please try again later", "error");
      }
    }finally{
      setIsFriendRequestSent(false)
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
              {isCalculating ? (
                <>
                  <Spinner size="sm" />
                </>
              ) : (
                <Flex alignItems={"center"} gap="8px">
                  <RatingGroup count={5} value={averageRating} disabled />
                  <Box w="5px" h="5px" borderRadius="full" bg="fg.subtle" />
                  <Text fontSize="xs" color="fg.subtle" fontWeight="500">
                    {ratings?.length} rating{ratings?.length > 1 ? "s" : ""}
                  </Text>
                </Flex>
              )}
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
          {!isAlreadyFriend && (
            <GridItem colSpan={{ base: 5, sm: 4 }}>
              <Button
                w="100%"
                h={{ base: "40px", sm: "55px" }}
                bg="bg.buttonLarge"
                color="fg.buttonLarge"
                onClick={() => {
                  if (isFriendRequestSent) {
                    handleCancelFriendRequest("id"); // be functionality missing that't why this is mock id string
                  } else {
                    handleSendFriendRequest(user._id);
                  }
                }}
              >
                <Text fontSize={{ base: "md", md: "xl" }}>
                {isFriendRequestSent ? "Cancel friend request" : "Send friend request"}
                </Text>
              </Button>
            </GridItem>
          )}

          <GridItem colSpan={{ base: 5, sm: 1 }}>
            {/* Rating modal */}
            <Dialog.RootProvider value={dialog}>
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
            </Dialog.RootProvider>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
};
