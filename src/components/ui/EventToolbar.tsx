import { Box, Flex } from "@Panda/jsx";
import { Button } from "@ParkComponents/button";
import { FormLabel } from "@ParkComponents/form-label";
import { Icon } from "@ParkComponents/icon";
import { Input } from "@ParkComponents/input";
import { Menu } from "@ParkComponents/menu";
import { Switch } from "@ParkComponents/switch";
import { Text } from "@ParkComponents/text";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export const EventToolbar: React.FC = () => {
  const [showEvents, setShowEvents] = useState(true);
  return (
    <>
      <Menu.Root
        positioning={{
          placement: "bottom-start",
        }}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize={{sm:"5xl", base:"4xl"}} fontWeight="500">
            Events
          </Text>
          <Flex gap={{sm:"40px", base:"16px"}} alignItems={"center"}>
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
                      <Button variant="ghost" color="bg.buttonLarge">
                        Clear all
                      </Button>
                    </Flex>
                  </Menu.ItemGroupLabel>
                  <Menu.Separator />
                  <Flex px="32px" my="16px" flexDirection={"column"} gap="16px">
                    <FormLabel fontSize="14px">Search event name</FormLabel>
                    <Input
                      size="md"
                      placeholder="Event name"
                      borderRadius="16px"
                    />
                    <Text fontWeight={500} fontSize="14px">
                      Event Type
                    </Text>
                    <Text fontWeight={500} fontSize="14px">
                      Rating
                    </Text>
                    <Text fontWeight={500} fontSize="14px">
                      Location
                    </Text>
                    <Text fontWeight={500} fontSize="14px">
                      Date of Event
                    </Text>
                  </Flex>
                  <Menu.Separator />

                  <Button m={"auto"} w="225px">
                    Apply filters
                  </Button>
                </Menu.ItemGroup>
              </Menu.Content>
            </Menu.Positioner>
          </Flex>
        </Flex>
      </Menu.Root>
    </>
  );
};
