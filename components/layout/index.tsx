import { Container, SxProps, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import Navigation from "./Navigation";

/**
 * Component with layout.
 */
export default function Layout(props: {
  sx?: SxProps;
  hideToolbar?: boolean;
  children: any;
}) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Head>
        <title>
          dearweb3ibet - let's move from words to bets on the blockchain!
        </title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Navigation />
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100%",
        }}
      >
        {/* Box with content */}
        <Box sx={{ py: 4, ...props.sx }}>
          {!props.hideToolbar && <Toolbar />}
          {props.children}
        </Box>
      </Container>
    </Box>
  );
}
