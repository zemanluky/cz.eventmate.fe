import { Box, Flex, HStack } from "@Panda/jsx"
import { Button } from "@ParkComponents/button"
import { Icon } from "@ParkComponents/icon"
import { Menu } from "@ParkComponents/menu"
import { Switch } from "@ParkComponents/switch"
import { Text } from "@ParkComponents/text"
import { SlidersHorizontal } from 'lucide-react';

export const EventToolbar: React.FC = () => {
    return(
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text fontSize="5xl" fontWeight="500">Events</Text>
            <Flex gap="40px" alignItems={"center"}>
                <Flex gap="8px">
                    <Switch size="lg"/><Text fontSize="xl" lineHeight="auto" textAlign={"center"}>Private</Text>
                </Flex>
                <Menu.Root>
                    <Menu.Trigger asChild>
                    <Button p={"0px"}><Icon><SlidersHorizontal/></Icon></Button>
                    </Menu.Trigger>
                    <Menu.Positioner>
                        <Menu.Content>
                        <Menu.ItemGroup>
                            <Menu.ItemGroupLabel>Filters</Menu.ItemGroupLabel>
                            <Menu.Separator />
                            <Menu.Item value="profile">
                                <Text>Filters here</Text>
                            </Menu.Item>
                        </Menu.ItemGroup>
                        </Menu.Content>
                    </Menu.Positioner>
                    </Menu.Root>
            </Flex>
        </Flex>
    )
}
