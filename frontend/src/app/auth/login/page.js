import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import LoginForm from "./form";
import Image from "next/image";
import loginImage from "../../../../public/images/login-image.jpg";

export default function Page() {
  return (
    <Stack flexDirection={{ xs: "column", md: "row" }} gap={3}>
      <Stack
        justifyContent={"center"}
        height={"90vh"}
        flexDirection={"column"}
        gap={5}
        width={{ xs: "100%", md: "50%" }}
        order={{ xs: 2, md: 1 }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome back!
          </Typography>
          <Typography variant="subtitle2" fontSize={13}>
            Login in to your space
          </Typography>
        </Box>
        <LoginForm />
      </Stack>

      <Box
        order={{ xs: 1, md: 2 }}
        width={{ sm: "100%", md: "50%" }}
        minHeight={{ xs: 0, sm: "100%" }}
        position="relative"
        mt={{ xs: 10, md: 0 }}
        sx={{ borderRadius: 10 }}
      >
        <Image
          src={loginImage}
          priority
          alt="export image"
          fill
          style={{
            objectFit: "cover",
            borderRadius: "15px",
            filter: "brightness(0.5)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
          }}
        >
          <Box width={"100%"}>
            <Typography
              variant="h5"
              align="center"
              fontWeight={700}
              textTransform={"uppercase"}
            >
              Amansie West
            </Typography>
            <Typography
              variant="h3"
              align="center"
              fontWeight={700}
              textTransform={"uppercase"}
            >
              District Assembly
            </Typography>
            <Typography
              variant="h5"
              align="center"
              fontWeight={700}
              textTransform={"uppercase"}
            >
              Head office
            </Typography>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
