import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { setError } from "../../store/reducers/generalSlice";
import ERR from "../../assets/img/icons/ERROR.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import WhiteListError from "../ErrorsBodies/WhiteListError";

export default function Error() {
    const dispatch = useDispatch();
    const URLToOptIn = useSelector((state) => state.general.URLToOptIn);
    const handleClose = () => {
        dispatch(setError(false));
    };
    let error = useSelector((state) => state.general.error);
    const whitelistErr = error?.includes("automatically whitelisted");
    console.log("🚀 ~ file: Error.jsx:16 ~ Error ~ error", error);

    if (error && whitelistErr) {
        error = <WhiteListError />;
    }

    return (
        <>
            <Modal.Header animation={false} className="border-0">
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <img
                        style={{ margin: "30px auto", width: "120px" }}
                        alt=""
                        src={ERR}
                    />
                    <Modal.Title style={{ textAlign: "center" }}>
                        {!whitelistErr
                            ? "An error has occurred"
                            : "Smart contract cannot be automatically whitelisted"}
                    </Modal.Title>
                    <span className="CloseModal" onClick={handleClose}>
                        <Close className="svgWidget" />
                    </span>
                </div>
            </Modal.Header>
            <Modal.Body className="modalBody text-center">
                <div
                    style={error?.length > 30 ? { fontSize: "11px" } : {}}
                    className="wrongNFT"
                >
                    {error}
                </div>
                {URLToOptIn && (
                    <CopyToClipboard text={URLToOptIn}>
                        <div className="opt-in__error">
                            <div className="opt-in__body">
                                <div className="opt-in__text">
                                    Click on{" "}
                                    <a
                                        href={URLToOptIn}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        LINK{" "}
                                    </a>
                                    or send it to the receiver to opt-in the
                                    NFT.
                                </div>
                            </div>
                        </div>
                    </CopyToClipboard>
                )}
            </Modal.Body>
        </>
    );
}
