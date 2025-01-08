import * as React from "react";
import { Button } from "@ParkComponents/button.tsx";
import { css } from "@Panda/css";
import { Input } from "@ParkComponents/input";
import { Text } from "@ParkComponents/text";
import { Avatar } from "@ParkComponents/avatar";
import { Box, Divider, Flex, HStack, Spacer, Stack, VStack } from "@Panda/jsx";
import { FriendRequestList } from "./FriendRequestList";
import { Popover } from "@ParkComponents/popover";
import { Menu } from "@ParkComponents/menu";
import {
  Calendar,
  LogOutIcon,
  PartyPopper,
  UserIcon,
  UserRoundPlus,
  XIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useShowToast } from "src/hooks";
import axios from "axios";
import axiosClient from "axiosClient";
import useAuthState from "src/hooks/useAuthState";
import useAuthStore from "src/store/authStore";
import useGetFriendRequests from "src/hooks/useGetFriendRequests";
import { Spinner } from "@ParkComponents/spinner";
import "../layout/Logo.css";
import { Dialog } from "@ParkComponents/dialog";
import { IconButton } from "@ParkComponents/icon-button";

export const Navbar: React.FC = () => {
  interface FriendRequest {
    _id: string;
    sender: User;
    receiver: string;
    createdAt: string;
    state: string;
    __v: number;
  }

  interface User {
    _id: string;
    name: string;
    surname: string;
    email: string;
    username: string;
    bio: string | null;
    profile_picture_path: string | null;
    friends: string[];
    ratings: string[];
    __v: number;
  }

  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const logoutUser = useAuthStore((state) => state.logout);
  const { friendRequests, loading, error } = useGetFriendRequests();
  const [friendRequestList, setFriendRequestList] = React.useState<
    FriendRequest[] | null
  >(null);

  const navBarStyles = css({
    w: "100%",
    h: "100px",
    paddingX: { base: "16px", sm: "48px" },
    display: "flex",
    gap: { base: "32px", sm: "60px" },
    alignItems: "center",
    bg: "bg.navbar",
    boxShadow: "0px 4px 1px 0px var(--colors-neutrals-olive-3, #EFF1EF)",
  });

  const inputStyles = css({
    width: "100%",
    border: "1px solid #EFF1EF",
    color: "card",
  });

  const flexStyles = css({
    display: "flex",
    alignItems: "center",
    gap: "20px",
  });

  const showToast = useShowToast();

  // logout
  const handleLogout = async () => {
    try {
      // Send the logout request
      await axiosClient.delete(`/auth/logout`);

      // Remove the token in localStorage
      localStorage.removeItem("authToken");

      // Logout user is state and localStorage
      logoutUser();

      // Provide user feedback on successful logout
      showToast("Success", "Logout successful", "success");
      navigate("/");
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
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState("");

  const handleGetUsers = async (searchParameters: string) => {
    if (isLoading) return; // Don't fetch if already loading

    setIsLoading(true); // Set loading state
    setUsers([]);

    try {
      const response = await axiosClient.get(`/user/`, {
        params: { search: searchParameters },
      });

      const fetchedUsers = response.data?.data;

      setUsers(fetchedUsers);

      console.log(users);
      console.log(isOpen);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    setFriendRequestList(friendRequests);
  }, [friendRequests]);

  return (
    <>
      <Menu.Root>
        <Popover.Root
          positioning={{
            placement: "bottom-start",
          }}
        >
          <Box className={navBarStyles}>
            <Link to="/">
              <Text fontSize={"5xl"} className="coolLogo">
                EventM8
              </Text>
            </Link>

            <Input
              size="sm"
              id="name"
              placeholder="Search user"
              className={inputStyles}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleGetUsers(searchInput);
                  setIsOpen(true);
                }
              }}
            />

            <Dialog.Root open={isOpen}>
              <Dialog.Positioner>
                <Dialog.Content
                  style={{
                    maxHeight: "500px",
                    overflowY: "auto",
                  }}
                >
                  <Stack gap="8" p="6">
                    <Stack gap="1">
                      <HStack>
                        <Dialog.Title>Search:</Dialog.Title>
                        <Spacer />
                        <IconButton
                          aria-label="Close Dialog"
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsOpen(false)}
                        >
                          <XIcon />
                        </IconButton>
                      </HStack>
                      {isLoading ? (
                        <Spinner />
                      ) : (
                        <VStack gap="16px" mt="16px">
                          {/* Displaying attendees List */}
                          {users?.map((user) => (
                            <Flex
                              key={user._id}
                              alignItems={"center"}
                              justifyContent={"space-between"}
                              gap="8px"
                              width="100%"
                            >
                              <Link
                                to={`/profile/${user._id}`}
                                onClick={() => setIsOpen(false)}
                              >
                                <Flex alignItems={"center"} gap={4}>
                                  <Avatar
                                    name={`${user.name} ${user.surname}`}
                                    size="sm"
                                  />
                                  <Text>{`${user.name} ${user.surname}`}</Text>
                                </Flex>
                              </Link>
                            </Flex>
                          ))}
                        </VStack>
                      )}
                    </Stack>
                  </Stack>
                </Dialog.Content>
              </Dialog.Positioner>
            </Dialog.Root>

            <Box
              className={flexStyles}
              display={authUser ? "flex" : "none"} // comment out to see userMenu and friend requests icons
            >
              {!loading && (
                <Popover.Trigger asChild>
                  <Box position="relative" display="inline-block">
                    {friendRequestList?.length > 0 && (
                      <Box
                        position="absolute"
                        top="2px"
                        left="1px"
                        width="8px"
                        height="8px"
                        bgColor="#FF474D"
                        borderRadius="full"
                        zIndex="1"
                        opacity={0.8}
                      />
                    )}
                    <Button
                      bg="bg.buttonSmall"
                      color="fg.buttonSmall"
                      borderRadius="full"
                      p="0"
                    >
                      <UserRoundPlus />
                    </Button>
                  </Box>
                </Popover.Trigger>
              )}

              <Menu.Trigger asChild>
                <Button variant="ghost" bg="none" borderRadius={"full"} p="0">
                  <Avatar
                    name={`${authUser?.name}` + " " + `${authUser?.surname} `}
                  />
                </Button>
              </Menu.Trigger>
            </Box>
            {/* Sign in & sign up buttons */}
            <Flex
              gap="16px"
              alignItems={"center"}
              display={!authUser ? "flex" : "none"} // comment out to see userMenu and friend requests icons
            >
              <Button
                variant="ghost"
                onClick={() => {
                  navigate("/auth#register");
                }}
              >
                Sign up
              </Button>
              <Button
                onClick={() => {
                  navigate("/auth#login");
                }}
              >
                Sign in
              </Button>
            </Flex>
          </Box>

          {/*Friend request modal */}
          <Popover.Positioner>
            <Popover.Content p="30px" w="550px" maxH="650px">
              <Stack>
                <Popover.Title>Friend requests</Popover.Title>
                <VStack>
                  <Divider
                    orientation="horizontal"
                    thickness="3px"
                    w="100%"
                    color="grey.200"
                    borderRadius={2}
                  />
                  <>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <FriendRequestList requestsData={friendRequests} />
                    )}
                  </>
                </VStack>
              </Stack>
            </Popover.Content>
          </Popover.Positioner>
        </Popover.Root>
        {/* Profile menu */}
        <Menu.Positioner>
          <Menu.Content>
            <Menu.ItemGroup>
              <Menu.ItemGroupLabel>My Account</Menu.ItemGroupLabel>
              <Menu.Separator />

              <Link to="/my-profile">
                <Menu.Item value="myProfile">
                  <HStack gap="2">
                    <UserIcon />
                    My Profile
                  </HStack>
                </Menu.Item>
              </Link>

              <Link to="/my-events">
                <Menu.Item value="myEvents">
                  <HStack gap="2">
                    <PartyPopper />
                    My Events
                  </HStack>
                </Menu.Item>
              </Link>

              <Link to="/calendar">
                <Menu.Item value="calendar">
                  <HStack gap="2">
                    <Calendar />
                    Calendar
                  </HStack>
                </Menu.Item>
              </Link>

              <Menu.Separator />
              <Menu.Item value="logout" onClick={handleLogout}>
                <HStack gap="2">
                  <LogOutIcon />
                  Log out
                </HStack>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </>
  );
};
