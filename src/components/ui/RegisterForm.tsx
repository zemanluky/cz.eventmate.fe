import * as React from "react";
import { useState } from "react";
import { Button } from "@ParkComponents/button.tsx";
import { Box, Flex, HStack, Stack } from "@Panda/jsx";
import { css } from "@Panda/css";
import { Text } from "@ParkComponents/text";
import { Input } from "@ParkComponents/input";
import { FormLabel } from "@ParkComponents/form-label";
import { ArrowRight } from "lucide-react";
import { Icon } from "@ParkComponents/icon";


export const RegisterForm: React.FC = () => {
	const formStyles = css({
		flexDirection: "column",
		alignItems: "center",
		gap: "20px",
		w: {base: "350px", sm:"450px"},
		mt:{base: "15px", sm:"15px"},
	});
	return (
		<Flex className={formStyles}>
			<Text size="6xl">EventM8</Text>
			<Stack gap="10px" width="2xs" w="100%">
				<FormLabel fontWeight="bold" htmlFor="firstname">
					First Name
				</FormLabel>
				<Input size="md" w="100%" id="firstname" placeholder="First Name" />

				<FormLabel fontWeight="bold" htmlFor="lastname">
					Last Name
				</FormLabel>
				<Input size="md" w="100%" id="lastname" placeholder="Last Name" />

				<FormLabel fontWeight="bold" htmlFor="email">
					E-mail
				</FormLabel>
				<Input size="md" w="100%" id="email" placeholder="E-mail" />

				<FormLabel fontWeight="bold" htmlFor="password">
					Password
				</FormLabel>
				<Input size="md" w="100%" id="password" placeholder="Password" />

				<FormLabel fontWeight="bold" htmlFor="confirmpassword">
					Confirm Password
				</FormLabel>
				<Input
					size="md"
					w="100%"
					id="confirmpassword"
					placeholder="Confirm Password"
				/>

				<Button mt="20px" color="white" bg="bg.buttonLarge">
					Sign Up
					<Icon>
						<ArrowRight />
					</Icon>
				</Button>
				
			</Stack>
		</Flex>
	);
};
