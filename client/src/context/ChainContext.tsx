// context/ChainContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface ChainDetail {
  name: string;
  url: string;
  id: string; // Added id here
}

interface ChainContextProps {
  chainDetail: ChainDetail | null;
  setChainDetail: (chain: ChainDetail) => void;
}

const ChainContext = createContext<ChainContextProps | undefined>(undefined);

export const ChainProvider = ({ children }: { children: ReactNode }) => {
  const [chainDetail, setChainDetail] = useState<ChainDetail | null>(null);

  return (
    <ChainContext.Provider value={{ chainDetail, setChainDetail }}>
      {children}
    </ChainContext.Provider>
  );
};

export const useChain = (): ChainContextProps => {
  const context = useContext(ChainContext);
  if (!context) {
    throw new Error("useChain must be used within a ChainProvider");
  }
  return context;
};
