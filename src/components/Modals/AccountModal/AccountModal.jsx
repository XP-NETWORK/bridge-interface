import React, { useRef } from "react";
import NftSelect from "../../../assets/img/nftselect.svg";

import { useSelector, useDispatch } from "react-redux";
import { setAccountModal } from "../../../store/reducers/generalSlice";
// import { CopyToClipboard } from "react-copy-to-clipboard";

import Tooltip from "./Tooltip";
import { DetectOutsideClick } from "./accountModalHelper";

export default function AccountModal() {
  const dispatch = useDispatch();
  let account = useSelector((state) => state.general.account);

  let connectedWallet = useSelector((state) => state.general.connectedWallet);

  const { wid, wsettings } = useSelector(({ widget }) => ({
    widget: widget.widget,
    wsettings: widget.wsettings,
    wid: widget.wid,
  }));

  const show = useSelector((state) => state.general.accountModal);

  const copyTextToClipboard = async () => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(account);
    } else {
      return document.execCommand("copy", true, account);
    }
  };

  const handleClose = () => {
    dispatch(setAccountModal(false));
  };

  const accountModal = useRef(null);

  DetectOutsideClick(accountModal, () => setTimeout(() => handleClose(), 100));
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

      {/* <CopyToClipboard text={account}> */}
      <div onClick={copyTextToClipboard} className="account-modal__account">
        <img src={NftSelect} alt="#" />
        {account?.length > 12
          ? account &&
            `${account?.substring(0, 10)}...${account?.substring(
              account?.length - 2
            )}`
          : account}
        <Tooltip />
      </div>
      {/* </CopyToClipboard> */}
      <div className="accountBtn">
        <button
          onClick={async () => {
            const network = location.pathname.match(/(staging|testnet)/)?.at(0);
            window.safeLocalStorage?.clear();
            window.open(
              `/${network}/connect?${wid ? `wid=${wid}` : ""}${
                wsettings ? "&wsettings=true" : ""
              }`,
              "_self"
            );
          }}
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
