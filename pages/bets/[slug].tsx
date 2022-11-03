import { LoadingButton } from "@mui/lab";
import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Layout from "components/layout/Layout";
import { betContractAbi } from "contracts/abi/betContract";
import { BigNumber, ethers } from "ethers";
import useToast from "hooks/useToast";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

/**
 * Page with a bet.
 */
export default function Bet() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Layout>{slug && <BetParams betId={slug as string}></BetParams>}</Layout>
  );
}

function BetParams(props: { betId: string }) {
  const { data, isSuccess, refetch, isFetching } = useContractRead({
    address: process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS,
    abi: betContractAbi,
    functionName: "getParams",
    args: [BigNumber.from(props.betId)],
  });

  if (!isFetching && isSuccess && data) {
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
        {/* Buttons */}
        <Stack sx={{ mt: 3 }} direction="row" spacing={1}>
          <BetAcceptButton
            betId={BigNumber.from(props.betId)}
            betRate={data.rate}
            betFirstMember={data.firstMember}
            betSecondMember={data.secondMember}
            onSuccess={() => refetch()}
          />
          <BetVerifyButton />
          <LoadingButton
            variant="outlined"
            onClick={() => {
              refetch();
            }}
          >
            Refetch
          </LoadingButton>
        </Stack>
      </Box>
    );
  }

  return <></>;
}

function BetAcceptButton(props: {
  betId: BigNumber;
  betRate: BigNumber;
  betFirstMember: string;
  betSecondMember: string;
  onSuccess: Function;
}) {
  const { showToastSuccess } = useToast();
  // Account state
  const { address } = useAccount();
  // Contract states
  const contractArgs: any = [props.betId, { value: props.betRate }];
  const { config: contractConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS,
    abi: betContractAbi,
    functionName: "accept",
    args: contractArgs,
  });
  const {
    data: contractWriteData,
    isLoading: isContractWriteLoading,
    write: contractWrite,
  } = useContractWrite(contractConfig);
  const { isLoading: isTransactionLoading, isSuccess: isTransactionSuccess } =
    useWaitForTransaction({
      hash: contractWriteData?.hash,
    });

  // TODO: Disable if winner is not empty
  const isDisabled =
    !contractWrite ||
    props.betFirstMember === address ||
    props.betSecondMember !== ethers.constants.AddressZero;

  useEffect(() => {
    if (isTransactionSuccess) {
      showToastSuccess("Bet is accepted!");
      props.onSuccess();
    }
  }, [isTransactionSuccess]);

  return (
    <LoadingButton
      variant="contained"
      disabled={isDisabled}
      loading={isContractWriteLoading || isTransactionLoading}
      onClick={() => contractWrite?.()}
    >
      Accept
    </LoadingButton>
  );
}

// TODO: Implement button
function BetVerifyButton() {
  return (
    <LoadingButton variant="contained" disabled={true}>
      Verify
    </LoadingButton>
  );
}
