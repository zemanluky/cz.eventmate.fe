import { LoginForm, RegisterForm } from '@Components/ui';
import { Box, Flex, HStack, Stack } from '@Panda/jsx';
import { Button } from '@ParkComponents/button';
import { Text } from '@ParkComponents/text';
import * as React from 'react';
import microSoftLogo from "@Components/assets/Microsoft_logo.svg";
import appleLogo from "@Components/assets/Apple_logo.svg.png";
import googleLogo from "@Components/assets/Google_Icon.svg.png";
import peopleImage from "@Components/assets/images/Enjoying_app.webp";

export const AuthPage: React.FC = () => {
  const [showLogin, setShowLogin] = React.useState<boolean>(false)
  return (
    <Flex w="100%">
      {/* Image */}
      <Box w="50%" 
        style={{
          backgroundImage: `url(${peopleImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        display={{base:"none" , lg:"block"}}  h="100vh"></Box> 
      <Flex w={{base:"100%", lg:"50%"}} h="100vh"  flexDirection="column" alignItems={"center"}>
        <>
        {showLogin ? <LoginForm/> : <RegisterForm/>}
        </>
        <Box width={{base:"350px", sm:"450px"}}>
          <Stack width={"100%"} alignItems={"center"}>
                    {/* Divider */}
              <Flex align="center" justify="center" gap="16px" mt="10px" width={"100%"}>
                <Box flex="1" backgroundColor="black" h="1px" />
                  <Text fontWeight="bold" mx="2" color="black">
                    OR
                  </Text>
                <Box flex="1" backgroundColor="black" h="1px" />
              </Flex>
              <Text fontWeight="bold">{showLogin ? "Sign In" : "Sign Up"} with :</Text>
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
                  {showLogin ? "Don't have an account yet ?" : "Already have an account ?"}
                  </Text>
                  <Button px="0" variant="ghost" color="blue" onClick={() => setShowLogin(!showLogin)}>
                    {showLogin ? "Sign Up" : "Sign In"}
                  </Button>
                </Flex>
              </Flex>
        </Stack>

        </Box>
      </Flex>
    </Flex>
  )
}

