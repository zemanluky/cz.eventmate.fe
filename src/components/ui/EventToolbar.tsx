import { Box, Flex } from "@Panda/jsx"
import { Button } from "@ParkComponents/button"
import { Icon } from "@ParkComponents/icon"
import { Switch } from "@ParkComponents/switch"
import { Text } from "@ParkComponents/text"
import { SlidersHorizontal } from 'lucide-react';

export const EventToolbar: React.FC = () => {
    return(
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text fontSize="5xl" fontWeight="500">Events</Text>
            <Flex gap="16px" alignItems={"center"}>
                <Flex gap="8px">
                    <Switch size="lg"/><Text fontSize="xl" lineHeight="auto" textAlign={"center"}>Private</Text>
                </Flex>
                <Button p={"0px"}><Icon><SlidersHorizontal/></Icon></Button>
            </Flex>
        </Flex>
    )
}
