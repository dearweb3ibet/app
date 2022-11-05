import { Divider, Stack, Typography } from "@mui/material";
import BetParamsWrapper from "components/bet/BetParamsWrapper";
import Layout from "components/layout";
import {
  BetBox,
  BetParamsLink,
  BetParamsTypography,
  HugeLoadingButton,
} from "components/styled";
import { betContractAbi } from "contracts/abi/betContract";
import { BigNumber, ethers } from "ethers";
import useToasts from "hooks/useToast";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { addressToShortAddress } from "utils/converters";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
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
  // Network state
  const { chain } = useNetwork();
  const chainAddressLink = `${chain?.blockExplorers?.default.url}/address/`;
  // Contract states
  const { data, isSuccess, refetch, isFetching } = useContractRead({
    address: process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS,
    abi: betContractAbi,
    functionName: "getParams",
    args: [BigNumber.from(props.betId)],
  });

  if (!isFetching && isSuccess && data) {
    return (
      <BetBox>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
          🤞 Bet #{props.betId}
        </Typography>
        {/* First member */}
        <BetParamsWrapper title="Account" color="#333333" sx={{ mb: 2 }}>
          <BetParamsLink
            href={`${chainAddressLink}/${data.firstMember.toString()}`}
            target="_blank"
          >
            🔗 {addressToShortAddress(data.firstMember.toString())}
          </BetParamsLink>
        </BetParamsWrapper>
        {/* Rate */}
        <BetParamsWrapper
          title="Bet"
          subtitle={chain?.nativeCurrency?.symbol}
          color="#2B6EFD"
          sx={{ mb: 2 }}
        >
          <BetParamsTypography>
            {ethers.utils.formatEther(data.rate)}
          </BetParamsTypography>
        </BetParamsWrapper>
        {/* Created date */}
        <BetParamsWrapper title="On" color="#fa4878" sx={{ mb: 2 }}>
          <BetParamsTypography>
            {new Date(data.createdDate.toNumber() * 1000).toLocaleDateString()}
          </BetParamsTypography>
        </BetParamsWrapper>
        {/* Symbol */}
        <BetParamsWrapper title="That" color="#410c92" sx={{ mb: 2 }}>
          <BetParamsTypography>
            {data.symbol.replace("USD", "")}
          </BetParamsTypography>
        </BetParamsWrapper>
        {/* Text divider */}
        <Typography fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
          will be cost
        </Typography>
        {/* Min price */}
        <BetParamsWrapper
          title="More than"
          subtitle="USD"
          color="#1DB954"
          sx={{ mb: 2 }}
        >
          <BetParamsTypography>{data.minPrice.toString()}</BetParamsTypography>
        </BetParamsWrapper>
        {/* Text divider */}
        <Typography fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
          and
        </Typography>
        {/* Min price */}
        <BetParamsWrapper
          title="Less than"
          subtitle="USD"
          color="#FF4400"
          sx={{ mb: 2 }}
        >
          <BetParamsTypography>{data.maxPrice.toString()}</BetParamsTypography>
        </BetParamsWrapper>
        {/* Day start timestamp */}
        <BetParamsWrapper title="On" color="#4B144B">
          <BetParamsTypography>
            {new Date(
              data.dayStartTimestamp.toNumber() * 1000
            ).toLocaleDateString()}
          </BetParamsTypography>
        </BetParamsWrapper>
        {/* If second member defined */}
        {data.secondMember !== ethers.constants.AddressZero && (
          <>
            {/* Text divider */}
            <Typography
              fontWeight={700}
              textAlign="center"
              sx={{ mt: 2, mb: 2 }}
            >
              but
            </Typography>
            {/* Second member */}
            <BetParamsWrapper title="Account" color="#666666" sx={{ mb: 2 }}>
              <BetParamsLink
                href={`${chainAddressLink}/${data.secondMember.toString()}`}
                target="_blank"
              >
                🔗 {addressToShortAddress(data.secondMember.toString())}
              </BetParamsLink>
            </BetParamsWrapper>
            {/* Text divider */}
            <Typography fontWeight={700} textAlign="center">
              thinks otherwise
            </Typography>
          </>
        )}
        {/* If winner defined */}
        {data.winner !== ethers.constants.AddressZero && (
          <>
            {/* Text divider */}
            <Divider sx={{ width: 540, mt: 4, mb: 4 }} />
            <Typography fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
              in the end, the bet was won by
            </Typography>
            {/* Winner */}
            <BetParamsWrapper title="Account" color="#fd8e24" sx={{ mb: 2 }}>
              {data.winner === ethers.constants.AddressZero ? (
                <BetParamsTypography>❓ Undefined</BetParamsTypography>
              ) : (
                <BetParamsLink
                  href={`${chainAddressLink}/${data.winner.toString()}`}
                  target="_blank"
                >
                  🔗 {addressToShortAddress(data.winner.toString())}
                </BetParamsLink>
              )}
            </BetParamsWrapper>
            {/* Winning */}
            <Typography fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
              with
            </Typography>
            <BetParamsWrapper
              title="Winning"
              subtitle={chain?.nativeCurrency?.symbol}
              color="#13bb0c"
            >
              <BetParamsTypography>
                {ethers.utils.formatEther(data.winning)}
              </BetParamsTypography>
            </BetParamsWrapper>
          </>
        )}

        {/* Buttons */}
        <Stack direction="row" spacing={2} sx={{ mt: 6 }}>
          <BetBecomeOpponentButton
            betId={BigNumber.from(props.betId)}
            betRate={data.rate}
            betFirstMember={data.firstMember}
            betSecondMember={data.secondMember}
            onSuccess={() => refetch()}
          />
          <BetDetermineWinnerButton
            betId={BigNumber.from(props.betId)}
            betFirstMember={data.firstMember}
            betSecondMember={data.secondMember}
            betWinner={data.winner}
            onSuccess={() => refetch()}
          />
        </Stack>
      </BetBox>
    );
  }

  return <></>;
}

