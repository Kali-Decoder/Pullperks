import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

const openCampus = {
  id: 355113,
  name: "Open Campus Codex Testnet",
  nativeCurrency: { name: "Open Campus Codex", symbol: "EDU", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.open-campus-codex.gelato.digital/"] },
  },
  blockExplorers: {
    default: { name: "Open Campus Codex", url: "https://edu-chain-testnet.blockscout.com/" },
  },
 
};
export const config = getDefaultConfig({
  appName: 'PullPerks',
  projectId: 'd44b219387d0664165098cf0f75a4445',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    openCampus,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  ssr: true,
});