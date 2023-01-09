import {
  AlternateEmail,
  Instagram,
  Person,
  Telegram,
  Twitter,
} from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { FullWidthSkeleton, XlLoadingButton } from "components/styled";
import { bioContractAbi } from "contracts/abi/bioContract";
import { ethers } from "ethers";
import useError from "hooks/useError";
import useIpfs from "hooks/useIpfs";
import useSubgraph from "hooks/useSubgraph";
import Account from "interfaces/Account";
import Link from "next/link";
import { useEffect, useState } from "react";
import { addressToShortAddress } from "utils/converters";
import { useAccount, useContractRead } from "wagmi";

/**
 * A component with account bio.
 */
export default function AccountBio(props: { address: string }) {
  const { handleError } = useError();
  const { address } = useAccount();
  const { findAccounts } = useSubgraph();
  const { loadJsonFromIpfs, ipfsUrlToHttpUrl } = useIpfs();
  const [bioData, setBioData] = useState<any>();
  const [accountData, setAccountData] = useState<Account | undefined>();

  // Contract states
  const { status, error, data } = useContractRead({
    address: process.env.NEXT_PUBLIC_BIO_CONTRACT_ADDRESS,
    abi: bioContractAbi,
    functionName: "getURI",
    args: [ethers.utils.getAddress(props.address)],
  });

  useEffect(() => {
    if (status === "success") {
      if (data) {
        loadJsonFromIpfs(data)
          .then((result) => setBioData(result))
          .catch((error) => handleError(error, true));
      } else {
        setBioData({});
      }
    }
    if (status === "error" && error) {
      setBioData({});
    }
  }, [status, error, data]);

  useEffect(() => {
    setAccountData(undefined);
    findAccounts(props.address)
      .then((result) =>
        setAccountData(result.length > 0 ? result[0] : undefined)
      )
      .catch((error) => handleError(error, true));
  }, [props.address]);

  if (bioData) {
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
            src={bioData.image ? ipfsUrlToHttpUrl(bioData.image) : undefined}
          >
            <Person sx={{ fontSize: 64 }} />
          </Avatar>
        </Box>
        {/* Name */}
        {bioData?.name && (
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            sx={{ mb: 0.5 }}
          >
            {bioData.name}
          </Typography>
        )}
        {/* Bio text */}
        {bioData?.text && (
          <Typography textAlign="center" sx={{ maxWidth: 480, mb: 1.5 }}>
            {bioData.text}
          </Typography>
        )}
        {/* Bio links and other data */}
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          alignItems="center"
        >
          {/* Email and social links */}
          <Stack direction="row" alignItems="center">
            {bioData.email && (
              <IconButton
                href={`mailto:${bioData.email}`}
                target="_blank"
                component="a"
                color="primary"
              >
                <AlternateEmail />
              </IconButton>
            )}
            {bioData.twitter && (
              <IconButton
                href={`https://twitter.com/${bioData.twitter}`}
                target="_blank"
                component="a"
                color="primary"
              >
                <Twitter />
              </IconButton>
            )}
            {bioData.telegram && (
              <IconButton
                href={`https://t.me/${bioData.telegram}`}
                target="_blank"
                component="a"
                color="primary"
              >
                <Telegram />
              </IconButton>
            )}
            {bioData.instagram && (
              <IconButton
                href={`https://instagram.com/${bioData.instagram}`}
                target="_blank"
                component="a"
                color="primary"
              >
                <Instagram />
              </IconButton>
            )}
            {(bioData.twitter || bioData.telegram || bioData.instagram) && (
              <Divider
                flexItem
                orientation="vertical"
                variant="middle"
                sx={{
                  display: { xs: "none", md: "block" },
                  borderRightWidth: 4,
                  ml: 1.3,
                  mr: 2,
                }}
              />
            )}
          </Stack>
          {/* Address, successes, failures */}
          <Stack
            direction="row"
            alignItems="center"
            sx={{ mb: { xs: 1, md: 0 } }}
          >
            <Typography fontWeight={700} sx={{ mr: 1.5 }}>
              {addressToShortAddress(props.address)}
            </Typography>
            {accountData && (
              <>
                <Typography
                  fontWeight={700}
                  color="success.main"
                  sx={{ mr: 1.5 }}
                >
                  👍 {accountData.successes}
                </Typography>
                <Typography fontWeight={700} color="error.main">
                  👎 {accountData.failures}
                </Typography>
              </>
            )}
          </Stack>
        </Stack>
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

  return <FullWidthSkeleton />;
}
