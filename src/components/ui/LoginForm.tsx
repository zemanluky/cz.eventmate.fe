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
import { useShowToast } from "src/hooks";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const showToast = useShowToast()

  const [inputs, setInputs] = React.useState({
    email:"",
    password:""
  })
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = async () => {
    // Ensure all fields are filled
    if (!inputs.email || !inputs.password) {
      showToast("Warning", "Fill in the inputs correctly", "alert");
      return;
    }
  
    // Prepare the form data
    const formData = { ...inputs };
  
    try {
      // Send the login request
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/auth/login`,
        formData,
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );
  
      // Extract the access token from the response
      const token = response.data.data.access_token;
      console.log(token)
  
      // Store the token in localStorage
      localStorage.setItem("authToken", token);
  
      // Provide user feedback on successful login
      showToast("Success", "Login successful", "success");

      setTimeout(() => {
        navigate("/")
      }, 1000);

    } catch (error) {
      // Check for server errors or network issues
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          showToast("Error", "Invalid credentials. Please try again.", "error");
        } else {
          showToast(
            "Error",
            error.response?.data?.message || error.message,
            "error"
          );
        }
      } else {
        showToast("Unexpected Error", "Please try again later", "error");
      }
    }
  };
  

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
