import { TChainConnect } from "./chainConnect.type.ts";

export type TConnectWallet = {
  HEDERA: TChainConnect;
  TON: TChainConnect;
  EVM: TChainConnect;
  TEZOS: TChainConnect;
};
