import { Instagram, Person, Telegram, Twitter } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import BetList from "components/bet/BetList";
import Layout from "components/layout";
import { CentralizedBox, XlLoadingButton } from "components/styled";
import { accounts } from "data/mock";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addressToShortAddress } from "utils/converters";
import { useAccount } from "wagmi";

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

// TODO: Use real data instead of mock data
function AccountBio(props: { address: string }) {
  const { address } = useAccount();
  const [account, setAccount] = useState<any>();

  useEffect(() => {
    setAccount(accounts.find((account) => account.address === props.address));
  }, [props.address]);

  return (
    <>
      {/* Bio image */}
      <Box sx={{ mb: 3 }}>
        <Avatar
          sx={{
            width: 164,
            height: 164,
            borderRadius: 164,
          }}
          src={account?.avatar}
        >
          <Person sx={{ fontSize: 64 }} />
        </Avatar>
      </Box>
      {/* Account address */}
      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        sx={{ mb: 1.5 }}
      >
        Account {addressToShortAddress(props.address)}
      </Typography>
      {/* Bio text */}
      {account?.bio && (
        <Typography
          variant="h6"
          textAlign="center"
          sx={{ maxWidth: 480, mb: 2 }}
        >
          {account.bio}
        </Typography>
      )}
      {/* Bio social links */}
      {account?.links && (
        <Stack direction="row" spacing={2}>
          {account.links.twitter && (
            <MuiLink href={account.links.twitter} target="_blank">
              <Twitter />
            </MuiLink>
          )}
          {account.links.telegram && (
            <MuiLink href={account.links.telegram} target="_blank">
              <Telegram />
            </MuiLink>
          )}
          {account.links.instagram && (
            <MuiLink href={account.links.instagram} target="_blank">
              <Instagram />
            </MuiLink>
          )}
        </Stack>
      )}
      {/* Edit bio button */}
      {address === props.address && (
        <Box sx={{ mt: 2 }}>
          <Link href="/accounts/edit" legacyBehavior>
            <XlLoadingButton variant="contained">Edit</XlLoadingButton>
          </Link>
        </Box>
      )}
    </>
  );
}

// TODO: Use real data instead of mock data
function AccountBets(props: { address: string }) {
  const [account, setAccount] = useState<any>();

  useEffect(() => {
    setAccount(accounts.find((account) => account.address === props.address));
  }, [props.address]);

  return (
    <>
      <Typography
        variant="h6"
        fontWeight={700}
        textAlign="center"
        sx={{ mb: 3 }}
      >
        🤝 Account bets
      </Typography>
      {account?.bets && <BetList bets={account.bets} />}
    </>
  );
}
