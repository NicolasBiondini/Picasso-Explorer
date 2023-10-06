import { ApiPromise, WsProvider } from "@polkadot/api";

export const getApi = async (provider: string) => {
  const wsProvider = new WsProvider(provider);
  const api = await ApiPromise.create({ provider: wsProvider });
  return { api, wsProvider };
};
