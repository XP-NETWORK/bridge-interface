import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Avalanche from "../../assets/img/chain/Avalanche.svg";
import RedClose from "../../assets/img/icons/RedClose.svg";
import RelWhit from "../../assets/img/icons/RelWhit.svg";
import {
  setChainModal,
  setReceiver,
  setSwitchDestination,
} from "../../store/reducers/generalSlice";
import vet from "../../assets/img/Vector.svg";
import { ReactComponent as Vet } from "../../assets/img/Vector.svg";

function DestinationChainReload() {
  const dispatch = useDispatch();
  const receiver = useSelector((state) => state.general.receiver);
  const to = useSelector((state) => state.general.to);
  const { widget } = useSelector(({ general: { widget } }) => ({
    widget,
  }));

  const handleChange = (e) => {
    dispatch(setReceiver(e.target.value));
  };

  function handleSwitchChain() {
    dispatch(setSwitchDestination(true));
  }

  useEffect(() => {}, [to]);

  return (
    <div className="destiAddress">
      <div className="desChain">
        Destination
        <span>
          <img style={{ width: "30px" }} src={to.image.src} alt="" /> {to.key}
          <div onClick={() => handleSwitchChain()} className="triangle">
            {widget ? (
              <div>
                <Vet className="svgWidget trg" />
              </div>
            ) : (
              <img src={vet} alt="" />
            )}
          </div>
        </span>
      </div>
      <div className="desAddress">
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Paste destination address"
        />
        <span className="invalid">
          <img src={RedClose} alt="Close" /> Invalid address
        </span>
      </div>
    </div>
  );
}

export default DestinationChainReload;
