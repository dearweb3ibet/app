import { Divider } from "@mui/material";
import AccountBets from "components/account/AccountBets";
import AccountBio from "components/account/AccountBio";
import Layout from "components/layout";
import { CentralizedBox } from "components/styled";
import { useRouter } from "next/router";

/**
 * Page with an account.
 */
export default function Account() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Layout>
      {slug && (
        <CentralizedBox>
          <AccountBio address={slug as string} />
          <Divider sx={{ width: 540, mt: 5, mb: 5 }} />
          <AccountBets address={slug as string} />
        </CentralizedBox>
      )}
    </Layout>
  );
}
