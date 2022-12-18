import { Link as MuiLink, Stack, SxProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BigNumber } from "ethers";
import useError from "hooks/useError";
import useSubgraph from "hooks/useSubgraph";
import ContestWaveParticipant from "interfaces/ContestWaveParticipant";
import { useEffect, useState } from "react";
import { addressToShortAddress } from "utils/converters";

/**
 * A component with contest wave participants.
 */
export default function ContestParticipants(props: {
  waveIndex: BigNumber;
  sx?: SxProps;
}) {
  const { handleError } = useError();
  const { findContestWaveParticipants } = useSubgraph();
  const [waveParticipants, setWaveParticipants] = useState<
    ContestWaveParticipant[] | undefined
  >();

  useEffect(() => {
    findContestWaveParticipants(
      process.env.NEXT_PUBLIC_CONTEST_CONTRACT_ADDRESS || "",
      props.waveIndex.toNumber()
    )
      .then((result) => setWaveParticipants(result))
      .catch((error) => handleError(error, true));
  }, [props.waveIndex]);

  return (
    <Box sx={{ ...props.sx }}>
      {waveParticipants &&
        waveParticipants.map((participant, index) => (
          <Box
            key={index}
            sx={{
              width: 540,
              border: "solid",
              borderRadius: 3,
              borderWidth: 4,
              borderColor: "divider",
              py: 1.5,
              px: 3,
              mb: 1,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h5" fontWeight={700}>
                #{index + 1}
              </Typography>
              <MuiLink
                href={`/accounts/${participant.accountAddress}`}
                target="_blank"
                fontWeight={700}
                sx={{ flexGrow: 1 }}
              >
                {addressToShortAddress(participant.accountAddress)}
              </MuiLink>
              <Typography fontWeight={700} color="success.main">
                👍 {participant.successes}
              </Typography>
              <Typography fontWeight={700} color="error.main">
                👎{participant.failures}
              </Typography>
            </Stack>
          </Box>
        ))}
    </Box>
  );
}
