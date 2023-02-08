import React, { useRef } from "react";
import NftSelect from "../../../assets/img/nftselect.svg";

import { useSelector, useDispatch } from "react-redux";
import { setAccountModal } from "../../../store/reducers/generalSlice";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Tooltip from "./Tooltip";
import { DetectOutsideClick } from "./accountModalHelper";

export default function AccountModal() {
    const dispatch = useDispatch();
    let account = useSelector((state) => state.general.account);

    const connectedWallet = useSelector(
        (state) => state.general.connectedWallet
    );

    const show = useSelector((state) => state.general.accountModal);

    const handleClose = () => {
        dispatch(setAccountModal(false));
    };

    const accountModal = useRef(null);

    DetectOutsideClick(accountModal, () =>
        setTimeout(() => handleClose(), 100)
    );
    // ! ref
    return show ? (
        <div
            ref={accountModal}
            className="accountBox"
            // show={show}
            // onHide={handleClose}
        >
            <div className="accountTit">
                Account{" "}
                <span className="CloseModal" onClick={handleClose}>
                    <div className="close-modal"></div>
                </span>
            </div>
            <p>{connectedWallet}</p>

            <CopyToClipboard text={account}>
                <div className="account-modal__account">
                    <img src={NftSelect} alt="#" />
                    {account &&
                        `${account.substring(0, 10)}...${account.substring(
                            account.length - 2
                        )}`}
                    <Tooltip />
                </div>
            </CopyToClipboard>
            <div className="accountBtn">
                <button
                    onClick={() => window.location.reload()}
                    className="changeBtn"
                >
                    Disconnect
                </button>
            </div>
        </div>
    ) : (
        ""
    );
}
