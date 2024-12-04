import * as React from "react";
import { Button } from "@ParkComponents/button.tsx";
import { css } from "@Panda/css";
import { Input } from "@ParkComponents/input";
import { Text } from "@ParkComponents/text";
import { Avatar } from "@ParkComponents/avatar";
import { Box, Divider, Flex, HStack, Stack, VStack } from "@Panda/jsx";
import { FriendRequestList } from "./FriendRequestList";
import { Popover } from "@ParkComponents/popover";
import { Menu } from "@ParkComponents/menu";
import { LogOutIcon, PartyPopper, UserIcon, UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useShowToast } from "src/hooks";
import axios from "axios";
import axiosClient from "axiosClient";
import useAuthState from "src/hooks/useAuthState";

export const Navbar: React.FC = () => {
  const { user, loading, error } = useAuthState()
  const mockUserList = [
    {
      user: {
        id: "1",
        name: "John",
        surname: "Doe",
        imageUrl: "https://via.placeholder.com/40",
      },
    },
    {
      user: {
        id: "2",
        name: "Jane",
        surname: "Smith",
        imageUrl: "https://via.placeholder.com/40",
      },
    },
    {
      user: {
        id: "3",
        name: "Alice",
        surname: "Johnson",
        imageUrl: "https://via.placeholder.com/40",
      },
    },
    {
      user: {
        id: "4",
        name: "Bob",
        surname: "Brown",
        imageUrl: "https://via.placeholder.com/40",
      },
    },
  ];

  const navBarStyles = css({
    w: "100%",
    h: "100px",
    paddingX: { base: "16px", sm: "48px" },
    display: "flex",
    gap: "60px",
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
      const response = await axiosClient.delete(
        `${import.meta.env.VITE_API_KEY}/auth/logout`
      );

      // Remove the token in localStorage
      localStorage.removeItem("authToken");

      // Provide user feedback on successful logout
      showToast("Success", "Logout successful", "success");

      // update user context so content dissapears !!!
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
              <Text fontSize={"xl"}>EventMate</Text>
            </Link>
            <Input
              size="sm"
              id="name"
              placeholder="Search"
              className={inputStyles}
            />

            <Box className={flexStyles} 
            display={user ? "flex" : "none"} // comment out to see userMenu and friend requests icons
            >
              <Popover.Trigger asChild>
                <Button
                  bg="bg.buttonSmall"
                  color="fg.buttonSmall"
                  borderRadius={"full"}
                  p="0"
                >
                  <UserRoundPlus />
                </Button>
              </Popover.Trigger>

              <Menu.Trigger asChild>
                <Button variant="ghost" bg="none" borderRadius={"full"} p="0">
                  <Avatar name="John Doe" />
                </Button>
              </Menu.Trigger>
            </Box>
            {/* Sign in & sign up buttons */}
            <Flex gap="16px" alignItems={"center"} 
              display={!user ? "flex" : "none"} // comment out to see userMenu and friend requests icons
              >
              <Button variant="ghost">Sign up</Button>
              <Button >Sign in</Button>
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
                  <FriendRequestList userList={mockUserList} />
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

              <Menu.Separator />
              <Menu.Item value="logout" onClick={handleLogout}>
                <HStack gap="2">
                  <LogOutIcon />
                  Logout
                </HStack>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </>
  );
};
