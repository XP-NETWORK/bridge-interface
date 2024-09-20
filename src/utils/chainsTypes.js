// const v3_ChainId = {
//     BSC: 4,
//     MATIC: 7,
//     ETH: 5,
//     MULTIVERSX: 2,
//     TON: 27,
//     TEZOS: 18,
//     CASPER: 39,
//     DEFAULT: 0
// }

// (function (v3_ChainId) {
//   v3_ChainId["BSC"] = "BSC";
//   v3_ChainId["POLYGON"] = "MATIC";
//   v3_ChainId["ETHEREUM"] = "ETH";
//   v3_ChainId["ELROND"] = "MULTIVERSX";
//   v3_ChainId["TON"] = "TON";
//   v3_ChainId["TEZOS"] = "TEZOS";
//   v3_ChainId["CASPER"] = "CASPER";
//   v3_ChainId["DEFAULT"] = "";
// })(v3_ChainId || (v3_ChainId = {}));

export var CHAIN_INFO = new Map();

function set(k, v) {
  CHAIN_INFO.set(k, v);
}

function get(k) {
  return CHAIN_INFO.get(k);
}

export const ChainType = {
  EVM: "EVM",
  ELROND: "ELROND",
  TRON: "TRON",
  TEZOS: "TEZOS",
  ALGORAND: "ALGORAND",
  COSMOS: "COSMOS",
  DFINITY: "DFINITY",
  SOLANA: "SOLANA",
  TON: "TON",
  NEAR: "NEAR",
  HEDERA: "HEDERA",
  APTOS: "APTOS",
  CASPER: "CASPER"
}

// (function (ChainType) {
//   ChainType["EVM"] = "EVM";
//   ChainType["ELROND"] = "ELROND";
//   ChainType["TRON"] = "TRON";
//   ChainType["TEZOS"] = "TEZOS";
//   ChainType["ALGORAND"] = "ALGORAND";
//   ChainType["COSMOS"] = "COSMOS";
//   ChainType["DFINITY"] = "DFINITY";
//   ChainType["SOLANA"] = "SOLANA";
//   ChainType["TON"] = "TON";
//   ChainType["NEAR"] = "NEAR";
//   ChainType["HEDERA"] = "HEDERA";
//   ChainType["APTOS"] = "APTOS";
//   ChainType["CASPER"] = "CASPER";
// })(ChainType || (ChainType = {}));

CHAIN_INFO = {
  set,
  get,
};

export var Chain = {
  ELROND: 2,
  HECO: 3,
  BSC: 4,
  ETHEREUM: 5,
  AVALANCHE: 6,
  POLYGON: 7,
  FANTOM: 8,
  TRON: 9,
  CELO: 11,
  HARMONY: 12,
  ONT: 13,
  XDAI: 14,
  ALGORAND: 15,
  FUSE: 16,
  UNIQUE: 17,
  TEZOS: 18,
  VELAS: 19,
  IOTEX: 20,
  AURORA: 21,
  GODWOKEN: 22,
  GATECHAIN: 23,
  SECRET: 24,
  VECHAIN: 25,
  SOLANA: 26,
  TON: 27,
  DFINITY: 28,
  HEDERA: 29,
  SKALE: 30,
  NEAR: 31,
  MOONBEAM: 32,
  ABEYCHAIN: 33,
  APTOS: 34,
  CADUCEUS: 35,
  OKC: 36,
  ARBITRUM: 37,
  BITGERT: 38,
  CASPER: 39,
  OPTIMISM: 40,
  ZETA: 41,
  ENERGI: 42,
  BASE: 43,
  FINDORA: 44,
};

export function getChainName(chainNumber) {
  for (const key in Chain) {
    if (Chain[key] === chainNumber) {
      return key;
    }
  }
  return null; // If no matching key is found
}


export const v3_ChainId = {
  2: { name: "MULTIVERSX", type: "ELROND" },
  4: { name: 'BSC', type: "EVM" },
  5: { name: 'ETH', type: "EVM" },
  7: { name: 'MATIC', type: "EVM" },
  18: { name: 'TEZOS', type: "TEZOS" },
  24: { name: 'SECRET', type: "COSMOS" },
  27: { name: 'TON', type: "TON" },
  29: { name: 'HEDERA', type: "HEDERA" },
  43: { name: "BASE", type: "EVM" },
  28: { name: 'ICP', type: "DFINITY" },
}

export const v3_getChainNonce = {
  "MULTIVERSX": 2,
  'BSC': 4,
  'ETH': 5,
  'MATIC': 7,
  'TEZOS': 18,
  'SECRET': 24,
  'TON': 27,
  'HEDERA': 29,
  'BASE': 43,
  'ICP': 28,
}
