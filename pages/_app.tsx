import { ThemeProvider } from "@mui/material";
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import AnalyticsHelper from "components/helper/AnalyticsHelper";
import { DialogProvider } from "context/dialog";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";
import { theme } from "theme";
import { handlePageViewEvent, initAnalytics } from "utils/analytics";
import { getContractsChain } from "utils/network";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "../styles/globals.css";

const { chains, provider } = configureChains(
  [getContractsChain()],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "dearweb3ibet",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pageLoaded, setPageLoaded] = useState(false);

  /**
   * Fix for hydration error (docs - https://github.com/vercel/next.js/discussions/35773#discussioncomment-3484225)
   */
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  /**
   * Init analytics.
   */
  useEffect(() => {
    initAnalytics();
  }, []);

  /**
   * Send page view event to analytics if page changed via router.
   */
  useEffect(() => {
    const handleRouteChange = function () {
      handlePageViewEvent();
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({ accentColor: theme.palette.primary.main })}
      >
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <DialogProvider>
              <NextNProgress height={4} />
              {pageLoaded && (
                <>
                  <AnalyticsHelper />
                  <Component {...pageProps} />
                </>
              )}
            </DialogProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
