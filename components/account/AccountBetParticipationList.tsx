import { Skeleton, SxProps } from "@mui/material";
import { Box, Stack } from "@mui/system";
import BetCard from "components/bet/BetCard";
import useError from "hooks/useError";
import useSubgraph from "hooks/useSubgraph";
import { useEffect, useState } from "react";

/**
 * A component with account bet participations.
 *
 * TODO: Add button load more
 */
export default function AccountBetParticipationList(props: {
  address: string;
  isCreator?: boolean;
  isFeeForSuccess?: boolean;
  sx?: SxProps;
}) {
  const { handleError } = useError();
  const { findBetParticipants } = useSubgraph();
  const [betParticipants, setBetParticipants] = useState<[] | undefined>();

  useEffect(() => {
    // Clear bet participants
    setBetParticipants(undefined);
    // Load bet participants
    findBetParticipants(
      props.address,
      props.isCreator,
      props.isFeeForSuccess,
      3,
      0
    )
      .then((result) => setBetParticipants(result))
      .catch((error) => handleError(error, true));
  }, [props.address, props.isCreator, props.isFeeForSuccess]);

  return (
    <Box sx={{ ...props.sx }}>
      {betParticipants ? (
        <Stack spacing={2}>
          {betParticipants.map((participant: any) => (
            <BetCard
              id={participant.bet.id}
              creatorAddress={participant.bet.params.creatorAddress}
              symbol={participant.bet.params.symbol}
              targetMinPrice={participant.bet.params.targetMinPrice}
              targetMaxPrice={participant.bet.params.targetMaxPrice}
              targetTimestamp={participant.bet.params.targetTimestamp}
              feeForSuccess={participant.bet.params.feeForSuccess}
              feeForFailure={participant.bet.params.feeForFailure}
              isClosed={participant.bet.params.isClosed}
              isSuccessful={participant.bet.params.isSuccessful}
              participantsNumber={participant.bet.participantsNumber}
            />
          ))}
        </Stack>
      ) : (
        <Skeleton variant="rounded" sx={{ width: "100%", height: 48 }} />
      )}
    </Box>
  );
}
