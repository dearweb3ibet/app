import { contestContractAbi } from "contracts/abi/contestContract";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContractRead } from "wagmi";

/**
 * Page that redirects to last contest wave.
 */
export default function Contest() {
  const router = useRouter();

  // State of contract reading to get waves number
  const { data: lastWaveIndex } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTEST_CONTRACT_ADDRESS,
    abi: contestContractAbi,
    functionName: "getLastWaveIndex",
  });

  useEffect(() => {
    if (lastWaveIndex) {
      router.push(`/contests/waves/${lastWaveIndex.toString()}`);
    }
  }, [lastWaveIndex]);

  return <></>;
}
