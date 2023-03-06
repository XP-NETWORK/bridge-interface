import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  setDepartureOrDestination,
  setReceiver,
  setSwitchDestination,
} from "../../store/reducers/generalSlice";
import ChainSwitch from "../Buttons/ChainSwitch";

import { withServices } from "../App/hocs/withServices";

import propTypes from "prop-types";

function DestinationChain({ serviceContainer }) {
  const { bridge } = serviceContainer;
  const alert = useSelector((state) => state.general.pasteDestinationAlert);
  const to = useSelector((state) => state.general.to);
  const [invalidAddress, setInvalid] = useState(false);

  const dispatch = useDispatch();
  const receiver = useSelector((state) => state.general.receiver);

  const handleChange = async (e) => {
    const address = e.target.value;
    const chainWrapper = await bridge.getChain(to.nonce);
    const validAddress = await chainWrapper.validateAddress(address);

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

  useEffect(() => {
    dispatch(setReceiver(""));
  }, [to]);

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

DestinationChain.propTypes = {
  serviceContainer: propTypes.object,
};

export default withServices(DestinationChain);
