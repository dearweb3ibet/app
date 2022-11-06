import { Typography } from "@mui/material";
import WidgetWrapper from "components/bet/WidgetWrapper";
import Layout from "components/layout";
import { CentralizedBox, WidgetLink } from "components/styled";
import { useEffect, useState } from "react";
import { addressToShortAddress } from "utils/converters";
import { useNetwork } from "wagmi";

/**
 * Page with top accounts.
 */
export default function TopAccounts() {
  // Network states
  const { chain } = useNetwork();
  const [chainCurrencySymbol, setChainCurrencySymbol] = useState<
    string | undefined
  >();
  const [chainAddressLink, setChainAddressLink] = useState<
    string | undefined
  >();
  // Mock data
  // TODO: Replace mock data with real data from contract
  const winningSize = 0.32;
  const winningDistributeDate = 1669852800;
  const topAccounts = [
    { address: "0x6e685a45db4d97ba160fa067cb81b40dfed47245", wins: 19 },
    { address: "0xd5c08681719445a5fdce2bda98b341a49050d821", wins: 17 },
    { address: "0x06959153b974d0d5fdfd87d561db6d8d4fa0bb0b", wins: 8 },
    { address: "0x916ed5586bb328e0ec1a428af060dc3d10919d84", wins: 7 },
    { address: "0x57571d366a00b3389b0adf30a114bc7da7a11580", wins: 5 },
    { address: "0x6e685a45db4d97ba160fa067cb81b40dfed47245", wins: 3 },
    { address: "0xd5c08681719445a5fdce2bda98b341a49050d821", wins: 3 },
    { address: "0x06959153b974d0d5fdfd87d561db6d8d4fa0bb0b", wins: 2 },
    { address: "0x916ed5586bb328e0ec1a428af060dc3d10919d84", wins: 1 },
    { address: "0x57571d366a00b3389b0adf30a114bc7da7a11580", wins: 1 },
  ];

  useEffect(() => {
    setChainCurrencySymbol(chain?.nativeCurrency?.symbol);
    setChainAddressLink(`${chain?.blockExplorers?.default.url}/address/`);
  }, [chain]);

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
          Between which three random ones will share{" "}
          <strong>
            {/* {winningSize} {chain?.nativeCurrency?.symbol} */}
            {winningSize} {chainCurrencySymbol}
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
              href={`${chainAddressLink}/${account.address}`}
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
