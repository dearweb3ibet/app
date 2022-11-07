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
import { CentralizedBox } from "components/styled";
import { accounts } from "data/mock";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addressToShortAddress } from "utils/converters";

/**
 * Page with an account.
 *
 * TODO: Use real data instead of mock data
 */
export default function Account() {
  const router = useRouter();
  const { slug } = router.query;
  const [account, setAccount] = useState<any>();

  useEffect(() => {
    setAccount(accounts.find((account) => account.address === slug));
  }, [slug]);

  return (
    <Layout>
      <CentralizedBox>
        {/* Avatar */}
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
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          sx={{ mb: 1.5 }}
        >
          Account {addressToShortAddress(slug as string)}
        </Typography>
        {/* Bio */}
        {account?.bio && (
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ maxWidth: 480, mb: 2 }}
          >
            {account.bio}
          </Typography>
        )}
        {/* Social links */}
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
        {/* Bets */}
        {account?.bets && (
          <>
            <Divider sx={{ width: 540, mt: 5, mb: 5 }} />
            <Typography
              variant="h6"
              fontWeight={700}
              textAlign="center"
              sx={{ mb: 3 }}
            >
              🤝 Account bets
            </Typography>
            <BetList bets={account.bets} />
          </>
        )}
      </CentralizedBox>
    </Layout>
  );
}
