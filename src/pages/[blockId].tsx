import { getApi } from "@/lib/getApi";
import { BlockBigInfo } from "@/types/block";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";

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
    const api = await getApi("wss://rpc.composablenodes.tech/");
    let blockHash = context.params.blockId as string;
    const signedBlock = await api.rpc.chain.getBlock(blockHash);

    return { props: { data: { ok: true, data: blockInfo } } };
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

const BlockPageId = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!data.ok)
    return (
      <section className="text-beige h-[70vh] flex flex-col justify-center items-center gap-10">
        <h3 className="font-semibold text-3xl">Sorry, block not found 😔</h3>
        <Link className="hover:text-orange text-xl" href={"/"}>
          Go back home
        </Link>
      </section>
    );

  return <div className="text-beige">{data.data.author}</div>;
};

export default BlockPageId;
