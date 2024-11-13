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
    <VStack w="28.1rem">
      <Text size="6xl" mb="2.06rem">
        EventM8
      </Text>
      <Stack mb="0.69rem" w="100%">
        <FormLabel>E-mail</FormLabel>
        <Input placeholder="E-mail" />
      </Stack>
      <Stack mb="2rem" w="100%">
        <FormLabel>Password</FormLabel>
        <Input placeholder="Password" />
      </Stack>
      <Button mb="1.31rem" bg="bg.buttonLarge" w="100%">
        <Text color="white">Sign In</Text>
        <Icon>
          <ArrowRight color="white" />
        </Icon>
      </Button>
      <Flex align="center" justify="center" gap="16px" w="100%">
        <Box flex="1" backgroundColor="black" h="1px" />
        <Text mx="2" color="black" fontWeight="bold">
          OR
        </Text>
        <Box flex="1" backgroundColor="black" h="1px" />
      </Flex>
      <Text mb="2.12rem" fontWeight="bold">
        Sign in with:
      </Text>
      <HStack mb="2.12rem" gap="1.7rem"></HStack>

      <Flex
        h="80px"
        borderRadius="8px"
        border="1px solid black"
        justifyContent="center"
        w="100%"
      >
        <Flex justifyContent="space-between" alignItems={"center"}>
          <Text textAlign="center" py="20px" px="30px">
            Don't have an account yet ?
          </Text>
          <Button px="0" variant="ghost" color="blue">
            Sign In
          </Button>
        </Flex>
      </Flex>
    </VStack>
  );
};
