import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

/**
 * Component to place bet input into children.
 */
export default function BetInputWrapper(props: {
  title: string;
  subtitle?: string;
  color?: string;
  sx?: any;
  children: any;
}) {
  const [subtitle, setSubtitle] = useState<string | undefined>();

  useEffect(() => {
    setSubtitle(props.subtitle);
  }, [props.subtitle]);

  return (
    <Box
      sx={{
        width: 540,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        bgcolor: props.color || "#000000",
        py: 2,
        px: 4,
        borderRadius: 3,
        ...props.sx,
      }}
    >
      <Typography
        sx={{
          color: "#FFFFFF",
          fontSize: 32,
          fontWeight: 700,
          minWidth: 180,
          mr: 3,
        }}
      >
        {props.title}
      </Typography>
      {props.children}
      <Typography sx={{ color: "#FFFFFF", ml: 2 }}>{subtitle}</Typography>
    </Box>
  );
}
