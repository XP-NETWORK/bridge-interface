import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { setDepositAlert } from "../../store/reducers/discountSlice";
import { setAlert, setSelectNFTAlert } from "../../store/reducers/generalSlice";

function DepositAlert() {
    const dispatch = useDispatch();
    const alert = useSelector((state) => state.discount.depositAlert);

    const handleClose = () => {
        dispatch(setDepositAlert(false));
    };

    return (
        <div id="alertb">
            {alert && (
                <div className="aleartBox">
                    Connect EWM wallet to approve
                    <span onClick={handleClose} className="closeBox">
                        <Close className="svgWidget closeIcon" />
                    </span>
                </div>
            )}
        </div>
    );
}

export default DepositAlert;
