import { Instagram, Person, Telegram, Twitter } from "@mui/icons-material";
import { Avatar, Box, Link, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Layout from "components/layout";
import { CentralizedBox } from "components/styled";
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
              <Link href={account.links.twitter} target="_blank">
                <Twitter />
              </Link>
            )}
            {account.links.telegram && (
              <Link href={account.links.telegram} target="_blank">
                <Telegram />
              </Link>
            )}
            {account.links.instagram && (
              <Link href={account.links.instagram} target="_blank">
                <Instagram />
              </Link>
            )}
          </Stack>
        )}
      </CentralizedBox>
    </Layout>
  );
}