function BetBecomeOpponentButton(props: {
  betId: BigNumber;
  betRate: BigNumber;
  betFirstMember: string;
  betSecondMember: string;
  onSuccess: Function;
}) {
  const { showToastSuccess } = useToasts();
  const { address } = useAccount();
  const isButtonEnabled =
    props.betFirstMember !== address &&
    props.betSecondMember === ethers.constants.AddressZero;

  // Contract states
  const contractArgs: any = [props.betId, { value: props.betRate }];
  const { config: contractConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS,
    abi: betContractAbi,
    functionName: "accept",
    args: contractArgs,
    enabled: isButtonEnabled,
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

  useEffect(() => {
    if (isTransactionSuccess) {
      showToastSuccess("Now you are the bet opponent!");
      props.onSuccess();
    }
  }, [isTransactionSuccess]);

  return (
    <HugeLoadingButton
      variant="contained"
      disabled={!contractWrite || !isButtonEnabled}
      loading={isContractWriteLoading || isTransactionLoading}
      onClick={() => contractWrite?.()}
    >
      Become opponent
    </HugeLoadingButton>
  );
}

function BetDetermineWinnerButton(props: {
  betId: BigNumber;
  betFirstMember: string;
  betSecondMember: string;
  betWinner: string;
  onSuccess: Function;
}) {
  const { showToastSuccess } = useToasts();
  const isButtonEnabled =
    props.betFirstMember !== ethers.constants.AddressZero &&
    props.betSecondMember !== ethers.constants.AddressZero &&
    props.betWinner === ethers.constants.AddressZero;

  // Contract states
  const contractArgs: any = [props.betId];
  const { config: contractConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS,
    abi: betContractAbi,
    functionName: "verify",
    args: contractArgs,
    enabled: isButtonEnabled,
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

  useEffect(() => {
    if (isTransactionSuccess) {
      showToastSuccess("Winner is determined! The winning is sent!");
      props.onSuccess();
    }
  }, [isTransactionSuccess]);

  return (
    <HugeLoadingButton
      variant="contained"
      disabled={!contractWrite || !isButtonEnabled}
      loading={isContractWriteLoading || isTransactionLoading}
      onClick={() => contractWrite?.()}
    >
      Determine winner
    </HugeLoadingButton>
  );
}
