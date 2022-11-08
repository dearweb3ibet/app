import { Typography } from "@mui/material";
import Layout from "components/layout";
import { CentralizedBox, WidgetLink } from "components/styled";
import WidgetWrapper from "components/widget/WidgetWrapper";
import { topAccounts, winningDistributeDate, winningSize } from "data/mock";
import { addressToShortAddress } from "utils/converters";
import { useNetwork } from "wagmi";

/**
 * Page with top accounts.
 *
 * TODO: Use real data instead of mock data
 */
export default function TopAccounts() {
  // Network states
  const { chain } = useNetwork();

  return (
    <Layout>
      <CentralizedBox>
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          sx={{ mb: 1.5 }}
        >
          🏆 Top 100 Accounts,
        </Typography>
        {/* Subtitle */}
        <Typography
          variant="h6"
          textAlign="center"
          sx={{ maxWidth: 480, mb: 3 }}
        >
          Between which three random accounts will share{" "}
          <strong>
            {winningSize} {chain?.nativeCurrency?.symbol}
          </strong>{" "}
          on{" "}
          <strong>
            {new Date(winningDistributeDate * 1000).toLocaleDateString()}
          </strong>
          .
        </Typography>
        {topAccounts.map((account, index) => (
          <WidgetWrapper
            key={index}
            title={`#${index + 1}`}
            titleSx={{ minWidth: 72 }}
            subtitle={`${account.wins} wins`}
            color="#2B6EFD"
            colorAlpha={1 - index * (0.6 / topAccounts.length)}
            sx={{ width: 480, mb: 2 }}
          >
            <WidgetLink
              href={`/accounts/${account.address}`}
              target="_blank"
              sx={{ minWidth: 180 }}
            >
              🔗 {addressToShortAddress(account.address)}
            </WidgetLink>
          </WidgetWrapper>
        ))}
      </CentralizedBox>
    </Layout>
  );
}
