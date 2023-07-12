import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { setError } from "../../store/reducers/generalSlice";
import ERR from "../../assets/img/icons/ERROR.svg";
import WHERROR from "../../assets/img/icons/error-icon.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import WhiteListError from "../ErrorsBodies/WhiteListError";

export default function Error() {
    const dispatch = useDispatch();
    const URLToOptIn = useSelector((state) => state.general.URLToOptIn);
    const handleClose = () => {
        dispatch(setError(false));
    };
    let { error, errorLink } = useSelector((state) => ({
        error: state.general.error,
        errorLink: state.general.errorLink,
    }));
    const whitelistErr = error?.includes("automatically whitelisted");

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
                        src={!whitelistErr ? ERR : WHERROR}
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
                    {errorLink && (
                        <span>
                            ,{" "}
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={errorLink.href}
                            >
                                {errorLink.text}
                            </a>
                        </span>
                    )}
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
