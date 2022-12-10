import { Stack, SxProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ThickDivider } from "components/styled";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { addressToShortAddress } from "utils/converters";
import { useAccount, useNetwork } from "wagmi";

/**
 * A component with bet participants.
 */
export default function BetParticipants(props: {
  id: string;
  creatorAddress: string;
  feeForSuccess: BigNumber;
  feeForFailure: BigNumber;
  participants: readonly any[];
  sx?: SxProps;
}) {
  const [participantsForSuccess, setParticipantsForSuccess] = useState<
    Array<any>
  >([]);
  const [participantsForFailure, setParticipantsForFailure] = useState<
    Array<any>
  >([]);

  useEffect(() => {
    const participantsForSuccess: any[] = [];
    const participantsForFailure: any[] = [];
    for (const participant of props.participants) {
      if (participant.isFeeForSuccess) {
        participantsForSuccess.push(participant);
      } else {
        participantsForFailure.push(participant);
      }
    }
    setParticipantsForSuccess(participantsForSuccess);
    setParticipantsForFailure(participantsForFailure);
  }, [props.participants]);

  return (
    <Box sx={{ ...props.sx }}>
      <ThickDivider sx={{ mb: 4 }} />
      <Typography fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
        or look at participations
      </Typography>
      <BetOneSideParticipants
        title="👍 for bet success"
        fee={props.feeForSuccess}
        participants={participantsForSuccess}
        creatorAddress={props.creatorAddress}
        sx={{ bgcolor: "#1DB954", mb: 2 }}
      />
      <BetOneSideParticipants
        title="👎 for bet failure"
        fee={props.feeForFailure}
        participants={participantsForFailure}
        creatorAddress={props.creatorAddress}
        sx={{ bgcolor: "#FF4400" }}
      />
    </Box>
  );
}

function BetOneSideParticipants(props: {
  title: string;
  fee: BigNumber;
  participants: readonly any[];
  creatorAddress: string;
  sx?: SxProps;
}) {
  const { chain } = useNetwork();
  const { address } = useAccount();

  return (
    <Box
      sx={{
        width: 540,
        bgcolor: "#000000",
        borderRadius: 3,
        py: 2,
        px: 4,
        ...props.sx,
      }}
    >
      {/* Title */}
      <Typography
        textAlign="center"
        variant="h4"
        sx={{ color: "#FFFFFF", fontWeight: 700, mb: 1 }}
      >
        {props.title}
      </Typography>
      {/* Fee */}
      <Typography
        textAlign="center"
        sx={{ color: "#FFFFFF", fontWeight: 700, mb: 2 }}
      >
        {ethers.utils.formatEther(props.fee)} {chain?.nativeCurrency?.symbol}
      </Typography>
      {/* Participants */}
      {props.participants.length > 0 ? (
        <Stack spacing={1}>
          {props.participants.map((participant, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={2}
              sx={{ bgcolor: "#FFFFFF", py: 2, px: 4, borderRadius: 3 }}
            >
              <Typography>
                {addressToShortAddress(participant.accountAddress)}
              </Typography>
              {participant.accountAddress === props.creatorAddress && (
                <Typography>(author)</Typography>
              )}
              {participant.accountAddress === address && (
                <Typography>(you)</Typography>
              )}
              <Typography>placed</Typography>
              <Typography>
                {ethers.utils.formatEther(participant.fee)}{" "}
                {chain?.nativeCurrency?.symbol}
              </Typography>
            </Stack>
          ))}
        </Stack>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ bgcolor: "#FFFFFF", py: 2, px: 4, borderRadius: 3 }}
        >
          <Typography>no one yet</Typography>
        </Stack>
      )}
    </Box>
  );
}
