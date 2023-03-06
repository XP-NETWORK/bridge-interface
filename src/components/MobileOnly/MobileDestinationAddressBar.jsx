import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDepartureOrDestination,
  setReceiver,
  setSwitchDestination,
} from "../../store/reducers/generalSlice";
import ChainSwitch from "../Buttons/ChainSwitch";

import "./Mobile.css";
import { withServices } from "../App/hocs/withServices";

import propTypes from "prop-types";

function MobileDestinationAddressBar({ serviceContainer }) {
  const { bridge } = serviceContainer;
  const receiver = useSelector((state) => state.general.receiver);
  const dispatch = useDispatch();
  const to = useSelector((state) => state.general.to);
  const [invalidAddress, setInvalid] = useState(false);

  const handleChange = async (e) => {
    const address = e.target.value;
    const chainWrapper = await bridge.getChain(to.nonce);
    const validAddress = await chainWrapper.validateAddress(address);
    console.log(validAddress);
    if (!validAddress) {
      setInvalid(true);
      dispatch(setReceiver(""));
      return;
    }

    setInvalid(false);
    dispatch(setReceiver(address));
  };

  function handleSwitchChain() {
    dispatch(setDepartureOrDestination("destination"));
    dispatch(setSwitchDestination(true));
  }
  const alert = useSelector((state) => state.general.pasteDestinationAlert);

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
          onChange={(e) => handleChange(e)}
          type="text"
          value={receiver}
          className={`reciverAddress ${invalidAddress ? "invalid" : ""}`}
          placeholder="Paste destination address"
        />
        <span className={`invalid ${invalidAddress ? "visible" : ""}`}>
          Invalid address
        </span>
      </div>
    </div>
  );
}

MobileDestinationAddressBar.propTypes = {
  serviceContainer: propTypes.object,
};

export default withServices(MobileDestinationAddressBar);
