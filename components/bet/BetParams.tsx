import { Stack, SxProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { WidgetLink, WidgetTypography } from "components/styled";
import Widget from "components/widget";
import { BigNumber, ethers } from "ethers";
import { addressToShortAddress, symbolToShortSymbol } from "utils/converters";
import { getContractsChain } from "utils/network";

/**
 * A component with bet parameters.
 */
export default function BetParams(props: {
  id: string;
  createdTimestamp: BigNumber;
  creatorAddress: string;
  creatorFee: BigNumber;
  symbol: string;
  targetMinPrice: BigNumber;
  targetMaxPrice: BigNumber;
  targetTimestamp: BigNumber;
  participationDeadlineTimestamp: BigNumber;
  isClosed: boolean;
  isSuccessful: boolean;
  sx?: SxProps;
}) {
  return (
    <Box sx={{ ...props.sx }}>
      {/* Id */}
      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        sx={{ mb: 3 }}
      >
        {!props.isClosed ? "⌛" : props.isSuccessful ? "👍" : "👎"} Bet #
        {props.id}
      </Typography>
      {/* Created timestamp */}
      <Widget title="On" color="#E97E27" sx={{ mb: 2 }}>
        <WidgetTypography>
          {new Date(
            props.createdTimestamp.toNumber() * 1000
          ).toLocaleDateString()}
        </WidgetTypography>
      </Widget>
      {/* Creator address */}
      <Widget title="Account" color="#333333" sx={{ mb: 2 }}>
        <WidgetLink
          href={`/accounts/${props.creatorAddress.toString()}`}
          target="_blank"
        >
          🔗 {addressToShortAddress(props.creatorAddress.toString())}
        </WidgetLink>
      </Widget>
      {/* Fee */}
      <Widget title="Bet" color="#2B6EFD" sx={{ mb: 2 }}>
        <Stack direction="row" spacing={1}>
          <WidgetTypography>
            {ethers.utils.formatEther(props.creatorFee)}
          </WidgetTypography>
          <WidgetTypography>
            {getContractsChain().nativeCurrency?.symbol}
          </WidgetTypography>
        </Stack>
      </Widget>
      {/* Symbol */}
      <Widget title="That" color="#410c92" sx={{ mb: 2 }}>
        <WidgetTypography>{symbolToShortSymbol(props.symbol)}</WidgetTypography>
      </Widget>
      {/* Text divider */}
      <Typography fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
        will cost
      </Typography>
      {/* Target min price */}
      <Widget title="More than" color="#1DB954" sx={{ mb: 2 }}>
        <Stack direction="row" spacing={1}>
          <WidgetTypography>{props.targetMinPrice.toString()}</WidgetTypography>
          <WidgetTypography>USD</WidgetTypography>
        </Stack>
      </Widget>
      {/* Text divider */}
      <Typography fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
        and
      </Typography>
      {/* Target max price */}
      <Widget title="Less than" color="#FF4400" sx={{ mb: 2 }}>
        <Stack direction="row" spacing={1}>
          <WidgetTypography>{props.targetMaxPrice.toString()}</WidgetTypography>
          <WidgetTypography>USD</WidgetTypography>
        </Stack>
      </Widget>
      {/* Target timestamp */}
      <Widget title="On" color="#4B144B" sx={{ mb: 2 }}>
        <WidgetTypography>
          {new Date(
            props.targetTimestamp.toNumber() * 1000
          ).toLocaleDateString()}
        </WidgetTypography>
      </Widget>
      {/* Text divider */}
      <Typography fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
        and other accounts can take part in this bet
      </Typography>
      {/* Participation deadline timestamp */}
      <Widget title="Before" color="#E97E27" sx={{ mb: 2 }}>
        <WidgetTypography>
          {new Date(
            props.participationDeadlineTimestamp.toNumber() * 1000
          ).toLocaleDateString()}
        </WidgetTypography>
      </Widget>
    </Box>
  );
}
