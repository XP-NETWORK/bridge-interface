import React, { useEffect, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import { useDispatch, useSelector } from "react-redux";
import { awaitTonHubReady } from "../../Wallet/TONWallet/TonConnectors";
import tonkeeper from "../../../assets/img/wallet/tonkeeper.svg";
//import { setSigner } from "../../../store/reducers/signersSlice";
import { setQRCodeModal } from "../../Wallet/TONWallet/tonStore";
import { Modal } from "react-bootstrap";
import {
  setConnectedWallet,
  setTonAccount,
  setTonWallet,
} from "../../../store/reducers/generalSlice";

import { setSigner } from "../../../store/reducers/signersSlice";

export default function TonQeCodeModal() {
  let interval = useRef();
  const dispatch = useDispatch();
  const tonKeeperResponse = useSelector(
    (state) => state.tonStore.tonKeeperResponse
  );
  const tonHubSession = useSelector((state) => state.tonStore.tonHubSession);
  const factory = useSelector((state) => state.general.factory);
  const signer = useSelector((state) => state.signers.signer);

  useEffect(async () => {
    //let session;
    try {
      /*session = await new Promise((resolve) => {
        interval = setInterval(async () => {
          session = await awaitTonHubReady();
          console.log(session, "session");
          if (session) {
            clearInterval(interval);
            resolve(session);
          }
        }, 1000);
      });*/

      const session = await awaitTonHubReady();

      console.log(session);

      const fromChain = await factory.inner(27);

      const wrappedSigner = fromChain.tonHubWrapper({
        wallet: signer,
        config: {
          seed: tonHubSession.seed,
          appPublicKey: session.config.appPublicKey,
          address: session.address,
        },
      });

      console.log(wrappedSigner);

      dispatch(setSigner(wrappedSigner));
      dispatch(setTonWallet(session));
      dispatch(setQRCodeModal(false));
      dispatch(setTonAccount(session.address));
      dispatch(setConnectedWallet("TonHub"));
    } catch (error) {
      clearInterval(interval);
      console.log(error);
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Modal.Header className="border-0">
        <div className="tron-PopUp__header">
          <Modal.Title>Connect TonHub</Modal.Title>
          <span
            className="CloseModal"
            onClick={() => dispatch(setQRCodeModal(false))}
          >
            <div className="close-modal"></div>
          </span>
          <ol>
            <li>Open Tonhub application</li>
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
            <li>Scan the next QR code:</li>
          </ol>
        </div>
      </Modal.Header>
      <QRCode
        className="ton-qrcode"
        value={
          tonKeeperResponse
            ? `https://app.tonkeeper.com/ton-login/${tonKeeperResponse?.v1.callback_url}/tk/?id=${tonKeeperResponse?.v1.session}/init`
            : tonHubSession?.link
        }
        size={256}
        quietZone={0}
        logoImage={tonkeeper}
        removeQrCodeBehindLogo
        eyeRadius={[
          [10, 10, 0, 10],
          [10, 10, 10, 0],
          [10, 0, 10, 10],
        ]}
        fgColor="#002457"
      />
    </>
  );
}
