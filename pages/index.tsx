import { Link as MuiLink, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Layout from "components/layout";
import Link from "next/link";

/**
 * Home page.
 */
export default function Home() {
  return (
    <Layout sx={{ py: 0 }} hideToolbar={true}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h1" fontWeight={700} textAlign="center">
          Let's{" "}
          <Link href="/bets/new" legacyBehavior passHref>
            <MuiLink>move</MuiLink>
          </Link>{" "}
          from words to bets on the blockchain!
        </Typography>
      </Box>
    </Layout>
  );
}
