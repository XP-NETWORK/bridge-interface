import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import RedClose from "../../assets/img/icons/RedClose.svg";
import { validateFunctions } from "../../services/addressValidators";
import {
    setDepartureOrDestination,
    setReceiver,
    setSwitchDestination,
    setError,
    setIsInvalidAddress,
} from "../../store/reducers/generalSlice";
import ChainSwitch from "../Buttons/ChainSwitch";

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
        dispatch(setReceiver(''))
        dispatch(setIsInvalidAddress(true))
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
        let isValid = false
        TronWeb.address.toHex(address);

        /**
         * Tron address can either be base58 OR Hexadecimal strings
         */
        if(/^[A-HJ-NP-Za-km-z1-9]*$/.test(address)) isValid = true // is base58
        if(/^[a-fA-F0-9]+$/.test(address)) isValid = true // is hex
        return isValid
      } catch (error) {
        return false
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

    const charMatch = (e, str, char) => {
      const keyPressed = e.nativeEvent.data;
      return str.lastIndexOf(char) === str.length - 1 && keyPressed === char;
    };

    const generalValidation = (e) => {
      let isValid = true;

      //cannot contain consecutive special characters
      if (
        charMatch(e, receiver, ".") ||
        charMatch(e, receiver, "$") ||
        charMatch(e, receiver, "&")
      ) {
        isValid = false;
      }
      return isValid;
    };

    const inputFilter = (e) => {
      return /^[ A-Za-z0-9_.$&/]*$/.test(e.nativeEvent.data);
    };

    useEffect(()=>{
      if(receiver === ""){
        dispatch(setIsInvalidAddress(true))
      }
    },[receiver])

    const handleChange = (e) => {
		try {
            if (inputFilter(e)) {
              let address = e.target.value.trim();
              if (generalValidation(e)) {
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
                    dispatch(
                      setIsInvalidAddress(addressValidateTezos(address))
                    );
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
                  dispatch(setIsInvalidAddress(addressValidateSolana(address)))
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
                    !alert
                        ? "destination__address"
                        : "destination__address desti-alert"
                }
            >
                <input
                    value={receiver}
                    onChange={(e) => handleChange(e)}
                    type="text"
                    placeholder="Paste destination address"
                    className={
                        isInvalid ? "reciverAddress" : "reciverAddress invalid"
                    }
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
