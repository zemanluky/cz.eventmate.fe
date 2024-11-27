import { useCallback } from "react";
import { toaster } from "../providers/ToastProvider"
export const useShowToast = () => {
  const showToast = useCallback(
    (title: string, description: string, type: string) => {
      toaster.create({
        title: title,
        description: description,
        type: type,
      });
    },
    []
  );

  return showToast;
};