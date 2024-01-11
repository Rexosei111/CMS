import React from "react";
import { FrontDeskSummary } from "../components/summary/frontDeskSummary";
import Stack from "@mui/material/Stack";

export default function Page() {
  return (
    <Stack
      my={10}
      width={"100%"}
      maxHeight={300}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      position={"relative"}
    >
      <FrontDeskSummary />
    </Stack>
  );
}
