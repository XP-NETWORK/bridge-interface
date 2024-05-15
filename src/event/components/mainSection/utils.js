import auroraIcon from "../../assets/mainSection/chainSelect/auroraIcon.svg";
import BSCicon from "../../assets/mainSection/chainSelect/BSCicon.svg";
import moonbeamIcon from "../../assets/mainSection/chainSelect/moonbeamIcon.svg";
import avax from "../../assets/mainSection/chainSelect/avax.svg";
//import nearIcon from "../../assets/mainSection/chainSelect/nearIcon.svg";
import polygonIcon from "../../assets/mainSection/chainSelect/polygonIcon.svg";

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
    contract: "0x9abBC52450Cb0B313139fD32752Dd3D87555D5A3",
  },
  {
    name: "Avalanche",
    image: avax,
    nft:
      "https://ipfs.io/ipfs/QmZjTpC4NB1fKNa6aRE7ruTbBvw3YmYjT3nkTzsJWnnDuw/BSC.gif", // TODO: NEEDS TO CHANGE FOR AVAX
    chainNonce: "32", // TODO: NEEDS TO CHANGE FOR AVAX
    chainId: "43114",
    creationBlock: 4211259, // TODO: NEEDS TO CHANGE FOR AVAX
    evm: true,
    rpc: "https://api.avax.network/ext/bc/C/rpc",
    contract: "0xfa32100d09fd5143AB8a10bE20FaC3227f391684", // TODO: NEEDS TO CHANGE FOR AVAX
  },
];

export const chainDataMintingPathTestnet = [
  {
    name: "Mumbai Polygon",
    image: polygonIcon,
    nft:
      "https://ipfs.io/ipfs/QmZjTpC4NB1fKNa6aRE7ruTbBvw3YmYjT3nkTzsJWnnDuw/Polygon.gif",
    chainNonce: "7",
    creationBlock: 46291138,
    chainId: "80001",
    evm: true,
    rpc: "https://polygon-testnet.public.blastapi.io",
    contract: "0xce715Ab3E0A40Bd718e6C4c9cd9c41D874494054",
  },
  {
    name: "BSC Testnet",
    image: BSCicon,
    nft:
      "https://ipfs.io/ipfs/QmZjTpC4NB1fKNa6aRE7ruTbBvw3YmYjT3nkTzsJWnnDuw/BSC.gif",
    chainNonce: "4",
    chainId: "97",
    creationBlock: 30841932,
    evm: true,
    rpc: "https://data-seed-prebsc-1-s3.bnbchain.org:8545",
    contract: "0x9abBC52450Cb0B313139fD32752Dd3D87555D5A3",
  },
  {
    name: "Fuji AVAX",
    image: avax,
    nft:
      "https://ipfs.io/ipfs/QmZjTpC4NB1fKNa6aRE7ruTbBvw3YmYjT3nkTzsJWnnDuw/BSC.gif", // TODO: NEEDS TO CHANGE FOR AVAX
    chainNonce: "6", // TODO: NEEDS TO CHANGE FOR AVAX
    chainId: "43113",
    creationBlock: 4211259, // TODO: NEEDS TO CHANGE FOR AVAX
    evm: true,
    rpc: "https://ava-testnet.public.blastapi.io/ext/bc/C/rpc",
    contract: "0xfa32100d09fd5143AB8a10bE20FaC3227f391684", // TODO: NEEDS TO CHANGE FOR AVAX
  },
];

export const REST_API = "https://event-evm-claimed-b73dc04d13d9.herokuapp.com";

export const startDate =
  /*Date.now() + 20_000 ||*/
  new Date("Fri Aug 18 2023 03:00:00 GMT+0300").getTime();
export const endDate = new Date("Fri Sep 1 2023 03:00:00 GMT+0300").getTime();
