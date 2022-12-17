import { Link as MuiLink, Stack, SxProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BigNumber, ethers } from "ethers";
import { addressToShortAddress, symbolToShortSymbol } from "utils/converters";
import { useNetwork } from "wagmi";

/**
 * A component with a bet card.
 */
export default function BetCard(props: {
  id: string;
  creatorAddress: string;
  symbol: string;
  targetMinPrice: string;
  targetMaxPrice: string;
  targetTimestamp: string;
  feeForSuccess: string;
  feeForFailure: string;
  isClosed: boolean;
  isSuccessful: boolean;
  participantsNumber: number;
  sx?: SxProps;
}) {
  const { chain } = useNetwork();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: 1,
        border: "solid",
        borderColor: !props.isClosed
          ? "divider"
          : props.isSuccessful
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
          {!props.isClosed ? "⌛" : props.isSuccessful ? "👍" : "👎"}{" "}
          <MuiLink href={`/bets/${props.id}`} target="_blank">
            <strong>#{props.id}</strong>
          </MuiLink>
        </Typography>
        <Typography>
          👤{" "}
          <MuiLink href={`/accounts/${props.creatorAddress}`} target="_blank">
            <strong>{addressToShortAddress(props.creatorAddress)}</strong>
          </MuiLink>
        </Typography>
      </Stack>
      {/* Symbol */}
      <Stack sx={{ alignItems: "flex-end", justifyContent: "center", ml: 6 }}>
        <Typography variant="h4" fontWeight={700}>
          {symbolToShortSymbol(props.symbol)}
        </Typography>
      </Stack>
      {/* More, less, on */}
      <Stack sx={{ alignItems: "flex-end", justifyContent: "center", ml: 6 }}>
        <Typography>
          MORE <strong>{props.targetMinPrice} USD</strong>
        </Typography>
        <Typography>
          LESS <strong>{props.targetMaxPrice} USD</strong>
        </Typography>
        <Typography>
          ON{" "}
          <strong>
            {new Date(
              BigNumber.from(props.targetTimestamp).toNumber() * 1000
            ).toLocaleDateString()}
          </strong>
        </Typography>
      </Stack>
      {/* Participants, fee */}
      <Stack sx={{ alignItems: "flex-end", justifyContent: "center", ml: 6 }}>
        <Typography fontWeight={700}>{props.participantsNumber} 👥</Typography>
        <Typography fontWeight={700}>
          {ethers.utils.formatEther(
            BigNumber.from(props.feeForSuccess).add(
              BigNumber.from(props.feeForFailure)
            )
          )}{" "}
          {chain?.nativeCurrency?.symbol}
        </Typography>
      </Stack>
    </Box>
  );
}
