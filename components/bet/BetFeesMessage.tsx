import { Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import { betContractAbi } from "contracts/abi/betContract";
import { useContractRead } from "wagmi";

/**
 * A component with message about bet fees.
 */
export default function BetFeesMessage(props: { sx?: SxProps }) {
  // State of contract reading to get bet contest fee percent
  const { data: contestFeePercent } = useContractRead({
    address: process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS,
    abi: betContractAbi,
    functionName: "getContestFeePercent",
  });

  // State of contract reading to get bet usage fee percent
  const { data: usageFeePercent } = useContractRead({
    address: process.env.NEXT_PUBLIC_BET_CONTRACT_ADDRESS,
    abi: betContractAbi,
    functionName: "getUsageFeePercent",
  });

  if (contestFeePercent && usageFeePercent) {
    return (
      <Box sx={{ maxWidth: 420, ...props.sx }}>
        <Typography textAlign="center">
          <strong>{contestFeePercent.toNumber()}%</strong> of the winnings will
          be sent to the contest and{" "}
          <strong>{usageFeePercent.toNumber()}%</strong> will be used as an
          application fee
        </Typography>
      </Box>
    );
  }

  return <></>;
}
