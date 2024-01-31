import { Roboto } from "next/font/google";
import { Poppins } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const roboto = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    secondary: {
      main: "rgb(0, 105, 128)",
      light: "rgb(51, 140, 166)",
      dark: "rgb(0, 84, 102)",
      // contrastText: "#FFFFFF",
    },
    primary: {
      main: "rgb(0, 128, 105)",
      light: "rgb(51, 179, 147)",
      dark: "rgb(0, 102, 84)",
      // contrastText: "#FFFFFF",
    },

    // success: {
    //   main: "#66bb6a",
    //   contrastText: "#ffffff",
    // },
    // background: {
    //   default: "#1c1f20",
    //   paper: "#181a1b",
    // },
    text: {
      primary: "#3c3c3c",
      secondary: "rgb(0, 128, 105)",
      light: "#818181",
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: ({ theme }) => {
          theme.unstable_sx({
            textTransform: "capitalize",
            height: 50,
          });
        },
      },
    },
  },
  typography: {
    fontFamily:
      "Apple-System, Arial, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, STXihei, sans-serif",
  },
});

export default theme;
