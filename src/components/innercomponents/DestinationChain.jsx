import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import RedClose from "../../assets/img/icons/RedClose.svg";
import {
  setDepartureOrDestination,
  setReceiver,
  setSwitchDestination,
  setError,
  setIsInvalidAddress,
} from "../../store/reducers/generalSlice";
import ChainSwitch from "../Buttons/ChainSwitch";

import * as taquito from "@taquito/utils";
import * as algo from "algosdk";
import { ethers } from "ethers";
import TonWeb from "tonweb";
import * as erdjs from "@elrondnetwork/erdjs";
import TronWeb from "tronweb";
// import {AptosAccount, AptosClient} from 'aptos'
import { PublicKey } from "@solana/web3.js";
// import {ByronAddress} from '@emurgo/cardano-serialization-lib-nodejs'
// import * as near from 'near-sdk-js'
// import { CurveType } from "near-sdk-js";

function DestinationChain() {
  let alert = useSelector((state) => state.general.pasteDestinationAlert);
  const to = useSelector((state) => state.general.to);
  const isInvalid = useSelector((state) => state.general.isInvalid);

  const dispatch = useDispatch();
  let receiver = useSelector((state) => state.general.receiver);

  function handleSwitchChain() {
    dispatch(setDepartureOrDestination("destination"));
    dispatch(setSwitchDestination(true));
  }

  useEffect(() => {
    dispatch(setReceiver(""));
  }, [to]);

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

  const handleChange = (e) => {
    try {
      let address = e.target.value;
      console.log(e);
      if (address !== "") {
        switch (to.type) {
          case "EVM": {
            dispatch(setIsInvalidAddress(addressValidateWeb3(address)));
            dispatch(setReceiver(address));
            break;
          }

          case "TON": {
            dispatch(setIsInvalidAddress(addressValidateTon(address)));
            dispatch(setReceiver(address));
            break;
          }

          // case "Cardano": {
          //   setIsInvalidAddress(addressValidateCardano(address));
          //   dispatch(setReceiver(address));
          //   break;
          // }

          case "Elrond": {
            dispatch(setIsInvalidAddress(addressValidateElrd(address)));
            dispatch(setReceiver(address));
            break;
          }

          case "Algorand": {
            dispatch(setIsInvalidAddress(addressValidateAlgo(address)));
            dispatch(setReceiver(address));
            break;
          }

          case "Tezos": {
            dispatch(setIsInvalidAddress(addressValidateTezos(address)));
            dispatch(setReceiver(address));
            break;
          }

          case "Tron": {
            dispatch(setIsInvalidAddress(addressValidateTron(address)));
            dispatch(setReceiver(address));
            break;
          }

          // case "APTOS": {
          //   setIsInvalidAddress(addressValidateAptos(address));
          //   dispatch(setReceiver(address));
          //   break;
          // }

          case "Solana": {
            dispatch(setIsInvalidAddress(addressValidateSolana(address)));
            dispatch(setReceiver(address));
            break;
          }

          case "NEAR": {
            dispatch(setIsInvalidAddress(addressValidateNear(address)));
            dispatch(setReceiver(address));
            break;
          }

          default: {
            dispatch(setReceiver(address));
            break;
          }
        }
      } else {
        dispatch(setIsInvalidAddress(true));
        dispatch(setReceiver(address));
      }
    } catch (error) {
      dispatch(setError(error));
    }
  };

  return (
    <div className="destination-props">
      <div className="destination__header">
        <span className="destination__title">Destination</span>
        <ChainSwitch assignment={"to"} func={handleSwitchChain} />
      </div>

      <div
        className={
          !alert ? "destination__address" : "destination__address desti-alert"
        }
      >
        <input
          value={receiver}
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Paste destination address"
          className={isInvalid ? "reciverAddress" : "reciverAddress invalid"}
        />
        {!isInvalid && (
          <span className={"invalid visible"}>
            <img src={RedClose} alt="Close" /> Invalid address
          </span>
        )}
      </div>
    </div>
  );
}

export default DestinationChain;
