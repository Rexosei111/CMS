"use client";
import { Container, Paper, Stack, Typography } from "@mui/material";
import React from "react";
// import { useTokenValidation } from "../../hooks/token";
import VisitorForm from "./visitorForm";

export default function Page() {
  // useTokenValidation();
  return (
    // <Container maxWidth={"md"} sx={{ py: 2 }}>
    <Stack justifyContent={"center"} alignItems={"center"} minHeight={"100vh"}>
      <Paper elevation={0} sx={{ p: 3, width: "100%", borderRadius: 2 }}>
        <Typography
          variant="h3"
          fontSize={25}
          textTransform={"uppercase"}
          fontWeight={700}
          mb={4}
          textAlign={"center"}
        >
          Visitors Form
        </Typography>
        <VisitorForm />
      </Paper>
    </Stack>
    // </Container>
  );
}
