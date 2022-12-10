import { Skeleton } from "@mui/material";
import ContestHeader from "components/contest/ContestHeader";
import ContestParticipants from "components/contest/ContestParticipants";
import Layout from "components/layout";
import { CentralizedBox } from "components/styled";
import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * Page with a contest wave.
 */
export default function ContestWave() {
  const router = useRouter();
  const { slug } = router.query;
  const [waveIndex, setWaveIndex] = useState<BigNumber | undefined>();

  useEffect(() => {
    setWaveIndex(slug ? BigNumber.from(slug as string) : undefined);
  }, [slug]);

  return (
    <Layout>
      <CentralizedBox>
        {waveIndex && !waveIndex.isNegative() ? (
          <>
            <ContestHeader waveIndex={waveIndex} />
            <ContestParticipants waveIndex={waveIndex} sx={{ mt: 3 }} />
          </>
        ) : (
          <Skeleton variant="rounded" width={540} height={48} />
        )}
      </CentralizedBox>
    </Layout>
  );
}
