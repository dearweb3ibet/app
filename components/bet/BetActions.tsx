import { Stack, SxProps } from "@mui/material";
import { XxlLoadingButton } from "components/styled";
import { betContractAbi } from "contracts/abi/betContract";
import { BigNumber } from "ethers";
import useToasts from "hooks/useToast";
import { useEffect } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

/**
 * A component with bet actions.
 */
export default function BetActions(props: {
  id: string;
  isClosed: boolean;
  onUpdate: Function;
  sx?: SxProps;
}) {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      sx={{ ...props.sx }}
    >
      <BetShareButton id={props.id} />
      {!props.isClosed && (
        <BetCloseButton id={props.id} onSuccess={() => props.onUpdate?.()} />
      )}
    </Stack>
  );
}

function BetShareButton(props: { id: string }) {
  const { showToastSuccess } = useToasts();
  const betLink = `${global.window.location.origin}/bets/${props.id}`;

  return (
    <XxlLoadingButton
      variant="outlined"
      onClick={() => {
        navigator.clipboard.writeText(betLink);
        showToastSuccess("Link copied");
      }}
    >
      Share
    </XxlLoadingButton>
  );
}

function BetCloseButton(props: { id: string; onSuccess?: Function }) {
  const { showToastSuccess } = useToasts();

  // Contract states
  const { config: contractConfig } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS,
    abi: betContractAbi,
    functionName: "close",
    args: [BigNumber.from(props.id)],
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
      showToastSuccess("Bet is closed! The winnings are sent!");
      props.onSuccess?.();
    }
  }, [isTransactionSuccess]);

  return (
    <XxlLoadingButton
      variant="contained"
      disabled={!contractWrite}
      loading={isContractWriteLoading || isTransactionLoading}
      onClick={() => contractWrite?.()}
    >
      Close Bet
    </XxlLoadingButton>
  );
}