import xpnetInterface from "./artifacts/XPToken.json";
import xpBridgeInterface from "./artifacts/xpBridgeDescount.json";
import { BigNumber, ethers } from "ethers";
import Web3 from "web3";
import axios from "axios";
const Contract = require("web3-eth-contract");
const Web3Utils = require("web3-utils");

const xpnet = "0x8cf8238abf7b933bf8bb5ea2c7e4be101c11de2a";
const xpBridgeDiscount = "0x2c61dfdb80666e005d1888ca1811027fcf21833a";

const createXpNetContract = (provider) => {
    Contract.setProvider(provider);
    const xpNetContract = new Contract(xpnetInterface, xpnet);
    return xpNetContract;
};

const createXpBridgeContract = (provider) => {
    Contract.setProvider(provider);
    let contract;
    contract = new Contract(xpBridgeInterface.abi, xpBridgeDiscount);
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
        .catch((error) => {
            console.log(error);
            return false;
        });
    return approved;
};

export const deposit = async (provider, address, num) => {
    let deposited;
    const weiValue = Web3.utils.toWei(num.toString(), "ether");
    const contract = await createXpBridgeContract(provider);
    if (contract) {
        try {
            const deposit = await contract.methods
                .deposit(weiValue)
                .send({ from: address });
            deposited = deposit;
        } catch (error) {
            console.log(error);
            deposited = false;
        }
    }
    return deposited;
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

export const patchRealizedDiscount = async (account, fee, nonce) => {
    const discount = fee * 0.4;
    const cryptoRealized = Web3Utils.fromWei(String(discount), "ether");

    var config = {
        method: "patch",
        url: `https://bridge-discount-server.herokuapp.com/api/relization?address=${account}&realized=${cryptoRealized}&chain=${nonce}`,
    };

    axios(config).then(function(response) {
        console.log(JSON.stringify(response.data));
    });
};
