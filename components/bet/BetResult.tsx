import { Stack, SxProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ThickDivider, WidgetTypography } from "components/styled";
import Widget from "components/widget";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { getContractsChain } from "utils/network";
import { useAccount } from "wagmi";

/**
 * A component with bet result.
 */
export default function BetResult(props: {
  id: string;
  isClosed: boolean;
  isSuccessful: boolean;
  feeForSuccess: BigNumber;
  feeForFailure: BigNumber;
  participants: readonly any[];
  sx?: SxProps;
}) {
  const { address } = useAccount();
  const [winning, setWinning] = useState<BigNumber | undefined>();
  const [losing, setLosing] = useState<BigNumber | undefined>();

  useEffect(() => {
    const isAddressParticipant = props.participants.some(
      (p) => p.accountAddress === address
    );
    // Define winning and losing
    if (props.isClosed && isAddressParticipant) {
      const participant = props.participants.find(
        (p) => p.accountAddress === address
      );
      const participantWinning: BigNumber = participant.winning;
      const participantFee: BigNumber = participant.fee;
      if (participantWinning.eq(ethers.constants.Zero)) {
        setLosing(participantFee);
      } else {
        setWinning(participantWinning);
      }
    }
    // Clear winning and losing
    else {
      setWinning(undefined);
      setLosing(undefined);
    }
  }, [address, props.isClosed, props.participants]);

  if (props.isClosed) {
    return (
      <Box sx={{ width: 1, ...props.sx }}>
        <ThickDivider sx={{ mb: 4 }} />
        {/* Text divider */}
        <Typography fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
          and
        </Typography>
        {/* Is successful or not */}
        <Widget title="Bet" color="#2B6EFD" sx={{ mb: 2 }}>
          <WidgetTypography>
            {props.isSuccessful ? "👍 successed" : "👎 failed"}
          </WidgetTypography>
        </Widget>
        {/* Text divider */}
        <Typography fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
          and participants for {props.isSuccessful ? "success" : "failure"}{" "}
          shared
        </Typography>
        {/* Total winning */}
        <Widget title="Winning" color="#410C92" sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1}>
            <WidgetTypography>
              {props.isSuccessful
                ? ethers.utils.formatEther(props.feeForFailure)
                : ethers.utils.formatEther(props.feeForSuccess)}
            </WidgetTypography>
            <WidgetTypography>
              {getContractsChain().nativeCurrency?.symbol}
            </WidgetTypography>
          </Stack>
        </Widget>
        {/* Text divider */}
        {(winning || losing) && (
          <Typography fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
            and you
          </Typography>
        )}
        {/* Account winning or losing */}
        {(winning || losing) && (
          <Widget title={winning ? "Won" : "Lost"} color="#9747FF">
            <Stack direction="row" spacing={1}>
              {winning && (
                <WidgetTypography>
                  {ethers.utils.formatEther(winning)}
                </WidgetTypography>
              )}
              {losing && (
                <WidgetTypography>
                  {ethers.utils.formatEther(losing)}
                </WidgetTypography>
              )}
              <WidgetTypography>
                {getContractsChain().nativeCurrency?.symbol}
              </WidgetTypography>
            </Stack>
          </Widget>
        )}
      </Box>
    );
  }
  return <></>;
}
