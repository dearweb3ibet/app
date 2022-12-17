import { Stack, SxProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { WidgetLink, WidgetTypography } from "components/styled";
import WidgetWrapper from "components/widget/WidgetWrapper";
import { BigNumber, ethers } from "ethers";
import { addressToShortAddress, symbolToShortSymbol } from "utils/converters";
import { useNetwork } from "wagmi";

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
  const { chain } = useNetwork();

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
      <WidgetWrapper title="On" color="#E97E27" sx={{ mb: 2 }}>
        <WidgetTypography>
          {new Date(
            props.createdTimestamp.toNumber() * 1000
          ).toLocaleDateString()}
        </WidgetTypography>
      </WidgetWrapper>
      {/* Creator address */}
      <WidgetWrapper title="Account" color="#333333" sx={{ mb: 2 }}>
        <WidgetLink
          href={`/accounts/${props.creatorAddress.toString()}`}
          target="_blank"
        >
          🔗 {addressToShortAddress(props.creatorAddress.toString())}
        </WidgetLink>
      </WidgetWrapper>
      {/* Fee */}
      <WidgetWrapper title="Bet" color="#2B6EFD" sx={{ mb: 2 }}>
        <Stack direction="row" spacing={1}>
          <WidgetTypography>
            {ethers.utils.formatEther(props.creatorFee)}
          </WidgetTypography>
          <WidgetTypography>{chain?.nativeCurrency?.symbol}</WidgetTypography>
        </Stack>
      </WidgetWrapper>
      {/* Symbol */}
      <WidgetWrapper title="That" color="#410c92" sx={{ mb: 2 }}>
        <WidgetTypography>{symbolToShortSymbol(props.symbol)}</WidgetTypography>
      </WidgetWrapper>
      {/* Text divider */}
      <Typography fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
        will cost
      </Typography>
      {/* Target min price */}
      <WidgetWrapper
        title="More than"
        subtitle="USD"
        color="#1DB954"
        sx={{ mb: 2 }}
      >
        <WidgetTypography>{props.targetMinPrice.toString()}</WidgetTypography>
      </WidgetWrapper>
      {/* Text divider */}
      <Typography fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
        and
      </Typography>
      {/* Target max price */}
      <WidgetWrapper
        title="Less than"
        subtitle="USD"
        color="#FF4400"
        sx={{ mb: 2 }}
      >
        <WidgetTypography>{props.targetMaxPrice.toString()}</WidgetTypography>
      </WidgetWrapper>
      {/* Target timestamp */}
      <WidgetWrapper title="On" color="#4B144B" sx={{ mb: 2 }}>
        <WidgetTypography>
          {new Date(
            props.targetTimestamp.toNumber() * 1000
          ).toLocaleDateString()}
        </WidgetTypography>
      </WidgetWrapper>
      {/* Text divider */}
      <Typography fontWeight={700} textAlign="center" sx={{ mb: 2 }}>
        and other accounts can take part in this bet
      </Typography>
      {/* Participation deadline timestamp */}
      <WidgetWrapper title="Before" color="#E97E27" sx={{ mb: 2 }}>
        <WidgetTypography>
          {new Date(
            props.participationDeadlineTimestamp.toNumber() * 1000
          ).toLocaleDateString()}
        </WidgetTypography>
      </WidgetWrapper>
    </Box>
  );
}
