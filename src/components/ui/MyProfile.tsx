import { Box, Divider, Flex, HStack, Stack, VStack } from "@Panda/jsx";
import { Avatar } from "@ParkComponents/avatar";
import { Button } from "@ParkComponents/button";
import { Dialog } from "@ParkComponents/dialog";
import { FormLabel } from "@ParkComponents/form-label";
import { IconButton } from "@ParkComponents/icon-button";
import { Input } from "@ParkComponents/input";
import { RatingGroup } from "@ParkComponents/rating-group";
import { Spinner } from "@ParkComponents/spinner";
import { Text } from "@ParkComponents/text";
import axios from "axios";
import axiosClient from "axiosClient";
import { Settings, Star, XIcon } from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { useShowToast } from "src/hooks";
import useAuthState from "src/hooks/useAuthState";
import useGetEventById from "src/hooks/useGetEventById";
import useGetUserById from "src/hooks/useGetUserById";
import useGetUsersByIds from "src/hooks/useGetUsersByIds";
import useAuthStore from "src/store/authStore";
import useUserProfileStore from "src/store/userProfileStore";

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

export const MyProfile: React.FC<User> = ({ user }) => {
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
  const { fetchUsers, users, loading, error } = useGetUsersByIds();
  const { fetchUserProfile } = useAuthState();

  React.useEffect(() => {
    if (user?.friends?.length > 0) {
      fetchUsers(user.friends);
    }
  }, [user.friends]);

  const showToast = useShowToast();

  const [isOpen, setIsOpen] = React.useState(false);

  const [inputs, setInputs] = React.useState({
    name: user.name || "",
    surname: user.surname || "",
    username: user.username || "",
    bio: user.bio || "",
  });

  const usernameRegex = /^[a-zA-Z0-9_-]{5,}$/;

  const validateUserName = (username: string) => {
    const isValid = usernameRegex.test(username);
    if (!isValid) {
      showToast(
        "Warning",
        "Username must be at least 5 characters long",
        "alert"
      );
      return false;
    }
    return true;
  };

  const nameRegex = /^[A-Z][a-zA-Z]*$/;

  const validateName = (name: string) => {
    const isValid = nameRegex.test(name);
    if (!isValid) {
      showToast(
        "Warning",
        "Name must start with an uppercase letter and can't include numbers",
        "alert"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const validUserName = validateUserName(inputs.username);
    const validSurname = validateName(inputs.surname);
    const validName = validateName(inputs.name);

    if (validUserName || validName || validSurname) {
      // prepare data for submission
      const formData = { ...inputs };

      try {
        const response = await axiosClient.put(
          `${import.meta.env.VITE_BASE_API_URL}/user/profile`,
          formData
        );

        //updating global state
        setAuthUser(response.data?.data);
        setUserProfile(response.data?.data);

        showToast("Success", "Profile update successful!", "success");

        setTimeout(() => {
          setIsOpen(false);
        }, 1000);
      } catch (error) {
        // Check for server errors or network issues
        if (axios.isAxiosError(error)) {
          console.error("Error:", error.response?.data || error.message);
          showToast(
            "Error",
            `Profile update failed: ${error.response?.data?.message || error.message}`,
            "error"
          );
        } else {
          console.error("Unexpected error:", error);
          showToast(
            "Error",
            "An unexpected error occurred. Please try again later.",
            "error"
          );
        }
      }
    }
  };

  const handleRemoveFriend = async(friendId)=>{
    try {
      
      const response = await axiosClient.delete(
        `${import.meta.env.VITE_BASE_API_URL}/user/friend/${friendId}`,
      );
      if(response.status === 204){
        // Fetch the user profile and store it directly
        const userData = await fetchUserProfile();
        if (userData) {
          // setting user-info for updating the friend count
          localStorage.setItem("user-info", JSON.stringify(userData?.data));
          // updating global state
          setAuthUser(userData?.data);
          setUserProfile(userData?.data);
        showToast("Success", "Removed friend", "success")
      }
    }
    } catch (error) {
      // Check for server errors or network issues
      if (axios.isAxiosError(error)) {
        console.error("Error:", error.response?.data || error.message);
        showToast(
          "Error",
          `Friend removal failed: ${error.response?.data?.message || error.message}`,
          "error"
        );
      } else {
        console.error("Unexpected error:", error);
        showToast(
          "Error",
          "An unexpected error occurred. Please try again later.",
          "error"
        );
      }
    }

  }

  return (
    <>
      {/* Avatar */}
      <Flex flexDirection={{ base: "column", sm: "row" }} alignItems="center">
        <Avatar
          h={{ base: "300px", md: "250px", sm: "200px" }}
          w={{ base: "300px", md: "250px", sm: "200px" }}
          name={`${user.name} ${user.surname}`}
        />

        {/* Spacer */}
        <Box w="20px" h="20px" />

        {/* User info */}
        <Flex
          flexDirection="column"
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={{ base: "center", sm: "flex-start" }}
          w="100%"
          gap="8px"
        >
          {/* User name */}
          <Text fontWeight="700" fontSize="5xl">
            {user.name} {user.surname}
          </Text>

          {/* Conditional rendering if no ratings */}
          {user.ratings?.length === 0 ? (
            <Flex gap={"8px"} alignItems={"center"}>
              <Text fontSize="xs" color="fg.subtle" fontWeight="500">
                You don't have any ratings yet
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

          {/* Friends*/}
          <HStack mb="10px">
            {/* Conditional rendering for no friends */}
            {user.friends?.length < 1 ? (
              <Flex gap={"8px"} alignItems={"center"}>
                <Text fontSize="xs" color="fg.subtle" fontWeight="500">
                  You don't have any friends yet
                </Text>
              </Flex>
            ) : (
              <>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Text fontSize="md" fontWeight={700} cursor={"pointer"}>
                      Friends: {user.friends?.length}
                    </Text>
                  </Dialog.Trigger>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Stack gap="8" p="6">
                        <Stack gap="1">
                          <Dialog.Title>Friend List</Dialog.Title>
                          <VStack gap="16px" mt="16px">
                            {/* Displaying Friend List */}
                            {loading && <Spinner/>}
                            {error && <Text>Error: {error}</Text>}
                            {!loading &&
                              !error &&
                              users.map((friend) => (
                                <Flex
                                  key={friend._id}
                                  alignItems={"center"}
                                  justifyContent={"space-between"}
                                  gap="8px"
                                  width="100%"
                                >
                                  <Link to={`/profile/${friend._id}`}>
                                    <Flex alignItems={"center"} gap={4}>
                                      <Avatar
                                        name={`${friend.name} ${friend.surname}`}
                                        size="sm"
                                      />
                                      <Text>{`${friend.name} ${friend.surname}`}</Text>
                                    </Flex>
                                  </Link>
                                  <Button onClick={() =>{handleRemoveFriend(friend._id)}}>Remove Friend</Button>
                                </Flex>
                              ))}
                          </VStack>
                        </Stack>
                        <Stack gap="3" direction="row" width="full">
                          <Dialog.CloseTrigger asChild>
                            <Button variant="outline" width="full">
                              Close
                            </Button>
                          </Dialog.CloseTrigger>
                        </Stack>
                      </Stack>
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
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Dialog.Root>
              </>
            )}
          </HStack>
        </Flex>
        <Stack>
          {/* Rating */}
          <HStack>
            {user.ratings?.length > 0 ? (
              <>
                <Text fontSize={60} fontWeight={650}>
                  {user.ratings?.length}
                </Text>
                <Star size={60} />
              </>
            ) : (
              <>
                <Text
                  fontSize={24}
                  fontWeight={600}
                  width="190px"
                  textAlign={{ base: "center", sm: "end" }}
                  color={"fg.subtle"}
                >
                  No ratings yet
                </Text>
              </>
            )}
          </HStack>

          <Dialog.Root open={isOpen}>
            <Dialog.Trigger asChild>
              {/* Button for triggering edit profile dialog*/}
              <Button
                px={"16px"}
                maxHeight={"150px"}
                maxWidth={"220px"}
                minWidth={"150px"}
                ml={{ base: "", sm: "auto" }}
                onClick={() => setIsOpen(!isOpen)}
              >
                <Flex gap={"8px"} alignItems={"center"}>
                  <Text>Edit profile</Text>

                  {/* size nefunguje */}
                  <Settings size={40} />
                </Flex>
              </Button>
            </Dialog.Trigger>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Stack gap="8" p="6">
                  <Stack gap="1">
                    <Dialog.Title>Edit profile</Dialog.Title>
                  </Stack>
                  <VStack alignItems={"start"}>
                    <FormLabel>First name</FormLabel>
                    <Input
                      value={inputs.name}
                      onChange={(e) =>
                        setInputs({ ...inputs, name: e.target.value })
                      }
                    />

                    <FormLabel>Last name</FormLabel>
                    <Input
                      value={inputs.surname}
                      onChange={(e) =>
                        setInputs({ ...inputs, surname: e.target.value })
                      }
                    />

                    <FormLabel>Username</FormLabel>
                    <Input
                      value={inputs.username}
                      onChange={(e) =>
                        setInputs({ ...inputs, username: e.target.value })
                      }
                    />

                    <FormLabel>Bio</FormLabel>
                    <Input
                      value={inputs.bio}
                      onChange={(e) =>
                        setInputs({ ...inputs, bio: e.target.value })
                      }
                    />
                  </VStack>
                  <Stack gap="3" direction="row" width="full">
                    <Dialog.CloseTrigger asChild>
                      <Button
                        variant="outline"
                        width="full"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        Cancel
                      </Button>
                    </Dialog.CloseTrigger>
                    <Button
                      width="full"
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      Submit
                    </Button>
                  </Stack>
                </Stack>
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
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <XIcon />
                  </IconButton>
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Root>
        </Stack>
      </Flex>
    </>
  );
};
