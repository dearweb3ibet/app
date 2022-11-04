import { Select, SelectProps, TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BetInputTextField = styled(TextField)<TextFieldProps>(
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

export const BetInputSelect = styled(Select)<SelectProps>(({ theme }) => ({
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
