import { ApiPromise } from "@polkadot/api";
import { useEffect, useState } from "react";
import { getApi } from "@/lib/getApi";
import { BlockInfo, EventInfo } from "@/types/block";

export const useBlocks = (url: string) => {
  const [api, setApi] = useState<Promise<ApiPromise>>();
  const [info, setInfo] = useState<{
    blocks: BlockInfo[];
    lastBlock: string;
    time: number;
    lastTime: number;
    ibcEvents: EventInfo[];
  }>({
    blocks: [],
    lastBlock: "",
    time: 0,
    lastTime: 0,
    ibcEvents: [],
  });

  // SetUp api
  useEffect(() => {
    setApi(getApi(url));
  }, []);

  // Effect to get new blocks
  useEffect(() => {
    if (!api) return;
    api.then((apiSession) => {
      // get new blocks
      apiSession.derive.chain.subscribeNewBlocks((block) => {
        // search for IBC connections
        let extrinsicsList = block.block.extrinsics
          .filter((ex) => ex.method.section === "ibc")
          .map((ex) => {
            return {
              method: ex.method.method,
              hash: ex.hash.toHex(),
              signer: (ex.signer.toHuman() as { Id: string }) || { Id: "" },
            };
          });

        // mutate state
        setInfo((prevInfo) => ({
          blocks: [
            {
              hash: block.block.header.hash.toHex(),
              author: block.author?.toHuman() || "",
              number: block.block.header.number.toNumber(),
            },
            ...prevInfo.blocks,
          ],
          lastBlock: block.block.header.number.toString(),
          lastTime: prevInfo.time,
          time: 0,
          ibcEvents: [...extrinsicsList, ...prevInfo.ibcEvents],
        }));
      });
    });
  }, [api]);

  // Effect to count seconds (Counter)
  useEffect(() => {
    if (info.lastBlock === "") return;

    let interval = setInterval(() => {
      setInfo((prevInfo) => ({ ...prevInfo, time: prevInfo.time + 1 }));
    }, 1000);

    return () => clearInterval(interval);
  }, [info.lastBlock]);

  return {
    blocks: info.blocks,
    lastBlock: info.lastBlock,
    time: info.time,
    lastTime: info.lastTime,
    ibcEvents: info.ibcEvents,
  };
};

export default useBlocks;
