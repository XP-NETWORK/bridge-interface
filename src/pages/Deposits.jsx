import "./Deposits.css";
import percent from "../assets/img/icons/percent.svg";
import ICON from "../assets/img/icons/ICON.png";
import Staker from "../components/Deposits/Staker";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setDepositWalletModal } from "../store/reducers/discountSlice";
import DiscountWalletModal from "../components/Deposits/DiscountWalletModal";
import Balance from "../components/Deposits/Balance";
import Locked from "../components/Deposits/Locked";
import Discount from "../components/Deposits/Discount";

export default function Deposits() {
    const walletsModal = useSelector((state) => state.discount.walletModal);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setDepositWalletModal(false));
    };

    return (
        <div className="deposit__container">
            <Modal
                show={walletsModal}
                onHide={handleClose}
                animation={false}
                className="ChainModal wallet-modal"
            >
                <DiscountWalletModal handleClose={handleClose} />
            </Modal>
            <div className="deposit__header">
                <div className="deposit__title">XPNET deposit program</div>
                <div className="deposit__subtitle">
                    Delegate XPNET to validators to earn discounts for your
                    bridging transactions.
                </div>
            </div>
            <div className="deposit__body">
                <Balance />
                <Locked />
                <Discount />
                <Staker />
            </div>
        </div>
    );
}
