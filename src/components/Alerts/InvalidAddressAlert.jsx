import React from "react";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { setInvalidAddressAlert } from "../../store/reducers/generalSlice";

function InvalidAddressAlert() {
  const dispatch = useDispatch();
  // const receiver = useSelector((state) => state.general.receiver);
  const alert = useSelector((state) => state.general.invalidAddressAlert);

  const handleClose = () => {
    dispatch(setInvalidAddressAlert(false));
  };

  // useEffect(() => {
  //   if (receiver) {
  //     dispatch(setIsInvalidAddress(false));
  //   }
  // }, [receiver]);
  console.log('alert: ',alert)

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
