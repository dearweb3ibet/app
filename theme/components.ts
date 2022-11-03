import { Components } from "@mui/material";

export const components: Components = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "initial",
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none",
        },
      },
    },
    variants: [
      {
        props: { variant: "contained" },
        style: {
          color: "#FFFFFF",
          background: "#000000",
          "& .MuiButton-startIcon svg path": {
            stroke: "#FFFFFF",
          },
          "&:hover": {
            background: "#433d39",
          },
        },
      },
    ],
  },
  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: "none",
      },
    },
  },
};
