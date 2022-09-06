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
import { useEffect, useState } from "react";
import { checkXpNetLocked, checkXpNetPrice } from "../services/deposits";

export default function Deposits() {
    const walletsModal = useSelector((state) => state.discount.walletModal);
    const spend = useSelector((state) => state.discount.spend);
    const dispatch = useDispatch();
    const [xpNetPrice, setXpNetPrice] = useState();
    const [locked, setLocked] = useState();
    const [discountLeftUsd, setDiscountLeftUsd] = useState();
    const account = useSelector((state) => state.general.account);
    const [loader, setLoader] = useState(false);

    const handleClose = () => {
        dispatch(setDepositWalletModal(false));
    };

    useEffect(() => {
        account && setLoader(true);
        const checkLocked = async () => {
            const data = await checkXpNetLocked(account);
            setLocked(data?.totalDepositsXp);
            setDiscountLeftUsd(Math.round(data?.discountLeftUsd / 0.25));
            setLoader(false);
        };
        account && checkLocked();
        const checkPrice = async () => {
            const currentPrice = await checkXpNetPrice();
            setXpNetPrice(currentPrice);
        };
        checkPrice();
    }, [account, spend]);

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
                <div className="deposit__title">XPNET discount program</div>
                <div className="deposit__subtitle">
                    Delegate XPNET to earn discounts for your bridging
                    transactions.
                </div>
            </div>
            <div className="deposit__body">
                <Balance xpNetPrice={xpNetPrice} loader={loader} />
                <Locked
                    xpNetPrice={xpNetPrice}
                    locked={locked}
                    loader={loader}
                />
                <Discount txns={discountLeftUsd} loader={loader} />
                <Staker xpNetPrice={xpNetPrice} />
            </div>
        </div>
    );
}
