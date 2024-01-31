"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  IconButton,
  Link as MUILink,
  Paper,
  Stack,
  Typography,
  colors,
} from "@mui/material";
import Link from "next/link";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { MoreOutlined, MoreVert } from "@mui/icons-material";
import theme from "@/utils/theme";

const SummaryCard = ({
  bgColor = colors.common.white,
  textColor = colors.common.black,
  title,
  cardValue,
  handleCardNumberChange,
}) => {
  return (
    <Card
      variant="outlined"
      elevation={0}
      sx={{
        width: { xs: "100%", md: 250 },
        // p: 2,
      }}
    >
      <CardActionArea
        onMouseEnter={handleCardNumberChange}
        value={1}
        sx={{
          "&:hover": {
            bgcolor: colors.common.black,
            // bgcolor: (theme) => theme.palette.secondary.main,
            color: colors.common.white,
            "& .view_more_btn: hover": {
              bgcolor: colors.grey["900"],
            },
            "& .view_more": {
              color: "white",
            },
          },
          bgcolor: bgColor,
          color: textColor,
        }}
      >
        <CardContent>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <PeopleAltOutlinedIcon fontSize="small" />
            <IconButton className="view_more_btn" component={"div"}>
              <MoreVert
                fontSize="small"
                className="view_more"
                htmlColor={bgColor !== "#fff" && "white"}
              />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            component={"div"}
            color={"text.light"}
            textTransform={"uppercase"}
            fontSize={12}
            fontWeight={700}
          >
            {title}
          </Typography>
          <Typography variant="h3" fontSize={50}>
            {cardValue}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export const FrontDeskSummary = () => {
  const [cardNumber, setCardNumber] = useState(1);

  const handleCardNumberChange = (event) => {
    console.log(event);
  };
  return (
    <Box
      display={{ xs: "flex" }}
      width={"inherit"}
      alignItems={"center"}
      sx={{
        "&:hover": {
          overflowX: "auto",
        },
      }}
    >
      <Box
        width={(theme) => theme.breakpoints.only("md")}
        display={"flex"}
        gap={3}
      >
        <SummaryCard
          title={"Total visitors"}
          handleCardNumberChange={handleCardNumberChange}
          cardValue={30}
          bgColor={colors.common.black}
          textColor={colors.common.white}
        />
        <SummaryCard title={"Visitors Remaining"} cardValue={18} />
        <SummaryCard title={"Visitors handled"} cardValue={12} />
        {/* <SummaryCard /> */}
      </Box>
    </Box>
  );
};
