import { Link as MuiLink, Stack, SxProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BigNumber, ethers } from "ethers";
import Bet from "interfaces/Bet";
import { addressToShortAddress, symbolToShortSymbol } from "utils/converters";
import { getContractsChain } from "utils/network";

/**
 * A component with a bet card.
 */
export default function BetCard(props: { bet: Bet; sx?: SxProps }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        border: "solid",
        borderColor: !props.bet.isClosed
          ? "divider"
          : props.bet.isSuccessful
          ? "success.main"
          : "error.main",
        borderWidth: 6,
        borderRadius: 2,
        py: 2,
        px: 4,
        ...props.sx,
      }}
    >
      {/* Link, author */}
      <Stack sx={{ flexGrow: 1, justifyContent: "center" }}>
        <Typography>
          {!props.bet.isClosed ? "⌛" : props.bet.isSuccessful ? "👍" : "👎"}{" "}
          <MuiLink href={`/bets/${props.bet.id}`} target="_blank">
            <strong>#{props.bet.id}</strong>
          </MuiLink>
        </Typography>
        <Typography>
          👤{" "}
          <MuiLink
            href={`/accounts/${props.bet.creatorAddress}`}
            target="_blank"
          >
            <strong>{addressToShortAddress(props.bet.creatorAddress)}</strong>
          </MuiLink>
        </Typography>
      </Stack>
      {/* Symbol */}
      <Stack
        sx={{
          alignItems: { md: "flex-end" },
          justifyContent: "center",
          ml: { md: 8 },
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          {symbolToShortSymbol(props.bet.symbol)}
        </Typography>
      </Stack>
      {/* More, less, on */}
      <Stack
        sx={{
          alignItems: { md: "flex-end" },
          justifyContent: "center",
          ml: { md: 6 },
          minWidth: { md: 160 },
        }}
      >
        <Typography>
          MORE <strong>{props.bet.targetMinPrice} USD</strong>
        </Typography>
        <Typography>
          LESS <strong>{props.bet.targetMaxPrice} USD</strong>
        </Typography>
        <Typography>
          ON{" "}
          <strong>
            {new Date(
              BigNumber.from(props.bet.targetTimestamp).toNumber() * 1000
            ).toLocaleDateString()}
          </strong>
        </Typography>
      </Stack>
      {/* Participants, fee */}
      <Stack
        sx={{
          alignItems: { md: "flex-end" },
          justifyContent: "center",
          ml: { md: 6 },
          minWidth: { md: 120 },
        }}
      >
        <Typography fontWeight={700}>
          {props.bet.participantsNumber} 👥
        </Typography>
        <Typography fontWeight={700}>
          {ethers.utils.formatEther(
            BigNumber.from(props.bet.feeForSuccess).add(
              BigNumber.from(props.bet.feeForFailure)
            )
          )}{" "}
          {getContractsChain().nativeCurrency?.symbol}
        </Typography>
      </Stack>
    </Box>
  );
}
