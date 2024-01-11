"use client";
import { Alert, Snackbar, Typography } from "@mui/material";
import React, { createContext } from "react";

export const SnackbarContext = createContext("snack!");

export default function SnackBarProvider({ children }) {
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState("");
  const [snackSeverity, setSnackSeverity] = React.useState("success");

  const handleOpen = (message) => {
    setSnackMessage(message);
    setSnackOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };
  return (
    <SnackbarContext.Provider
      value={{
        snackOpen,
        handleOpen,
        handleClose,
        setSnackMessage,
        setSnackSeverity,
      }}
    >
      {children}
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity={snackSeverity}
          sx={{ width: "100%" }}
        >
          {snackMessage !== null && Array.isArray(snackMessage) && (
            <>
              <Typography variant="subtitle2" fontSize={15}>
                There are errors in the form
              </Typography>
              <ul>
                {snackMessage.map((error, index) => (
                  <li key={index}>
                    <b>{error.propertyPath}:</b> {error.message}
                  </li>
                ))}
              </ul>
            </>
          )}
          {snackMessage !== null && typeof snackMessage === "string" && (
            <>
              <Typography variant="subtitle2" fontSize={15}>
                {snackMessage}
              </Typography>
            </>
          )}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
