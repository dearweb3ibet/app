import { Instagram, Person, Telegram, Twitter } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Link as MuiLink,
  Skeleton,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import BetList from "components/bet/BetList";
import Layout from "components/layout";
import { CentralizedBox, XlLoadingButton } from "components/styled";
import { bioContractAbi } from "contracts/abi/bioContract";
import { ethers } from "ethers";
import useError from "hooks/useError";
import useIpfs from "hooks/useIpfs";
import useSubgraph from "hooks/useSubgraph";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addressToShortAddress } from "utils/converters";
import { useAccount, useContractRead } from "wagmi";

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
          {/* TODO: Fix account bets component */}
          {/* <Divider sx={{ width: 540, mt: 5, mb: 5 }} /> */}
          {/* <AccountBets address={slug as string} /> */}
        </CentralizedBox>
      )}
    </Layout>
  );
}

function AccountBio(props: { address: string }) {
  const { handleError } = useError();
  const { address } = useAccount();
  const { loadJsonFromIpfs, ipfsUrlToHttpUrl } = useIpfs();
  const [bioData, setBioData] = useState<any>();

  // Contract states
  const { status, error, data } = useContractRead({
    address: process.env.NEXT_PUBLIC_BIO_CONTRACT_ADDRESS,
    abi: bioContractAbi,
    functionName: "getURI",
    args: [ethers.utils.getAddress(props.address)],
  });

  useEffect(() => {
    if (status === "success" && data) {
      loadJsonFromIpfs(data)
        .then((result) => setBioData(result))
        .catch((error) => handleError(error, true));
    }
    if (status === "error" && error) {
      setBioData({});
    }
  }, [status, error, data]);

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
        {/* Bio social links address */}
        <Stack direction="row" spacing={2}>
          {bioData.twitter && (
            <MuiLink href={bioData.twitter} target="_blank">
              <Twitter />
            </MuiLink>
          )}
          {bioData.telegram && (
            <MuiLink href={bioData.telegram} target="_blank">
              <Telegram />
            </MuiLink>
          )}
          {bioData.instagram && (
            <MuiLink href={bioData.instagram} target="_blank">
              <Instagram />
            </MuiLink>
          )}
          {/* TODO: Add copy button */}
          <Typography fontWeight={700}>
            {addressToShortAddress(props.address)}
          </Typography>
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

  return <Skeleton variant="rounded" width={540} height={48} />;
}

function AccountBets(props: { address: string }) {
  const { handleError } = useError();
  const { findBets } = useSubgraph();
  const [accountBets, setAccountBets] = useState<any>();

  useEffect(() => {
    findBets(props.address, 25, 0)
      .then((result) => setAccountBets(result))
      .catch((error) => handleError(error, true));
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
      {accountBets ? (
        <BetList bets={accountBets} />
      ) : (
        <Typography>No bets yet</Typography>
      )}
    </>
  );
}
