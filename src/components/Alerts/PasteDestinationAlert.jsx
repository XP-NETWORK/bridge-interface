import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { setPasteDestinationAlert } from "../../store/reducers/generalSlice";

function PasteDestinationAlert() {
  const dispatch = useDispatch();
  const receiver = useSelector((state) => state.general.receiver);
  const from = useSelector((state) => state.general.from);
  const alert = useSelector((state) => state.general.pasteDestinationAlert);

  const handleClose = () => {
    dispatch(setPasteDestinationAlert(false));
  };

  useEffect(() => {
    if (receiver) {
      dispatch(setPasteDestinationAlert(false));
    }
  }, [receiver]);

  useEffect(() => {
    dispatch(setPasteDestinationAlert(false));
  }, [from]);

  return (
    <div id="alertb">
      {alert && (
        <div className="aleartBox">
          Paste destination address to continue bridging
          <span onClick={handleClose} className="closeBox">
            {" "}
            <Close className="svgWidget closeIcon" />
          </span>
        </div>
      )}
    </div>
  );
}

export default PasteDestinationAlert;
