import auroraIcon from "../../assets/mainSection/chainSelect/auroraIcon.svg";
import BSCicon from "../../assets/mainSection/chainSelect/BSCicon.svg";
import moonbeamIcon from "../../assets/mainSection/chainSelect/moonbeamIcon.svg";
import avax from "../../assets/mainSection/chainSelect/avax.svg";
//import nearIcon from "../../assets/mainSection/chainSelect/nearIcon.svg";
import polygonIcon from "../../assets/mainSection/chainSelect/polygonIcon.svg";
import hederaIcon from "../../assets/mainSection/chainSelect/hedera.svg";

/*import aurora from "../../assets/mainSection/nfts/XP NFT AURORA (1).gif";
import poly from "../../assets/mainSection/nfts/XP NFT Polygon (1).gif";
import bsc from "../../assets/mainSection/nfts/XP NFT BSC (1).gif";
import moon from "../../assets/mainSection/nfts/XP NFT Moonbeam.gif";
//import near from "../../assets/mainSection/nfts/XP NFT NEAR (1).gif";*/

export const chainData = [
  {
    name: "Aurora",
    image: auroraIcon,
    nft:
      "https://ipfs.io/ipfs/QmZjTpC4NB1fKNa6aRE7ruTbBvw3YmYjT3nkTzsJWnnDuw/Aurora.gif",
    chainNonce: "21",
    chainId: "1313161554",
    creationBlock: 98782777,
    evm: true,
    rpc: "https://mainnet.aurora.dev",
    contract: "0xb7f9a9d17388482d0206C12D32fDeE5231290913",
  },
  /*{
        name: "Near",
        image: nearIcon,
        nft:
            "https://ipfs.io/ipfs/QmZjTpC4NB1fKNa6aRE7ruTbBvw3YmYjT3nkTzsJWnnDuw/Near.gif",
        chainNonce: "31",
        evm: false,
    },*/
  {
    name: "Polygon",
    image: polygonIcon,
    nft:
      "https://ipfs.io/ipfs/QmZjTpC4NB1fKNa6aRE7ruTbBvw3YmYjT3nkTzsJWnnDuw/Polygon.gif",
    chainNonce: "7",
    creationBlock: 46291138,
    chainId: "137",
    evm: true,
    rpc: "https://polygon-rpc.com",
    contract: "0xce715Ab3E0A40Bd718e6C4c9cd9c41D874494054",
  },
  {
    name: "BSC",
    image: BSCicon,
    nft:
      "https://ipfs.io/ipfs/QmZjTpC4NB1fKNa6aRE7ruTbBvw3YmYjT3nkTzsJWnnDuw/BSC.gif",
    chainNonce: "4",
    chainId: "56",
    creationBlock: 30841932,
    evm: true,
    rpc: "https://bsc-dataseed.binance.org",
    contract: "0xf777be29f4691D025C14afeeF9B05352CC94C59c",
  },
  {
    name: "Moonbeam",
    image: moonbeamIcon,
    nft:
      "https://ipfs.io/ipfs/QmZjTpC4NB1fKNa6aRE7ruTbBvw3YmYjT3nkTzsJWnnDuw/BSC.gif",
    chainNonce: "32",
    chainId: "1284",
    creationBlock: 4211259,
    evm: true,
    rpc: "https://rpc.api.moonbeam.network",
    contract: "0xf777be29f4691D025C14afeeF9B05352CC94C59c",
  },
];

export const chainDataMintingPath = [
  {
    name: "Polygon",
    image: polygonIcon,
    nft: "https://ipfs.io/ipfs/QmZMkXd7hm9DPNnQTXbpJfi67kKaasm4EQQQLsVuHjQL7Y",
    chainNonce: "7",
    creationBlock: 46291138,
    chainId: "137",
    evm: true,
    rpc: "https://polygon-rpc.com",
    contract: "0x49AAb026be38c3d72f99945719485Be605539932",
  },
  {
    name: "BSC",
    image: BSCicon,
    nft: "https://ipfs.io/ipfs/QmZEM3mvhvxEjRi2f9wDcvQ2msdX6uR2GTt9ntTrTfiH1q",
    chainNonce: "4",
    chainId: "56",
    creationBlock: 30841932,
    evm: true,
    rpc: "https://bsc-dataseed.binance.org",
    contract: "0x7646786E6bC5C0D2D33B198738a64AdB398531d7", //TODO: NEEDS TO CHANGE FOR MAINNET
  },
  {
    name: "Avalanche",
    image: avax,
    nft: "https://ipfs.io/ipfs/QmRw6udf6Wkqo38kVXekxTCgMu6o1gJigP77ujSi1erVLX",
    chainNonce: "6",
    chainId: "43114",
    creationBlock: 4211259, // TODO: NEEDS TO CHANGE FOR AVAX
    evm: true,
    rpc: "https://api.avax.network/ext/bc/C/rpc",
    contract: "0xa80F3BB9a06065e41369E3d8e11655d91d01D9C9", //TODO: NEEDS TO CHANGE FOR MAINNET
  },
];

