import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { setPasteDestinationAlert } from "../../store/reducers/generalSlice";

function PasteDestinationAlert() {
  const dispatch = useDispatch();
  const receiver = useSelector((state) => state.general.receiver);
  let alert = useSelector((state) => state.general.pasteDestinationAlert);
  let to = useSelector((state) => state.general.to);

  const handleClose = () => {
    dispatch(setPasteDestinationAlert(false));
  };

  useEffect(() => {
    dispatch(setPasteDestinationAlert(false));
  }, [to]);

  useEffect(() => {
    if (receiver) {
      dispatch(setPasteDestinationAlert(false));
    }
  }, [receiver]);

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
