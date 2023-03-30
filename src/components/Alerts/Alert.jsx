import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { setAlert } from "../../store/reducers/generalSlice";

function Alert() {
  const dispatch = useDispatch();
  const to = useSelector((state) => state.general.to);
  const from = useSelector((state) => state.general.from);
  const alert = useSelector((state) => state.general.alert);

  const handleClose = () => {
    dispatch(setAlert(false));
  };

  const timerRef = useRef(null);
  useEffect(() => {
    if (alert && !timerRef.current) {
      timerRef.current = setTimeout(() => {
        dispatch(setAlert(false));
      }, 5000);
    }
    return () => {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [alert]);

  return (
    <div id="alertb">
      {!alert ? (
        ""
      ) : (
        <div className="aleartBox">
          {!from && to
            ? "Select Departure Chain "
            : from && !to
            ? "Select Destination Chain "
            : "Select Departure and Destination Chain "}
          to continue bridging
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
