import auroraIcon from "../../assets/mainSection/chainSelect/auroraIcon.svg";
import BSCicon from "../../assets/mainSection/chainSelect/BSCicon.svg";
import moonbeamIcon from "../../assets/mainSection/chainSelect/moonbeamIcon.svg";
//import nearIcon from "../../assets/mainSection/chainSelect/nearIcon.svg";
import polygonIcon from "../../assets/mainSection/chainSelect/polygonIcon.svg";

import auroraNFT from "../../assets/mainSection/nfts/XPNFT-Aurora.gif";
import BSCnFT from "../../assets/mainSection/nfts/XPNFT-BSC.gif";
import moonbeamNFT from "../../assets/mainSection/nfts/XPNFT-moonbeam.gif";
//import nearNFT from "../../assets/mainSection/nfts/XPNFT-Near.gif";
import polygonNFT from "../../assets/mainSection/nfts/XPNFT-Polygon.gif";

export const chainData = [
    {
        name: "Aurora",
        image: auroraIcon,
        nft: auroraNFT,
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
        nft: nearNFT,
        chainNonce: "31",
        evm: false,
    },*/
    {
        name: "Polygon",
        image: polygonIcon,
        nft: polygonNFT,
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
        nft: BSCnFT,
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
        nft: moonbeamNFT,
        chainNonce: "32",
        chainId: "1284",
        creationBlock: 4211259,
        evm: true,
        rpc: "https://rpc.api.moonbeam.network",
        contract: "0xf777be29f4691D025C14afeeF9B05352CC94C59c",
    },
];

export const REST_API = "https://event-evm-claimed-b73dc04d13d9.herokuapp.com";

export const startDate =
    /*Date.now() + 20_000 ||*/
    new Date("Fri Aug 18 2023 03:00:00 GMT+0300").getTime();
export const endDate = new Date("Fri Sep 1 2023 03:00:00 GMT+0300").getTime();
