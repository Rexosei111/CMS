"use client";
import { IconButton, Paper, Stack, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InputAdornment from "@mui/material/InputAdornment";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  TextInputField,
  BootstrapInput,
  StyledInputBase,
} from "@/app/components/inputs";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getUserTypeBasePath } from "@/utils/pageNavigator";
import { useAuth } from "@/app/hooks/auth";

const loginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export default function LoginForm({ auth_endpoint = "/auth/login" }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInputType, setPasswordInputType] = useState("password");
  const { login } = useAuth();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    setPasswordInputType(showPassword === false ? "text" : "password");
  };
  const router = useRouter();
  const pathname = usePathname();

  const navigateToPage = (userInfo) => {
    const path = getUserTypeBasePath(userInfo);
    router.push(path);
  };

  const onSubmit = async (data) => {
    // const result = await login(data.email, data.password);
    // if (result !== null) {
    router.push(router.query?.callbackUrl ? router.query.callbackUrl : "/f");
    // }
  };
  return (
    <Paper
      sx={{
        // p: { xs: 1, sm: 2, md: 2 },
        width: { xs: "100%", sm: "90%", md: "80%", lg: "70%" },
        bgcolor: "transparent",
      }}
      elevation={0}
    >
      <form method="POST" action="#" onSubmit={handleSubmit(onSubmit)}>
        <Stack flexDirection={"column"} gap={2}>
          <TextInputField
            {...register("email")}
            variant="outlined"
            type={"email"}
            label="Email"
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email?.message : null}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon fontSize="small" />
                </InputAdornment>
              ),
              style: {
                fontSize: 13,
              },
            }}
            fullWidth
            placeholder="example@provider.com"
          />
          <TextInputField
            {...register("password")}
            variant="outlined"
            type={passwordInputType}
            label="Password"
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password?.message : null}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={
                      showPassword === true ? "Hide password" : "Show password"
                    }
                  >
                    <IconButton onClick={handleShowPassword}>
                      {showPassword === true && (
                        <VisibilityOff fontSize="small" />
                      )}
                      {showPassword === false && (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
              style: {
                fontSize: 13,
              },
            }}
            fullWidth
          />
          <LoadingButton
            variant="contained"
            color="primary"
            // disabled={!isValid}
            disableElevation
            loading={isSubmitting}
            type="submit"
            sx={{ textTransform: "capitalize" }}
          >
            Login
          </LoadingButton>
        </Stack>
      </form>
    </Paper>
  );
}
