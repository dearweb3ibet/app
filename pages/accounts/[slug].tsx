import { Instagram, Person, Telegram, Twitter } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import Layout from "components/layout";
import { CentralizedBox } from "components/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addressToShortAddress } from "utils/converters";

/**
 * Page with an account.
 */
export default function Account() {
  const router = useRouter();
  const { slug } = router.query;
  const [account, setAccount] = useState<any>();

  // Mock data
  // TODO: Replace mock data with real data from contract
  const accounts = [
    {
      avatar:
        "https://i.pinimg.com/736x/93/96/39/939639532ae4e49a416ea138837ea752.jpg",
      address: "0x4306D7a79265D2cb85Db0c5a55ea5F4f6F73C4B1",
      bio: "My name is Alice...",
      links: {
        twitter: "https://twitter.com/",
        telegram: "https://t.me/",
        instagram: "https://www.instagram.com/",
      },
      bets: [
        {
          id: 1,
          symbol: "ETHUSD",
          minPrice: 1300,
          maxPrice: 1500,
          dayStartTimestamp: 1669852800,
        },
        {
          id: 2,
          symbol: "BTCUSD",
          minPrice: 30000,
          maxPrice: 35000,
          dayStartTimestamp: 1671062400,
        },
        {
          id: 3,
          symbol: "FILUSD",
          minPrice: 100,
          maxPrice: 150,
          dayStartTimestamp: 1671062400,
        },
      ],
    },
    {
      avatar:
        "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1a8a9b138344219.621bda2347cfd.jpg",
      address: "0x3F121f9a16bd6C83D325985417aDA3FE0f517B7D",
      bio: "My name is Bob...",
      links: {
        twitter: "https://twitter.com/",
      },
    },
  ];

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
            {account.bets.map((bet: any, index: number) => (
              <Stack
                key={index}
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                sx={{ mb: 1.5 }}
              >
                <Link href={`/bets/${bet.id}`} legacyBehavior passHref>
                  <MuiLink>
                    <Typography fontWeight={700}>#{bet.id}</Typography>
                  </MuiLink>
                </Link>
                <Typography>{bet.symbol}</Typography>
                <Typography>&lt; {bet.minPrice}</Typography>
                <Typography>&gt; {bet.maxPrice}</Typography>
                <Typography>
                  {new Date(bet.dayStartTimestamp * 1000).toLocaleDateString()}
                </Typography>
              </Stack>
            ))}
          </>
        )}
      </CentralizedBox>
    </Layout>
  );
}
