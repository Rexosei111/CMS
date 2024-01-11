"use client";

import SnackBarProvider from "./snackbarProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export default function Providers({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SnackBarProvider>{children}</SnackBarProvider>;
    </LocalizationProvider>
  );
}
