import xpnetInterface from "./artifacts/XPToken.json";
import xpBridgeInterface from "./artifacts/xpBridgeDescount.json";
import { ethers } from "ethers";
import Web3 from "web3";
const Contract = require("web3-eth-contract");

const xpnet = "0x8cf8238abf7b933bf8bb5ea2c7e4be101c11de2a";
const xpBridgeDiscount = "0x2c61dfDB80666e005D1888ca1811027fcf21833a";

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

export const checkXpNetBalance = async (provider, address) => {
    const contract = createXpNetContract(provider);
    let weiBalance;
    weiBalance = await contract.methods.balanceOf(address).call();
    const balance = parseInt(Web3.utils.fromWei(weiBalance, "ether"));
    return balance;
};

export const approve = async (provider, account) => {
    let contract;
    let approved;
    if (provider) {
        contract = createXpNetContract(provider);
    }
    await contract.methods
        .approve(xpBridgeDiscount, "1000000000000000000000000000000000000")
        .send({ from: account })
        .then((receipt) => {
            approved = receipt;
        })
        .catch((error) => console.log(error));
    return approved;
};

export const deposit = async () => {
    //todo
};
