import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDepartureOrDestination,
  setReceiver,
  setSwitchDestination,
  setError,
  setIsInvalidAddress,
} from "../../store/reducers/generalSlice";
import ChainSwitch from "../Buttons/ChainSwitch";
import RedClose from "../../assets/img/icons/RedClose.svg";
import "./Mobile.css";
import {
  generalValidation,
  inputFilter,
  validateFunctions,
} from "../../services/addressValidators";

// import * as near from 'near-sdk-js'
// import { CurveType } from "near-sdk-js";

export default function MobileDestinationAddressBar() {
  const dispatch = useDispatch();
  const to = useSelector((state) => state.general.to);
  let receiver = useSelector((state) => state.general.receiver);
  const isInvalid = useSelector((state) => state.general.isInvalid);

  const handleChange = (e) => {
    try {
      if (inputFilter(e)) {
        let address = e.target.value.trim();
        if (generalValidation(e, receiver)) {
          const validateFunc = validateFunctions[to.type];
          if (validateFunc) {
            dispatch(setIsInvalidAddress(validateFunc(address)));
            dispatch(setReceiver(address));
          }
        } else {
          // dispatch(setIsInvalidAddress(true));
        }
      }
    } catch (error) {
      dispatch(setError(error));
    }
  };

  function handleSwitchChain() {
    dispatch(setDepartureOrDestination("destination"));
    dispatch(setSwitchDestination(true));
  }
  const alert = useSelector((state) => state.general.pasteDestinationAlert);

  useEffect(() => {
    dispatch(setReceiver(""));
    dispatch(setIsInvalidAddress(true));
  }, [to]);

  useEffect(() => {
    if (receiver === "") {
      dispatch(setIsInvalidAddress(true));
    }
  }, [receiver]);

  return (
    <div className="mobile-destination__container">
      <div className="mobile-destination__header">
        <div className="mobile-destination__subtitle">
          <div>Destination Chain</div>
        </div>
        <ChainSwitch assignment={"to"} func={handleSwitchChain} />
      </div>
      <div
        className={
          !alert
            ? "mobile-destination__address"
            : "mobile-destination__address desti-alert"
        }
      >
        <input
          value={receiver}
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Paste destination address"
          className={isInvalid ? "reciverAddress" : "reciverAddress invalid"}
        />
        {/* <span className="invalid">
            <img src={RedClose} alt="Close" /> Invalid address
          </span> */}
        {!isInvalid && (
          <span className={"invalid visible"}>
            <img src={RedClose} alt="Close" /> Invalid address
          </span>
        )}
      </div>
    </div>
  );
}