export const chainDataMintingPathTestnet = [
  {
    name: "Polygon Amoy Testnet",
    image: polygonIcon,
    nft: "https://ipfs.io/ipfs/QmZMkXd7hm9DPNnQTXbpJfi67kKaasm4EQQQLsVuHjQL7Y",
    chainNonce: "7",
    creationBlock: 46291138,
    chainId: "80002",
    evm: true,
    rpc: "https://rpc-amoy.polygon.technology/",
    contract: "0xa660A20C6F1CbbF6A618126eA5DEf33dCDB2581c",
  },
  {
    name: "BSC Testnet",
    image: BSCicon,
    nft: "https://ipfs.io/ipfs/QmZEM3mvhvxEjRi2f9wDcvQ2msdX6uR2GTt9ntTrTfiH1q",
    chainNonce: "4",
    chainId: "97",
    creationBlock: 30841932,
    evm: true,
    rpc: "https://data-seed-prebsc-1-s3.bnbchain.org:8545",
    contract: "0x73b3c7B79eE6E71292e45DeCa621e1e8fC2b0D77",
  },
  {
    name: "Fuji AVAX",
    image: avax,
    nft: "https://ipfs.io/ipfs/QmRw6udf6Wkqo38kVXekxTCgMu6o1gJigP77ujSi1erVLX",
    chainNonce: "6",
    chainId: "43113",
    creationBlock: 4211259,
    evm: true,
    rpc: "https://ava-testnet.public.blastapi.io/ext/bc/C/rpc",
    contract: "0xf92057F89B87bad969194877f037E3ff65F3e346",
  },
];

export const chainDataMintingPathHedera = [
  {
    name: "BSC",
    image: BSCicon,
    nft: "https://ipfs.io/ipfs/QmZEM3mvhvxEjRi2f9wDcvQ2msdX6uR2GTt9ntTrTfiH1q",
    chainNonce: "4",
    chainId: "56",
    creationBlock: 30841932,
    evm: true,
    rpc: "https://bsc-dataseed.binance.org",
    contract: "0x7646786E6bC5C0D2D33B198738a64AdB398531d7",
  },
  {
    name: "Hedera",
    image: hederaIcon,
    nft: "https://ipfs.io/ipfs/QmUZK5BoEMFxpa7RZBX4Qcp5wS9njesCsNas6kTJZQTb4S",
    chainNonce: "29",
    chainId: "295",
    creationBlock: 4211259,
    evm: true,
    rpc: "https://mainnet.hashio.io/api",
    contract: "0xC9e7627990B4ECD659545b5b8A1907C96435d87f",
  },
];

export const chainDataMintingPathHederaTestnet = [
  {
    name: "BSC Testnet",
    image: BSCicon,
    nft: "https://ipfs.io/ipfs/QmZEM3mvhvxEjRi2f9wDcvQ2msdX6uR2GTt9ntTrTfiH1q",
    chainNonce: "4",
    chainId: "97",
    creationBlock: 30841932,
    evm: true,
    rpc: "https://data-seed-prebsc-1-s3.bnbchain.org:8545",
    contract: "0x73b3c7B79eE6E71292e45DeCa621e1e8fC2b0D77",
  },
  {
    name: "Hedera Testnet",
    image: hederaIcon,
    nft: "https://ipfs.io/ipfs/QmUZK5BoEMFxpa7RZBX4Qcp5wS9njesCsNas6kTJZQTb4S",
    chainNonce: "29",
    chainId: "296",
    creationBlock: 4211259,
    evm: true,
    rpc: "https://testnet.hashio.io/api",
    contract: "0xC9e7627990B4ECD659545b5b8A1907C96435d87f",
  },
];

export const REST_API = "https://event-evm-claimed-b73dc04d13d9.herokuapp.com";

export const startDate =
  /*Date.now() + 20_000 ||*/
  new Date("Fri Aug 18 2023 03:00:00 GMT+0300").getTime();
export const endDate = new Date("Fri Sep 1 2023 03:00:00 GMT+0300").getTime();

