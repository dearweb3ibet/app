import { SxProps, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { contestContractAbi } from "contracts/abi/contestContract";
import { BigNumber, ethers } from "ethers";
import { getContractsChain } from "utils/network";
import { useBalance, useContractRead } from "wagmi";

/**
 * A component with contest title and details.
 */
export default function ContestHeader(props: {
  waveId: BigNumber;
  sx?: SxProps;
}) {
  // State of contract reading to get wave
  const { data: wave } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTEST_CONTRACT_ADDRESS,
    abi: contestContractAbi,
    functionName: "getWave",
    args: [props.waveId],
  });

  // State of contract reading to get balance
  const { data: contestBalance } = useBalance({
    addressOrName: process.env.NEXT_PUBLIC_CONTEST_CONTRACT_ADDRESS,
  });

  return (
    <Box sx={{ ...props.sx }}>
      {/* Title */}
      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        sx={{ mb: 1.5 }}
      >
        🏆 Contest #{props.waveId.toNumber()}
      </Typography>
      {/* Details if wave is not closed */}
      {wave && wave.closeTimestamp.eq(ethers.constants.Zero) && (
        <Typography textAlign="center">
          <strong>Top {wave.winnersNumber.toNumber()}</strong> accounts will
          share{" "}
          <strong>
            {contestBalance?.formatted}{" "}
            {getContractsChain().nativeCurrency?.symbol}
          </strong>{" "}
          after{" "}
          <strong>
            {new Date(wave.endTimestamp.toNumber() * 1000).toLocaleDateString()}
          </strong>
          .
        </Typography>
      )}
      {/* Details if wave is closed */}
      {wave && !wave.closeTimestamp.eq(ethers.constants.Zero) && (
        <Typography textAlign="center">
          Closed on{" "}
          <strong>
            {new Date(
              wave.closeTimestamp.toNumber() * 1000
            ).toLocaleDateString()}
          </strong>
          .
        </Typography>
      )}
    </Box>
  );
}
