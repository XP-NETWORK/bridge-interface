import React from "react";
import { QRCode } from "react-qrcode-logo";
import { useDispatch, useSelector } from "react-redux";

// import tonkeeper from "../../../assets/img/wallet/tonkeeper.svg";
import xpnet from "../../../assets/img/icons/XPNET.svg";

import {
  setActiveTonWalletConnection,
  setQRCodeModal,
} from "../../Wallet/TONWallet/tonStore";
import { Modal } from "react-bootstrap";
import { setTransferLoaderModal } from "../../../store/reducers/generalSlice";

import { Emitter } from "xp.network";

export default function TonQeCodeModal() {
  const dispatch = useDispatch();
  const tonKeeperSession = useSelector(
    (state) => state.tonStore.tonKeeperSession
  );
  const innerWidth = useSelector((state) => state.general.innerWidth);
  const isMobile = innerWidth <= 480;
  const tonHubSession = useSelector((state) => state.tonStore.tonHubSession);
  const activeConnection = useSelector(
    (state) => state.tonStore.activeConnection
  );

  const handleClose = () => {
    dispatch(setQRCodeModal(false));
    dispatch(setActiveTonWalletConnection(""));
    dispatch(setTransferLoaderModal(false));

    Emitter?.dispatchEvent(new Event("cancel tonKeeper"));
  };

  const deepLink =
    activeConnection === "TonKeeper"
      ? tonKeeperSession.deepLink ||
        `https://app.tonkeeper.com/ton-login/support-bot-xp.herokuapp.com/tk?userId=${tonKeeperSession.userId}`
      : tonHubSession?.link;

  console.log(deepLink);

  return (
    <>
      <Modal.Header className={`border-0`}>
        <div className="tron-PopUp__header">
          <Modal.Title>
            {isMobile ? "One last step" : `Connect ${activeConnection}`}
          </Modal.Title>
          <span className="CloseModal" onClick={handleClose}>
            <div className="close-modal"></div>
          </span>
          <ol>
            {isMobile ? (
              <li>Open mobile wallet application</li>
            ) : (
              <li>
                Open {tonKeeperSession?.message ? "TonKeeper" : "TonHub"}{" "}
                application
              </li>
            )}
            {!isMobile && (
              <li>
                Touch{" "}
                <b>
                  <span
                    role="img"
                    aria-label="qrcode"
                    className="anticon anticon-qrcode"
                  >
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="qrcode"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M468 128H160c-17.7 0-32 14.3-32 32v308c0 4.4 3.6 8 8 8h332c4.4 0 8-3.6 8-8V136c0-4.4-3.6-8-8-8zm-56 284H192V192h220v220zm-138-74h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm194 210H136c-4.4 0-8 3.6-8 8v308c0 17.7 14.3 32 32 32h308c4.4 0 8-3.6 8-8V556c0-4.4-3.6-8-8-8zm-56 284H192V612h220v220zm-138-74h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm590-630H556c-4.4 0-8 3.6-8 8v332c0 4.4 3.6 8 8 8h332c4.4 0 8-3.6 8-8V160c0-17.7-14.3-32-32-32zm-32 284H612V192h220v220zm-138-74h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm194 210h-48c-4.4 0-8 3.6-8 8v134h-78V556c0-4.4-3.6-8-8-8H556c-4.4 0-8 3.6-8 8v332c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V644h78v102c0 4.4 3.6 8 8 8h190c4.4 0 8-3.6 8-8V556c0-4.4-3.6-8-8-8zM746 832h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm142 0h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
                    </svg>
                  </span>
                </b>{" "}
                icon in the top right corner{" "}
              </li>
            )}
            {isMobile ? (
              <li>Approve transaction</li>
            ) : (
              <li>Scan the next QR code:</li>
            )}
          </ol>
        </div>
      </Modal.Header>
      {!isMobile ? (
        <QRCode
          className="ton-qrcode"
          value={deepLink}
          size={370}
          quietZone={0}
          logoImage={xpnet}
          removeQrCodeBehindLogo
          eyeRadius={[
            [10, 10, 0, 10],
            [10, 10, 10, 0],
            [10, 0, 10, 10],
          ]}
          fgColor="#002457"
        />
      ) : (
        <a
          className="ton-deep-link changeBtn"
          href={deepLink}
          target="_blank"
          rel="noreferrer"
        >
          Go to app
        </a>
      )}
    </>
  );
}
