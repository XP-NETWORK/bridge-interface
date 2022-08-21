import xpnetInterface from "../services/artifacts/XPToken.json";
import xpBridgeInterface from "../services/artifacts/xpBridgeDescount.json";
import { ethers } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";
const { default: Web3 } = require("web3");
const Contract = require("web3-eth-contract");

const xpnet = "0x8cf8238abf7b933bf8bb5ea2c7e4be101c11de2a";
const xpBridgeDiscount = "0xf88870607a62c1b86aD672d994C067bfA2BF2C30";

const provider = new JsonRpcProvider(
    "https://data-seed-prebsc-1-s1.binance.org:8545"
);
Contract.setProvider(provider);
const xpNetCntract = new Contract(xpnetInterface, xpnet);
const xpBridgeContract = new Contract(xpBridgeInterface, xpBridgeDiscount);
