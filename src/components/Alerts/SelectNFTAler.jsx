import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { setAlert, setSelectNFTAlert } from "../../store/reducers/generalSlice";

function Alert() {
  const dispatch = useDispatch()
  const to = useSelector((state) => state.general.to);
  const selectedNFTList = useSelector((state) => state.general.selectedNFTList);
  const alert = useSelector((state) => state.general.selectNFTAlert);

  const handleClose = () => {
    dispatch(setSelectNFTAlert(false))
  };

  useEffect(() => {
    if(selectedNFTList.length > 0){
      dispatch(setSelectNFTAlert(false))
    }
  }, [selectedNFTList])

  return (
    <div id="alertb">
      {alert &&
        <div className="aleartBox">
          Select NFT to continue bridging
          <span onClick={handleClose} className="closeBox">
            {" "}
            <Close className="svgWidget closeIcon" />
          </span>
        </div>
      }
    </div>
  );
}

export default Alert;
