import { Components } from "@mui/material";

export const components: Components = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "initial",
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: "none",
      },
    },
  },
};
