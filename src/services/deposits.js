import xpnetInterface from "./artifacts/XPToken.json";
import xpBridgeInterface from "./artifacts/xpBridgeDescount.json";
import { ethers } from "ethers";
import Web3 from "web3";
import axios from "axios";
const Contract = require("web3-eth-contract");

const xpnet = "0x8cf8238abf7b933bf8bb5ea2c7e4be101c11de2a";
const xpBridgeDiscount = "0x2c61dfDB80666e005D1888ca1811027fcf21833a";
const baseUrl = " https://bridge-discount-server.herokuapp.com/api";

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

export const checkXpNetPrice = async () => {
    try {
        const currentPrice = await axios.get(
            "https://api.xp.network/current-price"
        );
        return currentPrice.data;
    } catch (error) {
        console.log(error);
        return;
    }
};

export const checkXpNetLocked = async (account) => {
    if (account) {
        try {
            const resp = await axios.get(
                `https://bridge-discount-server.herokuapp.com/api?address=${account}`
            );
            const { data } = resp;
            return data;
        } catch (error) {
            console.log(error);
            return;
        }
    }
};
