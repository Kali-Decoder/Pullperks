"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { useAccount } from "wagmi";
import { ethers,  Contract } from "ethers";
import { useWalletClient } from 'wagmi'
import toast from "react-hot-toast";
import { tokenAbi } from "@/constant/index";

// Context types
interface DataContextProps {}

interface DataContextProviderProps {
  children: ReactNode;
}

// Context initialization
const DataContext = React.createContext<DataContextProps | undefined>(
  undefined
);

const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
}) => {
  const [tokenBalance, setTokenBalance] = useState();
  const { address, chain } = useAccount();

  const [activeChain, setActiveChainId] = useState<number | undefined>(
    chain?.id
  );
  const { data: walletClient, isError, isLoading } = useWalletClient();
  
  useEffect(() => {
    setActiveChainId(chain?.id);
  }, [chain?.id]);



  const getContractInstance = async (
    contractAddress: string,
    contractAbi: any
  ): Promise<Contract | undefined> => {
    try {
      const contractInstance = new ethers.Contract(
        contractAddress,
        contractAbi,
        walletClient
      );
      return contractInstance;
    } catch (error) {
      console.log("Error in deploying contract");
      return undefined;
    }
  };

  const getTokenDetails = async (tokenAddress: any) => {
    try {
      const tokenContract = await getContractInstance(tokenAddress, tokenAbi);
      if (tokenContract) {
        console.log("Token contract", tokenContract);
        let balance = await tokenContract.balanceOf(address);
        setTokenBalance(balance);
        console.log("Token balance", balance);
        return balance;
      }
    } catch (error) {
      console.log("Error in getting token balance");
      return 0;
    }
  };

  useEffect(() => {
    console.log("Token balance", walletClient);
  }, []);

  return <DataContext.Provider value={{}}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};

export default DataContextProvider;
