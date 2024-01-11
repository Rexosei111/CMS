import { Container } from "@mui/material";
import React from "react";

export const metadata = {
  title: "Front desk",
  description: "Generated by create next app",
};
export default function Layout({ children }) {
  return <Container maxWidth={"md"}>{children}</Container>;
}