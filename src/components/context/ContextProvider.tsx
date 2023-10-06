import { useApi } from "@/hooks/useApi";
import { ApiPromise } from "@polkadot/api";
import React, { createContext, useState, useContext, ReactNode } from "react";

type ContextType = {
  api: ApiPromise | undefined;
};

const AppContext = createContext<ContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

const ContextProvider = ({ children }: Props) => {
  const api = useApi("wss://rpc.composablenodes.tech/");

  return <AppContext.Provider value={{ api }}>{children}</AppContext.Provider>;
};

const useAppContext = (): ContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("No context!");
  }
  return context;
};

export { ContextProvider, useAppContext };
