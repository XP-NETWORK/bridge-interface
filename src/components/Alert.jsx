import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../assets/img/icons/close.svg";
import { setAlert } from "../store/reducers/generalSlice";

function Alert() {
  const dispatch = useDispatch()
  const to = useSelector((state) => state.general.to);
  const from = useSelector((state) => state.general.from);
  const alert = useSelector((state) => state.general.alert);

  const handleClose = () => {
    dispatch(setAlert(false))
  };

  return (
    <div id="alertb">
      {(from && to) || !alert ? (
        ""
      ) : (
        <div className="aleartBox">
          Select Departure and Destination Chain to continue bridging
          <span onClick={() => handleClose()} className="closeBox">
            {" "}
            <Close className="svgWidget closeIcon" />
          </span>
        </div>
      )}
    </div>
  );
}

export default Alert;
