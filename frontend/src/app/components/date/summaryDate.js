"use client";
import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";
import { Breadcrumbs, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

export const SummaryDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNextDate = () => {
    const current_date = new Date();
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    if (nextDay.getTime() > current_date.getTime()) {
      return;
    } else {
      setCurrentDate(nextDay);
    }
  };

  const handlePreviousDate = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 1);

    setCurrentDate(prevDate);
  };
  return (
    <Stack
      flexDirection={"row"}
      flexWrap={"nowrap"}
      maxWidth={270}
      alignItems={"center"}
      gap={1}
    >
      <IconButton
        onClick={handlePreviousDate}
        sx={{
          "&:hover": {
            bgcolor: "transparent",
          },
        }}
      >
        <ChevronLeftOutlined />
      </IconButton>
      <Typography variant="subtitle2" fontSize={18} noWrap fontWeight={700}>
        {currentDate.toLocaleDateString()}
      </Typography>
      <IconButton
        onClick={handleNextDate}
        sx={{
          "&:hover": {
            bgcolor: "transparent",
          },
        }}
      >
        <ChevronRightOutlined />
      </IconButton>
    </Stack>
  );
};
