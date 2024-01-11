"use client";
import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";

const SummaryCard = () => {
  return <Paper elevation={0} sx={{ width: 250, height: 170 }}></Paper>;
};
export const FrontDeskSummary = () => {
  return (
    <div
      style={{
        overflowX: "auto",
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        alignItems: "center",
        backgroundColor: "red",
        justifyContent: "flex-start",
        width: "800px",
        maxWidth: "100%",
        position: "relative",
      }}
    >
      <SummaryCard />
      <SummaryCard />
      <SummaryCard />
      <SummaryCard />
      <SummaryCard />
      <SummaryCard />
      <SummaryCard />
      <SummaryCard />
    </div>
  );
};
