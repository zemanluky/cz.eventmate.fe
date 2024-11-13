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
import microSoftLogo from "@Components/assets/Microsoft_logo.svg";
import appleLogo from "@Components/assets/Apple_logo.svg.png";
import googleLogo from "@Components/assets/Google_Icon.svg.png";


export const RegisterForm: React.FC = () => {
	const formStyles = css({
		flexDirection: "column",
		alignItems: "center",
		gap: "20px",
		w: "450px",
	});
	return (
		<Flex className={formStyles}>
			<Text size="6xl">EventMate</Text>
			<Stack gap="11px" width="2xs" w="100%">
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
				{/* Divider */}
				<Flex align="center" justify="center" gap="16px" mt="10px">
					<Box flex="1" backgroundColor="black" h="1px" />
					<Text fontWeight="bold" mx="2" color="black">
						OR
					</Text>
					<Box flex="1" backgroundColor="black" h="1px" />
				</Flex>
			</Stack>
			<Text fontWeight="bold">Sign in with :</Text>
			<HStack>
                <Box
                    style={{
                        backgroundImage: `url(${googleLogo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    width="48px"
                    height="48px"
                    
				/>
				<Box
                    style={{
                        backgroundImage: `url(${microSoftLogo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    width="48px"
                    height="48px"
                    
				/>
                <Box
                    style={{
                        backgroundImage: `url(${appleLogo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                    width="48px"
                    height="48px"
                    
				/>
			</HStack>
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
		</Flex>
	);
};
