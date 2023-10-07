import { Vec } from "@polkadot/types-codec/base";
import { GenericExtrinsic } from "@polkadot/types/extrinsic";
import { AnyTuple } from "@polkadot/types-codec/types";

export type BlockInfo = {
  hash: string;
  author: string;
  number: number;
};

export type EventInfo = {
  method: string;
  hash: string;
  signer: { Id: string };
};

export type BlockBigInfo = {
  hash: string;
  parentHash: string;
  state: string;
  extrinsicRoot: string;
  author: string;
  number: number;
  extrinsicCount: number;
  extrinsics: { finalObject: AnyJSON; hash: `0x${string}` }[] | undefined;
};
