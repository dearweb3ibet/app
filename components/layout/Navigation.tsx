import { AlternateEmail, GitHub } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { contact } from "constants/contact";
import Link from "next/link";
import packageJson from "package.json";
import { useAccount } from "wagmi";

/**
 * Component with navigation.
 */
export default function Navigation() {
  const { isConnected, address } = useAccount();

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
              {packageJson.version}
            </Typography>
          </Box>
          {/* New bet button */}
          <Box sx={{ flexGrow: 0, mr: 3.5 }}>
            <Link href="/bets/new" legacyBehavior>
              <Button variant="contained">Make Bet</Button>
            </Link>
          </Box>
          {/* Account link */}
          {isConnected && (
            <Box sx={{ flexGrow: 0, mr: 3.5 }}>
              <Link href={`/accounts/${address}`} passHref legacyBehavior>
                <Typography
                  component="a"
                  sx={{
                    fontWeight: 700,
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  Account
                </Typography>
              </Link>
            </Box>
          )}
          {/* Explore bets link */}
          <Box sx={{ flexGrow: 0, mr: 3.5 }}>
            <Link href="/bets" passHref legacyBehavior>
              <Typography
                component="a"
                sx={{
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Explore
              </Typography>
            </Link>
          </Box>
          {/* Contest link */}
          <Box sx={{ flexGrow: 0, mr: 3.5 }}>
            <Link href="/contests" passHref legacyBehavior>
              <Typography
                component="a"
                sx={{
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Contest
              </Typography>
            </Link>
          </Box>
          {/* Connect button */}
          <Box sx={{ flexGrow: 0, mr: 2 }}>
            <ConnectButton showBalance={false} />
          </Box>
          {/* GitHub link */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              href={contact.github}
              target="_blank"
              component="a"
              sx={{ color: "#000000" }}
            >
              <GitHub />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
