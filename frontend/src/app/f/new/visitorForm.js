"use client";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InputAdornment from "@mui/material/InputAdornment";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { usePathname, useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";
import Link from "next/link";
import { TextInputField } from "@/app/components/inputs";
import {
  ContactSupport,
  InfoOutlined,
  LocationOnOutlined,
  Person2Outlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { SnackbarContext } from "@/app/providers/snackbarProvider";
import useToken from "@/app/hooks/token";
import { getUserTypeBasePath } from "@/utils/pageNavigator";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { APIClient } from "@/app/config/axios";

const loginSchema = yup
  .object({
    name: yup.string().required(),
    contact: yup.string().required(),
    location: yup.string(),
    gender: yup.string(),
    vulnerability: yup.string(),
    purpose: yup.string().required(),
    time_in: yup.date().required(),
    time_out: yup.date().required(),
    not_disabled: yup.boolean(),
    disabled: yup.boolean(),
    aged: yup.boolean(),
  })
  .required();

export default function VisitorForm({ auth_endpoint = "/auth/login" }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [timeIn, setTimeIn] = useState(new dayjs(new Date()));

  const [timeOut, setTimeOut] = useState(new dayjs(new Date()));

  const handleTimeInChange = (timeObj) => {
    setTimeIn(timeObj?.$d);
    setValue("time_in", timeObj.$d.toISOString());
  };

  const handleTimeOutChange = (timeObj) => {
    setTimeOut(timeObj?.$d);
    setValue("time_out", timeObj.$d.toISOString());
  };
  const router = useRouter();
  const pathname = usePathname();

  const { handleOpen: handleSnackbarOpen, setSnackSeverity } =
    useContext(SnackbarContext);

  const onSubmit = async (form_data) => {
    const formData = new URLSearchParams();
    formData.append("username", form_data.email);
    formData.append("password", form_data.password);
    try {
      const { data } = await APIClient.post(auth_endpoint, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    } catch (error) {
      if (isAxiosError(error)) {
        setSnackSeverity("error");
        handleSnackbarOpen("Unable to login! Check your credentials!");
      }
    }
  };
  return (
    <form method="POST" action="#" onSubmit={handleSubmit(onSubmit)}>
      <Stack flexDirection={"column"} gap={3}>
        <TextInputField
          {...register("name")}
          variant="outlined"
          type={"text"}
          label="Name of client"
          error={errors.name ? true : false}
          helperText={errors.name ? errors.name?.message : null}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person2Outlined fontSize="small" />
              </InputAdornment>
            ),
            style: {
              fontSize: 13,
            },
          }}
          fullWidth
          placeholder="Enter name of the visitor"
        />
        <Stack flexDirection={{ xs: "column", sm: "row" }} gap={3}>
          <TextInputField
            {...register("contact")}
            variant="outlined"
            type={"text"}
            label="Contact details"
            error={errors.contact ? true : false}
            helperText={errors.contact ? errors.contact?.message : null}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ContactSupport fontSize="small" />
                </InputAdornment>
              ),

              style: {
                fontSize: 13,
              },
            }}
            fullWidth
          />

          <TextInputField
            {...register("location")}
            variant="outlined"
            type={"text"}
            label="Location"
            error={errors.location ? true : false}
            helperText={
              errors.location
                ? errors.location?.message
                : "Where the issue can be found and not where the complainant lives."
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnOutlined fontSize="small" />
                </InputAdornment>
              ),
              style: {
                fontSize: 13,
              },
            }}
            fullWidth
            placeholder="Location of issue"
          />
        </Stack>

        <Stack flexDirection={{ xs: "column", sm: "row" }} gap={3}>
          <Box width={"100%"} sx={{ display: "flex" }}>
            <FormControl component="fieldset" variant="standard">
              <FormLabel
                component="legend"
                sx={{
                  fontSize: 13,
                  color: (theme) => theme.palette.action.disabledOpacity,
                }}
              >
                Gender
              </FormLabel>
              <RadioGroup
                {...register("gender")}
                sx={{ display: "flex", flexDirection: "row" }}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio size="small" />}
                  slotProps={{
                    typography: {
                      fontSize: 13,
                    },
                  }}
                  label="Male"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio size="small" />}
                  slotProps={{
                    typography: {
                      fontSize: 13,
                    },
                  }}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box width={"100%"}>
            <InputLabel shrink>Vulnerability</InputLabel>
            <FormGroup>
              <Stack
                flexDirection={"row"}
                gap={1}
                alignItems={"center"}
                flexWrap={{ xs: "wrap", md: "nowrap" }}
              >
                <FormControlLabel
                  {...register("not_disabled")}
                  control={<Checkbox size="small" />}
                  slotProps={{
                    typography: {
                      fontSize: 13,
                    },
                  }}
                  label="Not disabled"
                />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label="Aged"
                  {...register("aged")}
                  slotProps={{
                    typography: {
                      fontSize: 13,
                    },
                  }}
                />
                <FormControlLabel
                  {...register("disabled")}
                  control={<Checkbox size="small" />}
                  label="Disabled"
                  slotProps={{
                    typography: {
                      fontSize: 13,
                    },
                  }}
                />
              </Stack>
            </FormGroup>
          </Box>
        </Stack>
        <TextInputField
          {...register("purpose")}
          variant="outlined"
          multiline
          rows={3}
          type={"text"}
          label="Purpose"
          error={errors.purpose ? true : false}
          helperText={errors.purpose ? errors.purpose?.message : null}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <InfoOutlined fontSize="small" />
              </InputAdornment>
            ),
            style: {
              fontSize: 13,
            },
          }}
          fullWidth
          placeholder="Purpose of visit"
        />
        <Stack flexDirection={{ xs: "column", sm: "row" }} gap={3}>
          <Box width={{ xs: "100%" }}>
            <InputLabel shrink htmlFor="time">
              Time In
            </InputLabel>
            <TimePicker
              value={timeIn}
              defaultValue={new dayjs(new Date().setHours(0, 0, 0, 0))}
              onChange={handleTimeInChange}
              sx={{
                width: { xs: "100%" },
              }}
            />
          </Box>

          <Box width={{ xs: "100%" }}>
            <InputLabel shrink htmlFor="time">
              Time Out
            </InputLabel>
            <TimePicker
              value={timeOut}
              defaultValue={new dayjs(new Date().setHours(0, 0, 0, 0))}
              onChange={handleTimeOutChange}
              sx={{
                width: { xs: "100%" },
              }}
            />
          </Box>
        </Stack>

        <LoadingButton
          variant="contained"
          color="primary"
          disabled={!isValid}
          disableElevation
          loading={isSubmitting}
          type="submit"
          sx={{ textTransform: "capitalize" }}
        >
          Submit
        </LoadingButton>
      </Stack>
    </form>
  );
}
