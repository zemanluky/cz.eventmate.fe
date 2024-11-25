import { Box, Flex, HStack, Stack, VStack } from "@Panda/jsx";
import { Button } from "@ParkComponents/button";
import { FormLabel } from "@ParkComponents/form-label";
import { Input } from "@ParkComponents/input";
import { Text } from "@ParkComponents/text";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Icon } from "@ParkComponents/icon";

import * as React from "react";
import { IconButton } from "@ParkComponents/icon-button";
import axios from "axios";

export const LoginForm: React.FC = () => {

  const [inputs, setInputs] = React.useState({
    email:"",
    password:""
  })
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = async() =>{
    // Ensure all fields are filled
		if (
			!inputs.email ||
			!inputs.password
		) {
			alert("Please fill all fields correctly.");
			return;
		}

    const formData = {...inputs}

    try {
			const response = await axios.post(`${import.meta.env.VITE_API_KEY}/auth/login`, formData);

      // Save the token to localStorage
      const token = response.data.data.access_token
      console.log(token)
      localStorage.setItem("authToken", token);

			console.log("Login successful:", response.data);
		
			alert("Login successful!");
		  } catch (error) {
			// Check for server errors or network issues
			if (axios.isAxiosError(error)) {
				console.error("Error:", error.response?.data || error.message);
				alert(`Login failed: ${error.response?.data?.message || error.message}`);
			  } else {
				console.error("Unexpected error:", error);
				alert("An unexpected error occurred. Please try again later.");
			  }
		  }
  }

  return (
    <VStack w= {{base: "350px", sm:"450px"}} mt={{base: "15px", sm:"15px"}}>
      <Text size="6xl" mb="10px">
        EventM8
      </Text>
      <Stack mb="0.69rem" w="100%">
        <FormLabel fontWeight="bold">E-mail</FormLabel>
        <Input
					value={inputs.email}
					size="md"
					w="100%"
					id="email"
					placeholder="E-mail"
					onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
				/>
      </Stack>
      <Stack mb="2rem" w="100%">
        <FormLabel fontWeight="bold">Password</FormLabel>
        <Flex alignItems={"center"} gap="8px">
          <Input
              value={inputs.password}
              size="md"
              w="100%"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              variant={"outline"}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </IconButton>
        </Flex>
      </Stack>
      <Button bg="bg.buttonLarge" w="100%" 
      disabled={!inputs.email || !inputs.password}
      onClick={handleSubmit}>
        <Text color="white">Sign In</Text>
        <Icon>
          <ArrowRight color="white" />
        </Icon>
      </Button>
    </VStack>
  );
};
