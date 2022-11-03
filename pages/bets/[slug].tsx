import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Layout from "components/layout/Layout";
import { betContractAbi } from "contracts/abi/betContract";
import { BigNumber, ethers } from "ethers";
import { useRouter } from "next/router";
import { useContractRead } from "wagmi";

/**
 * Page with a bet.
 */
export default function Bet() {
  const router = useRouter();
  const { slug } = router.query;

  // Download bet params
  // Show bet params

  return (
    <Layout>{slug && <BetParams betId={slug as string}></BetParams>}</Layout>
  );
}

function BetParams(props: { betId: string }) {
  const { data, isError, isLoading, isSuccess } = useContractRead({
    address: process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS,
    abi: betContractAbi,
    functionName: "getParams",
    args: [BigNumber.from(props.betId)],
  });

  if (isSuccess && data) {
    return (
      <Box>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Bet #{props.betId}
        </Typography>
        <Typography gutterBottom>symbol: {data.symbol}</Typography>
        <Typography gutterBottom>
          minPrice: {data.minPrice.toString()}
        </Typography>
        <Typography gutterBottom>
          maxPrice: {data.maxPrice.toString()}
        </Typography>
        <Typography gutterBottom>
          dayStartTimestamp: {data.dayStartTimestamp.toString()}
        </Typography>
        <Typography gutterBottom>
          rate: {ethers.utils.formatEther(data.rate)}
        </Typography>
        <Typography gutterBottom>
          firstMember: {data.firstMember.toString()}
        </Typography>
        <Typography gutterBottom>
          secondMember: {data.secondMember.toString()}
        </Typography>
        <Typography gutterBottom>winner: {data.winner.toString()}</Typography>
      </Box>
    );
  }

  return <></>;
}
