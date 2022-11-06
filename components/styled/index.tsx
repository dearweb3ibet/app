import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import {
  Box,
  BoxProps,
  Link,
  LinkProps,
  Select,
  SelectProps,
  TextField,
  TextFieldProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const HugeLoadingButton = styled(LoadingButton)<LoadingButtonProps>(
  ({ theme }) => ({
    fontSize: "24px",
    borderRadius: "78px",
    padding: "24px 48px",
  })
);

export const CentralizedBox = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "24px",
  marginBottom: "24px",
}));

export const WidgetLink = styled(Link)<LinkProps>(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  padding: "14px 20px",
}));

export const WidgetTypography = styled(Typography)<TypographyProps>(
  ({ theme }) => ({
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "14px 20px",
  })
);

export const WidgetInputTextField = styled(TextField)<TextFieldProps>(
  ({ theme }) => ({
    width: "120px",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "0px",
        borderRadius: "12px",
      },
      "&:hover fieldset": {
        border: "4px solid #000000",
      },
      "&.Mui-focused fieldset": {
        border: "4px solid #000000",
      },
    },
  })
);

export const WidgetInputSelect = styled(Select)<SelectProps>(({ theme }) => ({
  width: "120px",
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "4px solid #000000",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "4px solid #000000",
  },
}));
