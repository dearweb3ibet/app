import { Typography } from "@mui/material";
import Layout from "components/layout/Layout";

/**
 * Home page.
 */
export default function Home() {
  return (
    <Layout>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Dear Web3,
      </Typography>
      <Typography variant="h5" fontWeight={700}>
        I bet...
      </Typography>
    </Layout>
  );
}
