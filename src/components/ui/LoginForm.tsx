import { Box, Flex, HStack, Stack, VStack } from "@Panda/jsx";
import { Button } from "@ParkComponents/button";
import { FormLabel } from "@ParkComponents/form-label";
import { Input } from "@ParkComponents/input";
import { Text } from "@ParkComponents/text";
import { ArrowRight } from "lucide-react";
import { Icon } from "@ParkComponents/icon";

import * as React from "react";

export const LoginForm: React.FC = () => {
  return (
    <VStack w= {{base: "350px", sm:"450px"}} mt={{base: "15px", sm:"15px"}}>
      <Text size="6xl" mb="10px">
        EventM8
      </Text>
      <Stack mb="0.69rem" w="100%">
        <FormLabel fontWeight="bold">E-mail</FormLabel>
        <Input placeholder="E-mail" />
      </Stack>
      <Stack mb="2rem" w="100%">
        <FormLabel fontWeight="bold">Password</FormLabel>
        <Input placeholder="Password" />
      </Stack>
      <Button bg="bg.buttonLarge" w="100%">
        <Text color="white">Sign In</Text>
        <Icon>
          <ArrowRight color="white" />
        </Icon>
      </Button>
    </VStack>
  );
};
