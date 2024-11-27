import React from "react";
import { Toast } from "@ParkComponents/toast";
import { Button } from "@ParkComponents/button";
import { IconButton } from "@ParkComponents/icon-button";
import { XIcon } from "lucide-react";

export const toaster = Toast.createToaster({
  placement: "bottom",
  overlap: true,
  gap: 16,
});

export const ToastProvider: React.FC = () => {
  return (
    <Toast.Toaster toaster={toaster}>
      {(toast) => (
        <Toast.Root key={toast.id}>
          <Toast.Title>{toast.title}</Toast.Title>
          <Toast.Description>{toast.description}</Toast.Description>
          <Toast.ActionTrigger asChild>
            <Button variant="link" size="sm">
              Action
            </Button>
          </Toast.ActionTrigger>
          <Toast.CloseTrigger asChild>
            <IconButton size="sm" variant="link">
              <XIcon />
            </IconButton>
          </Toast.CloseTrigger>
        </Toast.Root>
      )}
    </Toast.Toaster>
  );
};