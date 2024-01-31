"use client";

import SnackBarProvider from "./snackbarProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AuthProvider from "./auth";
export default function Providers({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <SnackBarProvider>{children}</SnackBarProvider>;
      </AuthProvider>
    </LocalizationProvider>
  );
}
