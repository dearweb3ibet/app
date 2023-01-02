import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BetCard from "components/bet/BetCard";
import Layout from "components/layout";
import {
  CentralizedBox,
  FullWidthSkeleton,
  XxlLoadingButton,
} from "components/styled";
import useError from "hooks/useError";
import useSubgraph from "hooks/useSubgraph";
import Bet from "interfaces/Bet";
import { useEffect, useState } from "react";

/**
 * Page with bets.
 */
export default function Bets() {
  const { handleError } = useError();
  const { findBets } = useSubgraph();
  const [bets, setBets] = useState<Array<Bet> | undefined>();
  const [isMoreBetsExist, setIsMoreBetsExist] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const pageSize = 3;

  async function loadMoreBets() {
    try {
      const nextPageNumber = pageNumber + 1;
      const loadedBets = await findBets(
        pageSize,
        (nextPageNumber - 1) * pageSize
      );
      setBets(bets ? [...bets, ...loadedBets] : loadedBets);
      setPageNumber(nextPageNumber);
      if (loadedBets.length === 0) {
        setIsMoreBetsExist(false);
      }
    } catch (error: any) {
      handleError(error, true);
    }
  }

  useEffect(() => {
    loadMoreBets();
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
        {bets ? (
          <Box>
            {/* List */}
            <Stack spacing={2}>
              {bets.map((bet) => (
                <BetCard key={bet.id} bet={bet} />
              ))}
              {/* Actions */}
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                sx={{ mt: 4 }}
              >
                {isMoreBetsExist && (
                  <XxlLoadingButton
                    variant="outlined"
                    onClick={() => {
                      loadMoreBets();
                    }}
                  >
                    Load More
                  </XxlLoadingButton>
                )}
              </Stack>
            </Stack>
          </Box>
        ) : (
          <FullWidthSkeleton />
        )}
      </CentralizedBox>
    </Layout>
  );
}
