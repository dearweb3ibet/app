import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { styled } from "@mui/material/styles";

export const HugeLoadingButton = styled(LoadingButton)<LoadingButtonProps>(
  ({ theme }) => ({
    fontSize: "24px",
    borderRadius: "78px",
    padding: "24px 48px",
  })
);
