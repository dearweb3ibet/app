import { Button, Typography } from "@mui/material";
import Layout from "components/layout/Layout";
import Link from "next/link";

/**
 * Home page.
 */
export default function Home() {
  return (
    <Layout>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Dear Web3, I bet...
      </Typography>
      <Link href="/bets/new" legacyBehavior>
        <Button variant="contained">Make Bet</Button>
      </Link>
    </Layout>
  );
}
