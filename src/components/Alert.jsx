import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as Close } from "../assets/img/icons/close.svg";

function Alert() {
  const [show, setShow] = useState(true);
  const to = useSelector((state) => state.general.to);
  const from = useSelector((state) => state.general.from);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div id="alertb">
      {(from && to) || !show ? (
        ""
      ) : (
        <div className="aleartBox">
          Select Departure and Destination Chain to continue bridging
          <span onClick={() => handleClose()} className="closeBox">
            {" "}
            <Close className="svgWidget" />
          </span>
        </div>
      )}
    </div>
  );
}

export default Alert;
