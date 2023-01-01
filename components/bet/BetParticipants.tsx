import { Link as MuiLink, Stack, SxProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ThickDivider } from "components/styled";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { addressToShortAddress } from "utils/converters";
import { getContractsChain } from "utils/network";
import { useAccount } from "wagmi";

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
      <BetParticipantsCard
        participants={participantsForSuccess}
        isParticipantsForBetSuccess={true}
        participantsFee={props.feeForSuccess}
        creatorAddress={props.creatorAddress}
        sx={{ bgcolor: "#1DB954", mb: 2 }}
      />
      <BetParticipantsCard
        participants={participantsForFailure}
        isParticipantsForBetSuccess={false}
        participantsFee={props.feeForFailure}
        creatorAddress={props.creatorAddress}
        sx={{ bgcolor: "#FF4400" }}
      />
    </Box>
  );
}

function BetParticipantsCard(props: {
  participants: readonly any[];
  isParticipantsForBetSuccess: boolean;
  participantsFee: BigNumber;
  creatorAddress: string;
  sx?: SxProps;
}) {
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
        {props.isParticipantsForBetSuccess
          ? "👍 for bet success"
          : "👎 for bet failure"}
      </Typography>
      {/* Fee */}
      <Typography
        textAlign="center"
        sx={{ color: "#FFFFFF", fontWeight: 700, mb: 2 }}
      >
        {ethers.utils.formatEther(props.participantsFee)}{" "}
        {getContractsChain().nativeCurrency?.symbol}
      </Typography>
      {/* Participants */}
      {props.participants.length > 0 ? (
        <Stack spacing={1}>
          {props.participants.map((participant, index) => (
            <BetParticipantCard
              key={index}
              creatorAddress={props.creatorAddress}
              participantAddress={participant.accountAddress}
              participantFee={participant.fee}
            />
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

function BetParticipantCard(props: {
  participantAddress: string;
  participantFee: BigNumber;
  creatorAddress: string;
  sx?: SxProps;
}) {
  const { address } = useAccount();

  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={1}
      sx={{ bgcolor: "#FFFFFF", py: 2, px: 4, borderRadius: 3, ...props.sx }}
    >
      <MuiLink href={`/accounts/${props.participantAddress}`} fontWeight={700}>
        {addressToShortAddress(props.participantAddress)}
      </MuiLink>
      {props.participantAddress === props.creatorAddress && (
        <Typography fontWeight={700}>(author)</Typography>
      )}
      {props.participantAddress === address && (
        <Typography fontWeight={700}>(you)</Typography>
      )}
      <Typography>placed</Typography>
      <Typography fontWeight={700}>
        {ethers.utils.formatEther(props.participantFee)}{" "}
        {getContractsChain().nativeCurrency?.symbol}
      </Typography>
    </Stack>
  );
}
