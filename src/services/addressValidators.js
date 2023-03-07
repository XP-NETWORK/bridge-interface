import * as taquito from "@taquito/utils";
import * as algo from "algosdk";
import { ethers } from "ethers";
import TonWeb from "tonweb";
import * as erdjs from "@elrondnetwork/erdjs";
import TronWeb from "tronweb";
// import {AptosAccount, AptosClient} from 'aptos'
import { PublicKey } from "@solana/web3.js";

const addressValidateTon = (address) => {
    console.log("here: ", TonWeb.Address.isValid(address));
    return TonWeb.Address.isValid(address);
};

const addressValidateWeb3 = (address) => {
    return ethers.utils.isAddress(address);
};

// const addressValidateCardano = (address) => {
//   return ByronAddress.from_bytes(address) ? true : false;
// };

const addressValidateElrd = (address) => {
    try {
        const elrd = new erdjs.Address(address);
        return elrd ? true : false;
    } catch (_) {
        return false;
    }
};

const addressValidateTron = (address) => {
    try {
        TronWeb.address.toHex(address);
        return true;
    } catch (error) {
        return false;
    }
};

// const addressValidateAptos = (address) => {
//   return new AptosAccount.isValidPath(address);
// };

const addressValidateNear = (address) => {
    // NEAR wallet address are simple base64 strings containing lowercase and numeric characters only
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(address);
};

const addressValidateAlgo = (address) => {
    return algo.isValidAddress(address);
};

const addressValidateTezos = (address) => {
    return taquito.validateAddress(address) == taquito.ValidationResult.VALID;
};

const addressValidateSolana = (address) => {
    try {
        let publicKey = new PublicKey(address);
        PublicKey.isOnCurve(publicKey.toBuffer());
        return true;
    } catch (error) {
        return false;
    }
};

const addressValidateCosmos = (address) => {
    const regex = /^secret1[0-9a-z]{38}$/;
    return regex.test(address);
};

export const validateFunctions = {
    EVM: addressValidateWeb3,
    TON: addressValidateTon,
    Elrond: addressValidateElrd,
    Algorand: addressValidateAlgo,
    Tezos: addressValidateTezos,
    Tron: addressValidateTron,
    Solana: addressValidateSolana,
    NEAR: addressValidateNear,
    Cosmos: addressValidateCosmos,
};
