"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { useAccount } from "wagmi";
import { ethers, Contract } from "ethers";
import { useWalletClient } from "wagmi";
import toast from "react-hot-toast";
import { tokenAbi } from "@/constant/index";
import { useEthersSigner } from "@/utils/signer";

import { mainContract, mainContractABI } from "@/constant/index";
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
  const [tokenAddress, setTokenAddress] = useState<string>("0x0");
  useEffect(() => {
    setActiveChainId(chain?.id);
  }, [chain?.id]);

  const signer = useEthersSigner({ chainId: activeChain });

  const getContractInstance = async (
    contractAddress: string,
    contractAbi: any
  ): Promise<Contract | undefined> => {
    try {
      const contractInstance = await new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      console.log("Contract instance", contractInstance);
      return contractInstance;
    } catch (error) {
      console.log("Error in deploying contract");
      return undefined;
    }
  };

  const getTokenDetails = async (tokenAddress: string) => {
    try {
      if (tokenAddress) {
        const tokenContract = await getContractInstance(tokenAddress, tokenAbi);
        let result = {
          balance: 0,
          name: "",
          symbol: "",
        };
        if (tokenContract) {
          console.log("Token contract", tokenContract);
          let balance = await tokenContract.balanceOf(address);
          result.balance = +balance.toString();
          let name = await tokenContract.name();
          result.name = name;
          let symbol = await tokenContract.symbol();
          result.symbol = symbol;
          return result;
        }
      }
    } catch (error) {
      console.log("Error in getting token balance");
      return 0;
    }
  };

  const distributeFunds = async (
    _walletAddresses: any,
    address: any,
    percentageArray: any,
    totalBounty: any,
    tokenAddress: any
  ) => {
   
    try {
      let contract = await getContractInstance(mainContract, mainContractABI);
      let tokenContract = await getContractInstance(tokenAddress, tokenAbi);
      let allowance = await tokenContract.allowance(address, mainContract);
      let totalAmount = ethers.utils.parseEther(totalBounty.toString());
      if (allowance < totalAmount) {
        let tx = await tokenContract.approve(mainContract, totalAmount);
        await tx.wait();
      }
      console.log("Total amount", totalAmount);
      console.log(
        _walletAddresses,
        address,
        percentageArray,
        totalAmount,
        tokenAddress
      );
      if (contract) {
        let tx = await contract.addProjectContributions(
          _walletAddresses,
          address,
          percentageArray,
          totalAmount,
          tokenAddress
        );
        await tx.wait();
      }

      
    } catch (error) {
      console.log("Error in distributing funds");
      console.log(error);
    }
  };

  useEffect(() => {
    if (!signer) return;
  }, [signer]);

  return (
    <DataContext.Provider
      value={{
        distributeFunds,
        getTokenDetails,
        setTokenAddress,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return context;
};

export default DataContextProvider;
