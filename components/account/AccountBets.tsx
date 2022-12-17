import { Typography } from "@mui/material";
import BetList from "components/bet/BetList";
import useError from "hooks/useError";
import useSubgraph from "hooks/useSubgraph";
import { useEffect, useState } from "react";

/**
 * A component with account bets.
 *
 * TODO: Fix component
 */
export default function AccountBets(props: { address: string }) {
  const { handleError } = useError();
  const { findBets } = useSubgraph();
  const [accountBets, setAccountBets] = useState<any>();

  return <></>;

  useEffect(() => {
    findBets(props.address, 25, 0)
      .then((result) => setAccountBets(result))
      .catch((error) => handleError(error, true));
  }, [props.address]);

  return (
    <>
      <Typography
        variant="h6"
        fontWeight={700}
        textAlign="center"
        sx={{ mb: 3 }}
      >
        🤝 Account bets
      </Typography>
      {accountBets ? (
        <BetList bets={accountBets} />
      ) : (
        <Typography>No bets yet</Typography>
      )}
    </>
  );
}
