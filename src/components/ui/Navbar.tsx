import * as React from "react";
import { Button } from "@ParkComponents/button.tsx";
import { css } from "@Panda/css";
import { Input } from "@ParkComponents/input";
import { Text } from "@ParkComponents/text";
import { Avatar } from "@ParkComponents/avatar";
import { Box, Divider, Stack, VStack } from "@Panda/jsx";
import { Dialog } from "@ParkComponents/dialog";
import { FriendRequestList } from "./FriendRequestList";

export const Navbar: React.FC = () => {
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

  return (
    <>
      <Dialog.Root>
        <Box className={navBarStyles}>
          <Text fontSize={"xl"}>EventMate</Text>
          <Input
            size="sm"
            id="name"
            placeholder="Search"
            className={inputStyles}
          />

          <Box className={flexStyles}>
            <Dialog.Trigger asChild>
              <Button
                bg="bg.buttonSmall"
                color="fg.buttonSmall"
                borderRadius={"full"}
              >
                F
              </Button>
            </Dialog.Trigger>

            <Button variant="ghost" bg="none" borderRadius={"full"} p="0">
              <Avatar name="John Doe" />
            </Button>
          </Box>
        </Box>

        {/*Friend request modal */}
        <Dialog.Positioner>
          <Dialog.Content p="30px" w="550px" h="650">
            <Stack>
              <Dialog.Title>Friend requests</Dialog.Title>
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
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  );
};
