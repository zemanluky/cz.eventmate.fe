import React from "react";
import { Toast } from "@ParkComponents/toast";
import { Button } from "@ParkComponents/button";
import { IconButton } from "@ParkComponents/icon-button";
import { XIcon } from "lucide-react";
import { Box, Flex } from "@Panda/jsx";
import { TriangleAlert } from 'lucide-react';
import { CircleCheckBig } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { Icon } from "@ParkComponents/icon";


export const toaster = Toast.createToaster({
  placement: "bottom",
  overlap: true,
  gap: 16,
});

export const ToastProvider: React.FC = () => {
  return (
    <Box >

    <Toast.Toaster toaster={toaster} >
      {(toast) => (
        <Toast.Root key={toast.id} color={toast.color}
        bgColor={toast.type === "error" ? "red"
        : toast.type ==="success" ? "success" : toast.type ==="alert" ? "orange" : null}>
          <Flex gap={"8px"} alignItems={"center"}>
              {
                // Conditional rendering of icons based on toast.bgColor
                toast.type === "error" ? (
                  <Icon w="25px" h="25px">
                    <CircleX />
                    
                  </Icon>
                ) : toast.type === "alert" ? (
                  <Icon w="25px" h="25px">
                    <TriangleAlert />
                    
                  </Icon>
                ) : toast.type === "success" ? (
                  <Icon w="25px" h="25px">

                    <CircleCheckBig />
                  </Icon>
                ) : null
                }
            <Flex flexDirection={"column"}>

              <Toast.Title color={toast.color}>{toast.title}</Toast.Title>
              <Toast.Description color={toast.color}>{toast.description}</Toast.Description>
            </Flex>
          </Flex>
        </Toast.Root>
      )}
    </Toast.Toaster>
    </Box>
  );
};