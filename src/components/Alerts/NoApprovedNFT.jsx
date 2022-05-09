import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { setAlert, setNoApprovedNFTAlert, setPasteDestinationAlert, setSelectNFTAlert } from "../../store/reducers/generalSlice";

function NoApprovedNFT() {
  const dispatch = useDispatch()
  const to = useSelector((state) => state.general.to);
  const receiver = useSelector((state) => state.general.receiver);
  const alert = useSelector((state) => state.general.noApprovedNFTAlert);
  console.log("🚀 ~ file: NoApprovedNFT.jsx ~ line 11 ~ NoApprovedNFT ~ alert", alert)
  const approved = useSelector(state => state.general.approved)


  const handleClose = () => {
    // debugger
    dispatch(setNoApprovedNFTAlert(false))
  };

  useEffect(() => {
    if(approved){
      dispatch(setNoApprovedNFTAlert(false))
    }
  }, [approved])

  return (
    <div id="alertb">
      {alert &&
        <div className="aleartBox">
          Approve selected NFT to continue bridging
          <span onClick={handleClose} className="closeBox">
            {" "}
            <Close className="svgWidget closeIcon" />
          </span>
        </div>
      }
    </div>
  );
}

export default NoApprovedNFT;




