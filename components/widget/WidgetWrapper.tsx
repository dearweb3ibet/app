import { alpha, Box, SxProps, Typography } from "@mui/material";

/**
 * Component to place data or input into children.
 */
export default function WidgetWrapper(props: {
  title: string;
  titleSx?: SxProps;
  subtitle?: string;
  subtitleSx?: SxProps;
  color?: string;
  colorAlpha?: number;
  sx?: SxProps;
  children: any;
}) {
  return (
    <Box
      sx={{
        width: 540,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        bgcolor: alpha(props.color || "#000000", props.colorAlpha || 1),
        py: 2,
        px: 4,
        borderRadius: 3,
        ...props.sx,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#FFFFFF",
          fontWeight: 700,
          minWidth: 180,
          mr: 3,
          ...props.titleSx,
        }}
      >
        {props.title}
      </Typography>
      {props.children}
      <Typography sx={{ color: "#FFFFFF", ml: 2, ...props.subtitleSx }}>
        {props.subtitle}
      </Typography>
    </Box>
  );
}
