/* eslint-disable no-debugger */
import * as taquito from "@taquito/utils";
import * as algo from "algosdk";
import { ethers } from "ethers";
import TonWeb from "tonweb";
import * as erdjs from "@elrondnetwork/erdjs";
import { PublicKey } from "@solana/web3.js";

const addressValidateTon = (address) => {
    console.log("here: ", TonWeb.Address.isValid(address));
    return TonWeb.Address.isValid(address);
};

const addressValidateEVM = (address) => {
    return ethers.utils.isAddress(address);
};

const addressValidateElrd = (address) => {
    if (address === "") return false;
    if (/^(?! )[0-9a-zA-Z]{62}$/.test(address)) return true;

    try {
        const elrd = new erdjs.Address(address);
        return elrd ? true : false;
    } catch (_) {
        return false;
    }
};

const addressValidateTron = (address) => {
    if (typeof address !== "string") {
        return false;
    }

    if (!address.startsWith("T")) {
        return false;
    }

    if (address.length !== 34) {
        return false;
    }

    const base58Regex = /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/;
    if (!base58Regex.test(address)) {
        return false;
    }

    return true;
};

const addressValidateNear = (address) => {
    // NEAR wallet address are simple base64 strings containing lowercase and numeric characters only
    // return true; ///^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(address);

    if(address === "") return false;
    if(String(address).includes('.') && address.length !== 64){
    if(String(address).substring(address.length, address.length-5).toLowerCase() === '.near'){

        return /^[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(address)
    }
    return false;
        
    }
    if(address.length === 64) {
        return /^[a-zA-Z0-9]{64}$/.test(address)
    }
    else return false;
    
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

const charMatch = (e, str, char) => {
    const keyPressed = e.nativeEvent.data;
    const lastChar = str.charAt(str.length - 1);
    return lastChar === char && keyPressed === char && lastChar === keyPressed;
};

export const generalValidation = (e, receiver) => {
    let isValid = true;
    //cannot contain consecutive special characters
    if (
        charMatch(e, receiver, ".") ||
        charMatch(e, receiver, "$") ||
        charMatch(e, receiver, "&")
    ) {
        isValid = false;
    }

    if (e.nativeEvent.inputType !== "deleteContentBackward") {
        if (
            /^[ A-Za-z/]*$/.test() &&
            receiver.length >= 3 &&
            receiver.charAt(receiver.length - 1) ===
                receiver.charAt(receiver.length - 2) &&
            receiver.charAt(receiver.length - 1) ===
                receiver.charAt(receiver.length - 3)
        ) {
            isValid = false;
        }
    }

    if (e.nativeEvent.inputType !== "deleteContentBackward") {
        if (
            /^[ A-Za-z/]*$/.test() &&
            receiver.length >= 3 &&
            receiver.charAt(receiver.length - 1) ===
                receiver.charAt(receiver.length - 2) &&
            receiver.charAt(receiver.length - 1) ===
                receiver.charAt(receiver.length - 3)
        ) {
            isValid = false;
        }
    }

    console.log(isValid);

    return isValid;
};

export const inputFilter = (e) => {
    return /^[ A-Za-z0-9_.$&/]*$/.test(e.nativeEvent.data);
};

const addressValidateCosmos = (address) => {
    const regex = /^secret1[0-9a-z]{38}$/;
    return regex.test(address);
};

export const validateFunctions = {
    EVM: addressValidateEVM,
    TON: addressValidateTon,
    Elrond: addressValidateElrd,
    Algorand: addressValidateAlgo,
    Tezos: addressValidateTezos,
    Tron: addressValidateTron,
    Solana: addressValidateSolana,
    NEAR: addressValidateNear,
    Cosmos: addressValidateCosmos,
    VeChain: addressValidateEVM,
};

export const maxChainAddressLengths = {
    EVM: 42,
    TON: 48,
    Elrond: 62,
    Algorand: 58,
    Tezos: 36,
    Tron: 42,
    Solana: 44,
    NEAR: 64,
    Cosmos: 45,
    VeChain: 42,
};
 