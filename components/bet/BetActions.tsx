import { Stack, SxProps } from "@mui/material";
import BetShareDialog from "components/dialog/BetShareDialog";
import { XxlLoadingButton } from "components/styled";
import { DialogContext } from "context/dialog";
import { betContractAbi } from "contracts/abi/betContract";
import { BigNumber } from "ethers";
import useToasts from "hooks/useToast";
import { useContext, useEffect } from "react";
import { getContractsChain } from "utils/network";
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
      direction={{ xs: "column", md: "row" }}
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
  const { showDialog, closeDialog } = useContext(DialogContext);

  return (
    <XxlLoadingButton
      variant="outlined"
      onClick={() =>
        showDialog?.(<BetShareDialog id={props.id} onClose={closeDialog} />)
      }
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
    chainId: getContractsChain().id,
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
