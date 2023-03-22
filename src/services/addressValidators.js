/* eslint-disable no-debugger */
import * as taquito from "@taquito/utils";
import * as algo from "algosdk";
import { ethers } from "ethers";
import TonWeb from "tonweb";
import * as erdjs from "@elrondnetwork/erdjs";
// import TronWeb from "tronweb";
// import {AptosAccount, AptosClient} from 'aptos'
import { PublicKey } from "@solana/web3.js";

const addressValidateTon = (address) => {
    console.log("here: ", TonWeb.Address.isValid(address));
    return TonWeb.Address.isValid(address);
};

const addressValidateEVM = (address) => {
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
    // try {
    //     let isValid = false;
    //     TronWeb.address.toHex(address);

    //     /**
    //      * Tron address can either be base58 OR Hexadecimal strings
    //      */
    //     if (/^[A-HJ-NP-Za-km-z1-9]*$/.test(address)) isValid = true; // is base58
    //     if (/^[a-fA-F0-9]+$/.test(address)) isValid = true; // is hex
    //     console.log({ isValid });
    //     return isValid;
    // } catch (error) {
    //     return false;
    // }

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

// function isMultiversxElrondAddress(address) {
//     if (typeof address !== 'string') {
//       return false;
//     }

//     if (!address.startsWith('erd')) {
//       return false;
//     }

//     if (address.length !== 62) {
//       return false;
//     }

//     const bech32Regex = /^[a-z0-9]+$/i;
//     const bech32Data = bech32.decode(address.substring(3));
//     if (!bech32Data || !bech32Data.words || !bech32Data.words.length) {
//       return false;
//     }

//     for (let i = 0; i < bech32Data.words.length; i++) {
//       if (!bech32Regex.test(bech32Data.words[i])) {
//         return false;
//       }
//     }

//     return true;
//   }

const addressValidateNear = () => {
    // NEAR wallet address are simple base64 strings containing lowercase and numeric characters only
    return true; ///^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(address);
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

    if(e.nativeEvent.inputType !== "deleteContentBackward"){
      
        if(
            /^[ A-Za-z/]*$/.test() && 
            receiver.length >=3 && 
            (receiver.charAt(receiver.length-1) === receiver.charAt(receiver.length-2)) && (receiver.charAt(receiver.length-1) === receiver.charAt(receiver.length-3))){
            isValid = false;

            
        }
    }

    console.log(isValid)

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
    VeChain: 42
};