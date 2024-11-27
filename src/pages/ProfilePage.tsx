import * as React from "react";
import { useState,useEffect } from "react";
import { Button } from "@ParkComponents/button.tsx";
import { Box, Flex } from "@Panda/jsx";
import { Text } from "@ParkComponents/text";
import { RatingGroup } from "@ParkComponents/rating-group";
import axios from "axios";
import { useShowToast } from "src/hooks";

export const ProfilePage: React.FC = () => {
	const showToast = useShowToast()
	const getProfileDetails = async () => {
		try {
			// Retrieve the token from localStorage
			const token = localStorage.getItem("authToken");
	
			if (!token) {
				showToast("Auth Error", "User is not authenticated. Please log in.", "error");
				return;
			}
	
			// Include the token in the Authorization header
			const response = await axios.get(
				`${import.meta.env.VITE_API_KEY}/user/profile`,
				{
					headers: {
						Authorization: `Bearer ${token}`, // Add "Bearer" prefix here
					},
				}
			);
	
			console.log("Profile data acquired successfully!", response.data);
		} catch (error) {
			// Handle errors
			if (axios.isAxiosError(error)) {
				showToast("Error", `Fetching data failed: ${error.response?.data?.message || error.message}`, "error");
			} else {
				showToast("Unexpected Error", "Please try again later", "error");
			}
		}
	};
	
	React.useEffect(() =>{
		getProfileDetails()
	})

	return (
		<>
			<Flex w="100%" py="24px" gap="50px" borderBottom={"2px solid gray"}>
				{/* profile pic */}
				<Flex w="25%">
					<Box
						minHeight={"340px"}
						minWidth={"340px"}
						bg="bg.cancel"
						rounded={"full"}
					/>
				</Flex>
				<Flex w="75%" flexDirection={"column"} justifyContent={"end"} mb="26px">
					<Flex flexDirection={"column"} gap={"16px"} mb="40px">
						<Text fontWeight="700" fontSize="5xl" lineHeight={"54px"}>
							Petr Smolka
						</Text>
						<Flex gap="12px" alignItems={"center"}>
							<RatingGroup count={5} defaultValue={3} />
                            <Box w="5px" h="5px" borderRadius={"full"} bg="fg.subtle"/>
							<Text fontSize="xs" color="fg.subtle" fontWeight="500">
								12 events hosted
							</Text>
						</Flex>
						<Flex gap="12px" pl="2px" alignItems={"center"} fontWeight={"500"}>
							<Text fontSize="lg">Following: <Text as="span">45</Text></Text>
                            <Box h="10px" w="1px" bg="fg.card"/>
                            <Text fontSize="lg">Followers: <Text as="span">150</Text></Text>
						</Flex>

					</Flex>
                    <Flex gap="30px">
                        <Button h="64px" w="75%" fontSize={"2xl"} bg="bg.buttonLarge" color="fg.buttonLarge">Send friend request</Button>
                        <Button h="64px" w="25%" fontSize={"2xl"} bg="bg.buttonLarge" color="fg.buttonLarge">Rate User</Button>
                    </Flex>
				</Flex>
			</Flex>
		</>
	);
};
