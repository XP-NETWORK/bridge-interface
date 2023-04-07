import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { setInvalidAddressAlert } from "../../store/reducers/generalSlice";

function InvalidAddressAlert() {
  const dispatch = useDispatch();
  let alert = useSelector((state) => state.general.invalidAddressAlert);
  let from = useSelector((state) => state.general.from);
  let to = useSelector((state) => state.general.to); 
  useEffect(()=>{
    handleClose()
  },[to, from])

  const handleClose = () => {
    dispatch(setInvalidAddressAlert(false));
  };

  return (
    <div id="alertb">
      {alert && (
        <div className="aleartBox">
          Invalid destination address
          <span onClick={handleClose} className="closeBox">
            {" "}
            <Close className="svgWidget closeIcon" />
          </span>
        </div>
      )}
    </div>
  );
}

export default InvalidAddressAlert;
