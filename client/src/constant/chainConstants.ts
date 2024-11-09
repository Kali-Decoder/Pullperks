
import { http } from "viem";
const openCampus = {
    id: 656476,
    name: "Open Campus Codex Testnet",
    iconUrl:"https://www.opencampus.xyz/static/media/coin-logo.39cbd6c42530e57817a5b98ac7621ca7.svg",
    nativeCurrency: { name: "Open Campus Codex", symbol: "EDU", decimals: 18 },
    rpcUrls: {
      default: { http: ["https://rpc.open-campus-codex.gelato.digital/"] },
    },
    blockExplorers: {
      default: {
        name: "Open Campus Codex",
        url: "https://edu-chain-testnet.blockscout.com/",
      },
    },
  };
const bitfinity = {
  id: 355113,
  name: "Bitfinity Testnet",
  iconUrl:"https://www.opencampus.xyz/static/media/coin-logo.39cbd6c42530e57817a5b98ac7621ca7.svg",
  nativeCurrency: { name: "Bitfinity", symbol: "BTF", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet.bitfinity.network/"] },
  },
  blockExplorers: {
    default: { name: "Bitfinity", url: "https://explorer.testnet.bitfinity.network" },
  },
 
};
export const chainArray = [bitfinity,openCampus];

export const transportsObject = {
  [bitfinity.id]: http(),
    [openCampus.id]: http(),
};
