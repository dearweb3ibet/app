import { Skeleton } from "@mui/material";
import BetActions from "components/bet/BetActions";
import BetParams from "components/bet/BetParams";
import BetParticipants from "components/bet/BetParticipants";
import BetResult from "components/bet/BetResult";
import BetTakePartForm from "components/bet/BetTakePartForm";
import Layout from "components/layout";
import { CentralizedBox } from "components/styled";
import { betContractAbi } from "contracts/abi/betContract";
import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

/**
 * Page with a bet.
 */
export default function Bet() {
  const router = useRouter();
  const { slug } = router.query;
  const [betId, setBetId] = useState<string | undefined>();

  // State of contract reading to get bet params
  const {
    data: betParams,
    refetch: refetchBetParams,
    isFetching: isBetParamsFetching,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS,
    abi: betContractAbi,
    functionName: "getParams",
    args: betId ? [BigNumber.from(betId)] : undefined,
    enabled: betId !== undefined,
  });

  // State of contract reading to get bet participants
  const {
    data: betParticipants,
    refetch: refetchBetParticipants,
    isFetching: isBetParticipantsFetching,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS,
    abi: betContractAbi,
    functionName: "getParticipants",
    args: betId ? [BigNumber.from(betId)] : undefined,
    enabled: betId !== undefined,
  });

  useEffect(() => {
    setBetId(slug ? (slug as string) : undefined);
  }, [slug]);

  const isDataReady =
    betId &&
    betParams &&
    betParticipants &&
    !isBetParamsFetching &&
    !isBetParticipantsFetching;

  return (
    <Layout>
      <CentralizedBox>
        {isDataReady ? (
          <>
            <BetParams
              id={betId}
              createdTimestamp={betParams.createdTimestamp}
              creatorAddress={betParams.creatorAddress}
              creatorFee={betParams.creatorFee}
              symbol={betParams.symbol}
              targetMinPrice={betParams.targetMinPrice}
              targetMaxPrice={betParams.targetMaxPrice}
              targetTimestamp={betParams.targetTimestamp}
              participationDeadlineTimestamp={
                betParams.participationDeadlineTimestamp
              }
              isClosed={betParams.isClosed}
              isSuccessful={betParams.isSuccessful}
            />
            <BetResult
              id={betId}
              isClosed={betParams.isClosed}
              isSuccessful={betParams.isSuccessful}
              feeForSuccess={betParams.feeForSuccess}
              feeForFailure={betParams.feeForFailure}
              participants={betParticipants}
              sx={{ mt: 6 }}
            />
            <BetActions
              id={betId}
              isClosed={betParams.isClosed}
              onUpdate={() => {
                refetchBetParams();
                refetchBetParticipants();
              }}
              sx={{ mt: 4 }}
            />
            <BetTakePartForm
              id={betId}
              isClosed={betParams.isClosed}
              participants={betParticipants}
              onSuccess={() => {
                refetchBetParams();
                refetchBetParticipants();
              }}
              sx={{ mt: 6 }}
            />
            <BetParticipants
              id={betId}
              creatorAddress={betParams.creatorAddress}
              feeForSuccess={betParams.feeForSuccess}
              feeForFailure={betParams.feeForFailure}
              participants={betParticipants}
              sx={{ mt: 6 }}
            />
          </>
        ) : (
          <Skeleton variant="rounded" width={540} height={48} />
        )}
      </CentralizedBox>
    </Layout>
  );
}
