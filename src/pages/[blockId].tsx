import Loader from "@/components/Loader";
import Searcher from "@/components/Searcher";
import { useAppContext } from "@/components/context/ContextProvider";
import { useApi } from "@/hooks/useApi";
import useBlocks from "@/hooks/useBlocks";
import { getApi } from "@/lib/getApi";
import { getBlockInfo } from "@/lib/getBlockInfo";
import { BlockBigInfo } from "@/types/block";
import { ApiPromise } from "@polkadot/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

// Bloock 0x2038af904230fc1d9ed34a448fc52c7ed51b6ee15520ef55b5787b62525e49e6
// signedBlock.block.hash.toHex()                           block hash
// signedBlock.block.header.parentHash.toHex()              parent hash
// signedBlock.block.header.stateRoot.toHex()               state
// signedBlock.block.header.extrinsicsRoot.toHex()          extrinsic root
// signedBlock.block.header.number.toPrimitive()            block number
// signedBlock.block.extrinsics.length                      extrinsic count
// signedBlock.block.extrinsics.toArray()[0].args.toString() access now<Compact<u64> number
// signedBlock.block.extrinsics.toArray()[0].toHex()        Extrinsic/decode/ hash
// signedBlock.block.extrinsics.toArray()[1].hash.toHex()   Extrinsic hash
// signedBlock.block.extrinsics.toArray()[1].method.section Extrinsic module parachainSystem
// signedBlock.block.extrinsics.toArray()[1].method.method  Extrinsic method setValidationData

type Data = {
  ok: boolean;
  data: BlockBigInfo;
};

export const getServerSideProps = (async (context) => {
  let blockInfo: BlockBigInfo = {
    hash: "",
    parentHash: "",
    state: "",
    extrinsicRoot: "",
    author: "",
    number: 0,
    extrinsicCount: 0,
  };

  if (context.params?.blockId === undefined) {
    console.log("No block hash.");
    return {
      props: {
        data: { ok: false, data: blockInfo },
      },
    };
  }

  try {
    const { api } = await getApi("wss://rpc.composablenodes.tech/");
    return await getBlockInfo(api, context.params.blockId as string, blockInfo);
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: { ok: false, data: blockInfo },
      },
    };
  }
}) satisfies GetServerSideProps<{
  data: Data;
}>;

const BlockPageId = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { api } = useAppContext();
  const [block, setBlock] = useState("");

  const {
    data: info,
    isFetching,
    refetch,
  } = useQuery<Data>({
    queryKey: ["info", block],
    queryFn: async () => {
      const info = await getBlockInfo(api as ApiPromise, block);
      return info.props.data;
    },
    enabled: false,
    initialData: props.data,
  });

  if (!props.data.ok)
    return (
      <section className="text-beige h-[70vh] flex flex-col justify-center items-center gap-10">
        <h3 className="font-semibold text-3xl">Sorry, block not found 😔</h3>
        <Link className="hover:text-orange text-xl" href={"/"}>
          Go back home
        </Link>
      </section>
    );

  return (
    <section className="flex flex-col gap-y-5 w-[90%] xl:w-[1224px] min-h-[85vh] items-center justify-center font-mukta ">
      <div>
        <Searcher />
      </div>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <h1>{info.data.hash}</h1>
          <button
            onClick={() => {
              refetch({
                queryKey: [
                  "info",
                  "0x6811a339673c9daa897944dcdac99c6e2939cc88245ed21951a0a3c9a2be75bc",
                ],
              });
            }}
          >
            click me
          </button>
        </>
      )}
    </section>
  );
};

export default BlockPageId;
