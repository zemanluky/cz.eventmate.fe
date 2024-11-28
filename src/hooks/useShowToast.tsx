import { useCallback } from "react";
import { toaster } from "../providers/ToastProvider"
export const useShowToast = () => {

type ToastType = "success" | "error" | "alert";

  const showToast = useCallback(
    (title: string, description: string, type: ToastType) => {
        // Map toast types to corresponding colors

        const fgColorMap: Record<ToastType, string> = {
          success: "white",
          error: "white",
          alert: "black",
        };
  
        toaster.create({
          title: title,
          description: description,
          type: type, // Optional: Pass type if the UI uses it elsewhere
          color: fgColorMap[type],
        });
      },
      []
    );

  return showToast;
};