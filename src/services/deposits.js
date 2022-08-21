import xpnetInterface from "./artifacts/XPToken.json";
import xpBridgeInterface from "./artifacts/xpBridgeDescount.json";
import { ethers } from "ethers";
const Contract = require("web3-eth-contract");

const xpnet = "0x8cf8238abf7b933bf8bb5ea2c7e4be101c11de2a";
const xpBridgeDiscount = "0xf88870607a62c1b86aD672d994C067bfA2BF2C30";

const createXpNetContract = (provider) => {
    Contract.setProvider(provider);
    const xpNetContract = new Contract(xpnetInterface, xpnet);
    return xpNetContract;
};

const createXpBridgeContract = (provider) => {
    let contract;
    if (provider) {
        contract = new ethers.Contract(
            xpBridgeDiscount,
            xpBridgeInterface.abi,
            provider
        );
    }
    return contract;
};

export const approve = async (provider) => {
    let contract;
    if (provider) {
        contract = createXpNetContract(provider);
    }
    try {
        const approved = await contract?.methods.approve(
            xpBridgeDiscount,
            "10000000000000000000000000000000000000000000000000"
        );
    } catch (error) {
        console.log(error);
    }
};

export const deposit = async () => {
    //todo
};
