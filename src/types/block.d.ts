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
};
