import { Box } from "@mui/material";

/**
 * Component to place bet forms or bet params into children.
 */
export default function BetBox(props: { children: any }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      {props.children}
    </Box>
  );
}
