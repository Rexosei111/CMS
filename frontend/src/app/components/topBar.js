"use client";
import { Container, Stack, Typography } from "@mui/material";
import React from "react";

export const TopBar = () => {
  return (
    <Container maxWidth={"md"}>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography
          variant="h4"
          letterSpacing={2}
          fontWeight={500}
          fontSize={30}
        >
          CMS
        </Typography>
      </Stack>
    </Container>
  );
};
