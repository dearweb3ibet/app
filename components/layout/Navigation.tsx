import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

/**
 * Component with navigation.
 */
export default function Navigation() {
  return (
    <AppBar
      color="inherit"
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row" }}>
            <Link href="/" passHref legacyBehavior>
              <Typography
                variant="h6"
                component="a"
                sx={{
                  ml: 1,
                  mr: 1,
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                dearweb3ibet
              </Typography>
            </Link>
            <Typography color="text.secondary" variant="body2">
              Alpha
            </Typography>
          </Box>
          {/* Connect button */}
          <Box sx={{ flexGrow: 0 }}>
            <ConnectButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
