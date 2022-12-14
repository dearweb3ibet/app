import { SxProps } from "@mui/material";
import { Box, Stack } from "@mui/system";
import BetCard from "components/bet/BetCard";
import { FullWidthSkeleton, XxlLoadingButton } from "components/styled";
import useError from "hooks/useError";
import useSubgraph from "hooks/useSubgraph";
import BetParticipant from "interfaces/BetParticipant";
import { useEffect, useState } from "react";

/**
 * A component with account bet participations.
 */
export default function AccountBetParticipationList(props: {
  address: string;
  isCreator?: boolean;
  isFeeForSuccess?: boolean;
  sx?: SxProps;
}) {
  const { handleError } = useError();
  const { findBetParticipants } = useSubgraph();
  const [participants, setParticipants] = useState<
    Array<BetParticipant> | undefined
  >();
  const [isMoreParticipantsExist, setIsMoreParticipantsExist] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 3;

  async function loadMoreParticipants() {
    try {
      const nextPageNumber = pageNumber + 1;
      const loadedParticipants = await findBetParticipants(
        props.address,
        props.isCreator,
        props.isFeeForSuccess,
        pageSize,
        (nextPageNumber - 1) * pageSize
      );
      setParticipants(
        participants
          ? [...participants, ...loadedParticipants]
          : loadedParticipants
      );
      setPageNumber(nextPageNumber);
      if (loadedParticipants.length === 0) {
        setIsMoreParticipantsExist(false);
      }
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    setParticipants(undefined);
    loadMoreParticipants();
  }, [props.address, props.isCreator, props.isFeeForSuccess]);

  return (
    <Box sx={{ ...props.sx }}>
      {participants ? (
        <>
          {/* List */}
          <Stack spacing={2}>
            {participants.map((participant) => (
              <BetCard key={participant.id} bet={participant.bet} />
            ))}
          </Stack>
          {/* Actions */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            {isMoreParticipantsExist && (
              <XxlLoadingButton
                variant="outlined"
                onClick={() => {
                  loadMoreParticipants();
                }}
              >
                Load More
              </XxlLoadingButton>
            )}
          </Stack>
        </>
      ) : (
        <FullWidthSkeleton />
      )}
    </Box>
  );
}
