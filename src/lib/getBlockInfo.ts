import { BlockBigInfo } from "@/types/block";
import { ApiPromise } from "@polkadot/api";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

const regex = /^0x[0-9a-fA-F]{64}$/;

export const getBlockInfo = async (
  api: ApiPromise,
  blockId: string,
  blockInfo: BlockBigInfo = {
    hash: "",
    parentHash: "",
    state: "",
    extrinsicRoot: "",
    author: "",
    number: 0,
    extrinsicCount: 0,
  }
) => {
  try {
    let blockHash = blockId;

    console.log("tryiiiing" + blockId);
    // Check if is hash or block number
    // If it's a block number, get block hash
    if (!regex.test(blockHash)) {
      blockHash = (await api.rpc.chain.getBlockHash(blockHash)).toString();
    }

    const signedBlock = await api.rpc.chain.getBlock(blockHash);

    blockInfo.hash = signedBlock.block.hash.toHex();
    blockInfo.parentHash = signedBlock.block.header.parentHash.toHex();
    blockInfo.state = signedBlock.block.header.stateRoot.toHex();
    blockInfo.extrinsicRoot = signedBlock.block.header.extrinsicsRoot.toHex();
    blockInfo.number = signedBlock.block.header.number.toNumber();
    blockInfo.extrinsicCount = signedBlock.block.extrinsics.length;

    return { props: { data: { ok: true, data: blockInfo } } };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: { ok: false, data: blockInfo },
      },
    };
  }
};
