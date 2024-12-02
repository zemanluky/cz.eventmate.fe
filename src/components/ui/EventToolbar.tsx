import { Box, Flex, HStack } from "@Panda/jsx";
import { Button } from "@ParkComponents/button";
import { FormLabel } from "@ParkComponents/form-label";
import { Icon } from "@ParkComponents/icon";
import { Input } from "@ParkComponents/input";
import { Menu } from "@ParkComponents/menu";
import { Popover } from "@ParkComponents/popover";
import { Switch } from "@ParkComponents/switch";
import { Text } from "@ParkComponents/text";
import { SlidersHorizontal } from "lucide-react";

export const EventToolbar: React.FC = () => {
	return (
		<>
			<Menu.Root
				positioning={{
					placement: "bottom-start",
				}}
			>
				<Flex justifyContent={"space-between"} alignItems={"center"}>
					<Text fontSize="5xl" fontWeight="500">
						Events
					</Text>
					<Flex gap="40px" alignItems={"center"}>
						<Flex gap="8px">
							<Switch size="lg" />
							<Text fontSize="xl" lineHeight="auto" textAlign={"center"}>
								Private
							</Text>
						</Flex>

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

										<Text fontSize="18px" ml="8px">Add Filters</Text>
										<Button variant="ghost" color="bg.buttonLarge">Clear all</Button>
										</Flex>
									</Menu.ItemGroupLabel>
									<Menu.Separator />
									<Flex px="32px" my="16px" flexDirection={"column"} gap="16px">
										<FormLabel fontSize="14px">Search event name</FormLabel>
										<Input size="md" placeholder="Event name" borderRadius="16px"/>
										<Text fontWeight={500} fontSize="14px">Event Type</Text>
										<Text fontWeight={500} fontSize="14px">Rating</Text>
										<Text fontWeight={500} fontSize="14px">Location</Text>										
										<Text fontWeight={500} fontSize="14px">Date of Event</Text>
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
