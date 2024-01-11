import React from "react";
import { Container } from "@mui/material";
export default function AuthLayout({ children }) {
  return (
    <Container maxWidth={"lg"} sx={{ py: 3 }}>
      {children}
    </Container>
  );
}
