import { useContext } from "react";
import { SnackbarContext } from "../providers/snackbarProvider";

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within an SnackbarProvider");
  }
  return context;
};
