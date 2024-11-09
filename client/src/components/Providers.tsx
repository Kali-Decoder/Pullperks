"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

const { wallets } = getDefaultWallets();

const openCampus = defineChain({
  id: 656476,
  name: "Open Campus Codex",
  nativeCurrency: { name: "EDU", symbol: "EDU", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.open-campus-codex.gelato.digital/"] },
  },
  blockExplorers: {
    default: {
      name: "BlockScout",
      url: "https://opencampus-codex.blockscout.com/",
    },
  },
});

/* New RainbowKit API */
const config = getDefaultConfig({
  appName: "PullPerks",
  projectId: "d44b219387d0664165098cf0f75a4445",
  chains: [openCampus],
  wallets,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          coolMode
          theme={darkTheme({
            accentColor: "#7075b8",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
         <SessionProvider>{mounted && children}</SessionProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
