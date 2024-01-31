import theme from "@/utils/theme";
import {
  AccountCircleOutlined,
  Logout,
  Person2Outlined,
  Person3Outlined,
  Person4Outlined,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Chip,
  IconButton,
  Popover,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";

export const ProfileAvatar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Stack
        flexDirection={"row"}
        gap={1}
        alignItems={"center"}
        onClick={handleClick}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        {/* <Chip
          sx={{
            height: 44,
          }}
          variant="outlined"
          clickable
          icon={
            <Avatar sx={{ width: 40, height: 40, bgcolor: "transparent" }}>
              R
            </Avatar>
          }
          label="Rex Osei"
        /> */}
        <IconButton>
          <Avatar sx={{ width: 40, height: 40 }}>R</Avatar>
        </IconButton>
        {useMediaQuery(theme.breakpoints.up("sm")) && (
          <Typography variant="body1" fontWeight={500}>
            Rex Osei
          </Typography>
        )}
      </Stack>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        // sx={{ mt: 1 }}
      >
        <Stack flexDirection={"column"} minWidth={180} p={1}>
          <Button
            fullWidth
            startIcon={<AccountCircleOutlined />}
            sx={{
              height: 45,
              color: "text.primary",
              fontWeight: 700,
              "&:hover": {
                bgcolor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.common.white,
              },
            }}
          >
            Profile
          </Button>
          <Button
            fullWidth
            sx={{
              height: 45,
              color: "text.primary",
              fontWeight: 700,
              "&:hover": {
                bgcolor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.common.white,
              },
            }}
            startIcon={<Logout />}
            variant="text"
          >
            Log out
          </Button>
        </Stack>
      </Popover>
    </>
  );
};