export const HEDERA_BYTECODE =
  "60806040526001600655348015610014575f80fd5b5060408051808201825260208082527f4d756c74692d636861696e2050617373616765204d617374657270696563657381830152825180840190935260048352634d43504d60e01b90830152905f61006c8382610119565b5060016100798282610119565b5050506101d3565b634e487b7160e01b5f52604160045260245ffd5b600181811c908216806100a957607f821691505b6020821081036100c757634e487b7160e01b5f52602260045260245ffd5b50919050565b601f82111561011457805f5260205f20601f840160051c810160208510156100f25750805b601f840160051c820191505b81811015610111575f81556001016100fe565b50505b505050565b81516001600160401b0381111561013257610132610081565b610146816101408454610095565b846100cd565b6020601f821160018114610178575f83156101615750848201515b5f19600385901b1c1916600184901b178455610111565b5f84815260208120601f198516915b828110156101a75787850151825560209485019460019092019101610187565b50848210156101c457868401515f19600387901b60f8161c191681555b50505050600190811b01905550565b610ebe806101e05f395ff3fe608060405234801561000f575f80fd5b50600436106100f0575f3560e01c80634e71d92d11610093578063a22cb46511610063578063a22cb465146101fa578063b88d4fde1461020d578063c87b56dd14610220578063e985e9c514610233575f80fd5b80634e71d92d146101c45780636352211e146101cc57806370a08231146101df57806395d89b41146101f2575f80fd5b8063095ea7b3116100ce578063095ea7b31461015c5780631aa5e8721461017157806323b872dd1461019e57806342842e0e146101b1575f80fd5b806301ffc9a7146100f457806306fdde031461011c578063081812fc14610131575b5f80fd5b610107610102366004610b0d565b610246565b60405190151581526020015b60405180910390f35b610124610297565b6040516101139190610b5d565b61014461013f366004610b6f565b610326565b6040516001600160a01b039091168152602001610113565b61016f61016a366004610ba1565b61034d565b005b61019061017f366004610bc9565b60076020525f908152604090205481565b604051908152602001610113565b61016f6101ac366004610be2565b61035c565b61016f6101bf366004610be2565b6103ea565b61016f610409565b6101446101da366004610b6f565b61049b565b6101906101ed366004610bc9565b6104a5565b6101246104ea565b61016f610208366004610c1c565b6104f9565b61016f61021b366004610c69565b610504565b61012461022e366004610b6f565b61051b565b610107610241366004610d46565b610571565b5f6001600160e01b031982166380ac58cd60e01b148061027657506001600160e01b03198216635b5e139f60e01b145b8061029157506301ffc9a760e01b6001600160e01b03198316145b92915050565b60605f80546102a590610d77565b80601f01602080910402602001604051908101604052809291908181526020018280546102d190610d77565b801561031c5780601f106102f35761010080835404028352916020019161031c565b820191905f5260205f20905b8154815290600101906020018083116102ff57829003601f168201915b5050505050905090565b5f6103308261059e565b505f828152600460205260409020546001600160a01b0316610291565b6103588282336105d6565b5050565b6001600160a01b03821661038a57604051633250574960e11b81525f60048201526024015b60405180910390fd5b5f6103968383336105e3565b9050836001600160a01b0316816001600160a01b0316146103e4576040516364283d7b60e01b81526001600160a01b0380861660048301526024820184905282166044820152606401610381565b50505050565b61040483838360405180602001604052805f815250610504565b505050565b335f90815260076020526040902054600503610438576040516312f8fd6d60e01b815260040160405180910390fd5b610444336006546106d5565b6006545f908152600860209081526040808320805460ff1916600190811790915533845260079092528220805491929091610480908490610dc3565b909155505060068054905f61049483610dd6565b9190505550565b5f6102918261059e565b5f6001600160a01b0382166104cf576040516322718ad960e21b81525f6004820152602401610381565b506001600160a01b03165f9081526003602052604090205490565b6060600180546102a590610d77565b6103583383836106ee565b61050f84848461035c565b6103e48484848461078c565b5f8181526008602052604081205460609160ff9091161515900361055257604051634a1850bf60e11b815260040160405180910390fd5b604051806080016040528060438152602001610e466043913992915050565b6001600160a01b039182165f90815260056020908152604080832093909416825291909152205460ff1690565b5f818152600260205260408120546001600160a01b03168061029157604051637e27328960e01b815260048101849052602401610381565b61040483838360016108b2565b5f828152600260205260408120546001600160a01b039081169083161561060f5761060f8184866109b6565b6001600160a01b038116156106495761062a5f855f806108b2565b6001600160a01b0381165f90815260036020526040902080545f190190555b6001600160a01b03851615610677576001600160a01b0385165f908152600360205260409020805460010190555b5f8481526002602052604080822080546001600160a01b0319166001600160a01b0389811691821790925591518793918516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4949350505050565b610358828260405180602001604052805f815250610a1a565b6001600160a01b03821661072057604051630b61174360e31b81526001600160a01b0383166004820152602401610381565b6001600160a01b038381165f81815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0383163b156103e457604051630a85bd0160e11b81526001600160a01b0384169063150b7a02906107ce903390889087908790600401610dee565b6020604051808303815f875af1925050508015610808575060408051601f3d908101601f1916820190925261080591810190610e2a565b60015b61086f573d808015610835576040519150601f19603f3d011682016040523d82523d5f602084013e61083a565b606091505b5080515f0361086757604051633250574960e11b81526001600160a01b0385166004820152602401610381565b805181602001fd5b6001600160e01b03198116630a85bd0160e11b146108ab57604051633250574960e11b81526001600160a01b0385166004820152602401610381565b5050505050565b80806108c657506001600160a01b03821615155b15610987575f6108d58461059e565b90506001600160a01b038316158015906109015750826001600160a01b0316816001600160a01b031614155b801561091457506109128184610571565b155b1561093d5760405163a9fbf51f60e01b81526001600160a01b0384166004820152602401610381565b81156109855783856001600160a01b0316826001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b50505f90815260046020526040902080546001600160a01b0319166001600160a01b0392909216919091179055565b6109c1838383610a30565b610404576001600160a01b0383166109ef57604051637e27328960e01b815260048101829052602401610381565b60405163177e802f60e01b81526001600160a01b038316600482015260248101829052604401610381565b610a248383610a94565b6104045f84848461078c565b5f6001600160a01b03831615801590610a8c5750826001600160a01b0316846001600160a01b03161480610a695750610a698484610571565b80610a8c57505f828152600460205260409020546001600160a01b038481169116145b949350505050565b6001600160a01b038216610abd57604051633250574960e11b81525f6004820152602401610381565b5f610ac983835f6105e3565b90506001600160a01b03811615610404576040516339e3563760e11b81525f6004820152602401610381565b6001600160e01b031981168114610b0a575f80fd5b50565b5f60208284031215610b1d575f80fd5b8135610b2881610af5565b9392505050565b5f81518084528060208401602086015e5f602082860101526020601f19601f83011685010191505092915050565b602081525f610b286020830184610b2f565b5f60208284031215610b7f575f80fd5b5035919050565b80356001600160a01b0381168114610b9c575f80fd5b919050565b5f8060408385031215610bb2575f80fd5b610bbb83610b86565b946020939093013593505050565b5f60208284031215610bd9575f80fd5b610b2882610b86565b5f805f60608486031215610bf4575f80fd5b610bfd84610b86565b9250610c0b60208501610b86565b929592945050506040919091013590565b5f8060408385031215610c2d575f80fd5b610c3683610b86565b915060208301358015158114610c4a575f80fd5b809150509250929050565b634e487b7160e01b5f52604160045260245ffd5b5f805f8060808587031215610c7c575f80fd5b610c8585610b86565b9350610c9360208601610b86565b925060408501359150606085013567ffffffffffffffff811115610cb5575f80fd5b8501601f81018713610cc5575f80fd5b803567ffffffffffffffff811115610cdf57610cdf610c55565b604051601f8201601f19908116603f0116810167ffffffffffffffff81118282101715610d0e57610d0e610c55565b604052818152828201602001891015610d25575f80fd5b816020840160208301375f6020838301015280935050505092959194509250565b5f8060408385031215610d57575f80fd5b610d6083610b86565b9150610d6e60208401610b86565b90509250929050565b600181811c90821680610d8b57607f821691505b602082108103610da957634e487b7160e01b5f52602260045260245ffd5b50919050565b634e487b7160e01b5f52601160045260245ffd5b8082018082111561029157610291610daf565b5f60018201610de757610de7610daf565b5060010190565b6001600160a01b03858116825284166020820152604081018390526080606082018190525f90610e2090830184610b2f565b9695505050505050565b5f60208284031215610e3a575f80fd5b8151610b2881610af556fe68747470733a2f2f697066732e696f2f697066732f516d595477335452773438393445523154666f6f424d617a7a3652716e79573133475048796a64584a377735756ba2646970667358221220808e2bf22ef9ec7ff1e9bafc2a465052bcec3031f8209bd277465027feace91964736f6c634300081a0033";

export const HEDERA_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxMintLimitReached",
    type: "error",
  },
  {
    inputs: [],
    name: "NonExistentToken",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userMinted",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
