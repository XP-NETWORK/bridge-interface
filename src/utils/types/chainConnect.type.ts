import { AbstractConnector } from '@web3-react/abstract-connector';
import { TChain } from "./chain.type.ts";

export type TChainConnect = (params: {
  type?: TChain;
  bridge?: any;
  nonce?: number;
  activate?:(connector: AbstractConnector, onError?: (error: Error) => void, throwErrors?: boolean) => Promise<void>;
  network?: boolean;
}) => Promise<void>;
