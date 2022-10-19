import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { setAlert, setPasteDestinationAlert, setSelectNFTAlert } from "../../store/reducers/generalSlice";

function PasteDestinationAlert() {
  const dispatch = useDispatch()
  const to = useSelector((state) => state.general.to);
  const receiver = useSelector((state) => state.general.receiver);
  const alert = useSelector((state) => state.general.pasteDestinationAlert);

  const handleClose = () => {
    // debugger
    dispatch(setPasteDestinationAlert(false))
  };

  useEffect(() => {
    if(receiver){
      dispatch(setPasteDestinationAlert(false))
    }
  }, [receiver])

  return (
    <div id="alertb">
      {alert &&
        <div className="aleartBox">
          Paste destination address to continue bridging
          <span onClick={handleClose} className="closeBox">
            {" "}
            <Close className="svgWidget closeIcon" />
          </span>
        </div>
      }
    </div>
  );
}

export default PasteDestinationAlert;
