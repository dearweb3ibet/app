import { Container, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";
import Navigation from "./Navigation";

/**
 * Component with layout.
 */
export default function Layout({ children }: any) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Head>
        <title>dearweb3ibet</title>
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
        <Box sx={{ py: 4 }}>
          <Toolbar />
          {children}
        </Box>
      </Container>
    </Box>
  );
}
