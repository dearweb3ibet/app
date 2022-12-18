import { Skeleton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BetCard from "components/bet/BetCard";
import Layout from "components/layout";
import { CentralizedBox } from "components/styled";
import useError from "hooks/useError";
import useSubgraph from "hooks/useSubgraph";
import Bet from "interfaces/Bet";
import { useEffect, useState } from "react";

/**
 * Page with bets.
 *
 * TODO: Add button to load more bets
 */
export default function Bets() {
  const { handleError } = useError();
  const { findBets } = useSubgraph();
  const [lastBets, setLastBets] = useState<Array<Bet> | undefined>();

  useEffect(() => {
    findBets()
      .then((result) => setLastBets(result))
      .catch((error) => handleError(error, true));
  }, []);

  return (
    <Layout>
      <CentralizedBox>
        {/* Last bets */}
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          sx={{ mb: 4 }}
        >
          👀 Last bets
        </Typography>
        {lastBets ? (
          <Box>
            <Stack spacing={2}>
              {lastBets.map((bet) => (
                <BetCard key={bet.id} bet={bet} />
              ))}
            </Stack>
          </Box>
        ) : (
          <Skeleton variant="rounded" sx={{ width: 540, height: 48 }} />
        )}
      </CentralizedBox>
    </Layout>
  );
}
