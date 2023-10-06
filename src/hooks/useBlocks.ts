import { ApiPromise } from "@polkadot/api";
import { useEffect, useRef, useState } from "react";
import { getApi } from "@/lib/getApi";
import { BlockInfo, EventInfo } from "@/types/block";
import { useApi } from "./useApi";
import { useAppContext } from "@/components/context/ContextProvider";

export const useBlocks = () => {
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

  const { api } = useAppContext();

  // Flag to save lastBlockNumber
  const flag = useRef("");

  // Effect to get new blocks
  useEffect(() => {
    if (!api) return;

    // Get new blocks
    api.derive.chain.subscribeNewBlocks((block) => {
      // Prevent double added useEffect strict mode, mount, unmount, mount again
      if (block.block.header.number.toString() === flag.current) {
        return;
      }
      // Search for IBC connections
      let extrinsicsList = block.block.extrinsics
        .filter((ex) => ex.method.section === "ibc")
        .map((ex) => {
          return {
            method: ex.method.method,
            hash: ex.hash.toHex(),
            signer: (ex.signer.toHuman() as { Id: string }) || { Id: "" },
          };
        });

      // Mutate state
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

      // Update flag
      flag.current = block.block.header.number.toString();
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
    api: api,
  };
};

export default useBlocks;
