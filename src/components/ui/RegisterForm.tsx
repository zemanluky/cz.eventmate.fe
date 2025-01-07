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
import { Eye, EyeOff } from "lucide-react";
import { IconButton } from "@ParkComponents/icon-button";
import axios from "axios";
import { useShowToast } from "src/hooks";

export const RegisterForm: React.FC = () => {
  const showToast = useShowToast();
  const [passwordInputs, setPasswordInputs] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password:
      passwordInputs.password === passwordInputs.confirmPassword
        ? passwordInputs.password
        : "",
  });

  const [errors, setErrors] = useState({
    passwordMismatch: false,
    passwordInvalid: false,
  });

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[-+#@$!%*?&])[A-Za-z\d-+#@$!%*?&]{9,}$/;

  const validatePasswords = () => {
    const { password, confirmPassword } = passwordInputs;

    // Check if passwords match
    const isMatch = password === confirmPassword;

    // Check if password is valid
    const isValid = passwordRegex.test(password);

    // Update errors
    setErrors({
      passwordMismatch: !isMatch,
      passwordInvalid: !isValid,
    });

    // Update inputs only if valid
    if (isMatch && isValid) {
      setInputs((prev) => ({ ...prev, password }));
    } else {
      setInputs((prev) => ({ ...prev, password: "" }));
    }
  };

  const usernameRegex = /^[a-zA-Z0-9_-]{5,}$/;

  const validateUserName = () => {
    const isValid = usernameRegex.test(inputs.username);
    if (!isValid) {
      showToast(
        "Warning",
        "Username must be at least 5 characters long",
        "alert"
      );
      return false;
    }
    return true;
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateEmail = () => {
    const isValid = emailRegex.test(inputs.email);
    if (!isValid) {
      showToast(
        "Warning",
        "Email must be in format example@domain.com",
        "alert"
      );
      return false;
    }
    return true;
  };

  const nameRegex = /^[A-Z][a-zA-Z]*$/;
  const validateName = (name: string) => {
    return nameRegex.test(name);
  };

  const handleSubmit = async () => {
    // Validate before submission
    validatePasswords();

    const validUserName = validateUserName();
    const validEmail = validateEmail();

    if (!validateName(inputs.name)) {
      showToast(
        "Warning",
        "Name needs to have a capital letter and no numbers",
        "alert"
      );
      return;
    }

    if (!validateName(inputs.surname)) {
      showToast(
        "Warning",
        "Surname needs to have a capital letter and no numbers",
        "alert"
      );
      return;
    }

    if (!validUserName || !validEmail) return;

    // Ensure all fields are filled
    if (
      !inputs.name ||
      !inputs.surname ||
      !inputs.username ||
      !inputs.email ||
      !inputs.password
    ) {
      showToast("Warning", "Please fill all fields correctly.", "alert");
      return;
    }

    // Prepare data for the API call
    const formData = {
      ...inputs,
      password: passwordInputs.password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/user/registration`,
        formData
      );

      showToast("Success", "Registration successful!", "success");
    } catch (error) {
      // Check for server errors or network issues
      if (axios.isAxiosError(error)) {
        console.error("Error:", error.response?.data || error.message);
        showToast(
          "Error",
          `Registration failed: ${error.response?.data?.message || error.message}`,
          "error"
        );
      } else {
        console.error("Unexpected error:", error);
        showToast(
          "Error",
          "An unexpected error occurred. Please try again later.",
          "error"
        );
      }
    }
  };

  const formStyles = css({
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    w: { base: "350px", sm: "450px" },
    mt: { base: "15px", sm: "15px" },
  });
  return (
    <Flex className={formStyles}>
      <Text size="5xl">EventM8</Text>
      <Stack gap="8px" width="2xs" w="100%">
        <FormLabel fontWeight="bold" htmlFor="name">
          First Name
        </FormLabel>
        <Input
          value={inputs.name}
          size="md"
          w="100%"
          id="name"
          placeholder="First Name"
          onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
        />

        <FormLabel fontWeight="bold" htmlFor="lastname">
          Last Name
        </FormLabel>
        <Input
          value={inputs.surname}
          size="md"
          w="100%"
          id="lastname"
          placeholder="Last Name"
          onChange={(e) => setInputs({ ...inputs, surname: e.target.value })}
        />

        <FormLabel fontWeight="bold" htmlFor="username">
          Username
        </FormLabel>
        <Input
          value={inputs.username}
          size="md"
          w="100%"
          id="username"
          placeholder="Username"
          onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
        />

        <FormLabel fontWeight="bold" htmlFor="email">
          E-mail
        </FormLabel>
        <Input
          value={inputs.email}
          size="md"
          w="100%"
          id="email"
          placeholder="E-mail"
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        />

        <FormLabel fontWeight="bold" htmlFor="password">
          Password
        </FormLabel>
        <Flex alignItems={"center"} gap="8px">
          <Input
            value={passwordInputs.password}
            size="md"
            w="100%"
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            onChange={(e) =>
              setPasswordInputs({ ...passwordInputs, password: e.target.value })
            }
            onBlur={validatePasswords}
            border={errors.passwordInvalid ? "1px solid red" : ""}
          />
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            variant={"outline"}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </IconButton>
        </Flex>
        {errors.passwordInvalid && (
          <Text color="red.500" fontSize="sm">
            Password must be at least 9 characters long, include a number, and a
            special character.
          </Text>
        )}

        <FormLabel fontWeight="bold" htmlFor="confirm-password">
          Confirm Password
        </FormLabel>
        <Flex alignItems={"center"} gap="8px">
          <Input
            value={passwordInputs.confirmPassword}
            size="md"
            w="100%"
            type={showPassword ? "text" : "password"}
            id="confirm-password"
            placeholder="Confirm Password"
            onChange={(e) =>
              setPasswordInputs({
                ...passwordInputs,
                confirmPassword: e.target.value,
              })
            }
            onBlur={validatePasswords}
            border={errors.passwordInvalid ? "1px solid red" : ""}
          />
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            variant={"outline"}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </IconButton>
        </Flex>
        {errors.passwordMismatch && (
          <Text color="red.500" fontSize="sm">
            Passwords do not match.
          </Text>
        )}

        <Button
          mt="8px"
          color="white"
          bg="bg.buttonLarge"
          disabled={
            !inputs.name ||
            !inputs.surname ||
            !inputs.username ||
            !inputs.email ||
            !inputs.password ||
            errors.passwordMismatch ||
            errors.passwordInvalid
          }
          onClick={handleSubmit}
        >
          Sign Up
          <Icon>
            <ArrowRight />
          </Icon>
        </Button>
      </Stack>
    </Flex>
  );
};
