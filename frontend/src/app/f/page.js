"use client";
import React from "react";
import { FrontDeskSummary } from "../components/summary/frontDeskSummary";
import Stack from "@mui/material/Stack";
import { RecentVisitors } from "../components/recent/visitors";
import { Button, Divider, Typography } from "@mui/material";
import { PersonAddAlt1Outlined } from "@mui/icons-material";
import { SummaryDate } from "../components/date/summaryDate";
import { ProfileAvatar } from "../components/Avatars/profile";

export default function Page() {
  return (
    <Stack my={1} width={"100%"} gap={1} flexDirection={"column"}>
      <Stack flexDirection={"column"} gap={1}>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <SummaryDate />
          <ProfileAvatar />
        </Stack>
        {/* <Divider flexItem variant="middle" /> */}
      </Stack>
      <Stack
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent={"space-between"}
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        <Typography variant="h4" textTransform={"capitalize"}>
          Visitors
        </Typography>

        <Button
          variant="contained"
          disableElevation
          size="large"
          sx={{ fontWeight: 700, height: 50, ml: "auto" }}
          startIcon={<PersonAddAlt1Outlined fontSize="small" />}
        >
          Add visitor
        </Button>
      </Stack>
      <FrontDeskSummary />
      <RecentVisitors />
    </Stack>
  );
}
