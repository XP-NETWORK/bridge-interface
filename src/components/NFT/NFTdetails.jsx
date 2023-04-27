import { useState, useMemo, React } from "react";
import { Modal } from "react-bootstrap";
import moment from "moment";
import brockenurl from "../../assets/img/brockenurl.png";
import ModalImage from "react-modal-image";
import zoomIn from "../../assets/img/icons/zoomInWhite.png";

import { ReactComponent as CloseComp } from "../../assets/img/icons/close.svg";

import { ReactComponent as INFComp } from "../../assets/img/icons/Inf.svg";

import { chains } from "../values";
import PropTypes from "prop-types";
import Tooltip from "../Modals/AccountModal/Tooltip";
import { StringShortener } from "../../wallet/helpers";

function NFTdetails({ nftInf, details }) {
    const {
        name,
        description,
        attributes,
        uri,
        native,
        wrapped,
        image,
        animation_url,
        originChain,
    } = nftInf;

    const isOriginUriExist =
        Array.isArray(attributes) &&
        attributes?.some((e) => {
            const values = Object.values(e);
            return values?.some((v) => v === "Original URI");
        });
    /*const isOriginChainExist =
    Array.isArray(attributes) &&
    attributes?.some((e) => {
      const values = Object.values(e);
      return values?.some((v) => v === "Original Chain");
    });*/

    const original_uri = wrapped && wrapped.original_uri;
    const origin = chains.find((e) => e.nonce === Number(originChain));

    // const { video, videoUrl, image, imageUrl, ipfsArr } = getUrl(nftInf);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        details(false);
    };
    const handleShow = (e) => {
        setShow(true);
        details(true);
        e.stopPropagation();
    };

    const symbol = nftInf.symbol || native?.symbol;

    const attrs = useMemo(
        () =>
            Array.isArray(attributes) &&
            attributes?.map((attr) =>
                attr?.key
                    ? {
                          ...attr,
                          trait_type: attr?.key,
                      }
                    : attr
            ),
        [attributes]
    );

    return (
        <>
            <div className="info-icon__container">
                <span className="NFTInf" onClick={handleShow}>
                    <INFComp className="svgWidget nftInfIcon" alt="inf" />
                </span>
            </div>
            <Modal
                animation={false}
                show={show}
                onHide={handleClose}
                className="NftDetails"
            >
                <Modal.Header>
                    <Modal.Title>NFT Details</Modal.Title>
                    <span className="CloseModal" onClick={() => handleClose()}>
                        <CloseComp className="svgWidget" alt="closeIcon" />
                    </span>
                </Modal.Header>
                <Modal.Body className="modalBody">
                    <div className="nftDetailBox">
                        <div className="nftDetImg">
                            <ModalImage
                                className="zoomInBtn"
                                small={zoomIn}
                                large={image}
                                hideDownload={true}
                                hideZoom={true}
                            />

                            {(image || animation_url) &&
                            (uri || image) &&
                            true ? (
                                animation_url ? (
                                    <video
                                        controls={false}
                                        playsInline={true}
                                        autoPlay={true}
                                        loop={true}
                                        src={animation_url}
                                    />
                                ) : (
                                    <img alt="NFTss" src={image} />
                                )
                            ) : (
                                <div className="brocken-url">
                                    <img
                                        src={brockenurl}
                                        alt=" Broken Token URI"
                                    />
                                    <span className="brocken-url__msg">
                                        NFTs URL
                                        <br /> is broken
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="nftDetIg">
                            <div className="nftName nftInfBox">
                                <label>Name</label>
                                <p>{name || native?.name}</p>
                            </div>
                            <div className="nftToken nftInfBox">
                                <label>Token ID</label>
                                <div className="token-id-inf">
                                    <div className="id-copy">
                                        {native?.tokenId?.length > 30
                                            ? StringShortener(
                                                  native?.tokenId,
                                                  10
                                              )
                                            : native?.tokenId}
                                    </div>
                                    <Tooltip text={native?.tokenId} />
                                </div>
                            </div>
                            {original_uri && !isOriginUriExist && (
                                <div className="nftInfDesc nftInfBox">
                                    <label>Original uri</label>
                                    <p>{original_uri}</p>
                                </div>
                            )}
                            {origin && (
                                <div className="nftInfDesc nftInfBox">
                                    <label>Original Chain</label>
                                    <div style={{ display: "flex" }}>
                                        <img
                                            style={{
                                                marginRight: "4px",
                                                width: "29px",
                                            }}
                                            src={origin.image?.src}
                                            alt={
                                                origin.key + "originIconDetails"
                                            }
                                        />
                                        <p>{origin.key}</p>
                                    </div>
                                </div>
                            )}
                            {/*minted && minted?.length > 0 ? false && (
                                <div className="nftInfDesc nftInfBox">
                                    <label>Minted With</label>
                                    <p>{minted}</p>
                                </div>
                            ) : minted && minted.length < 1 ? (
                                <div className="nftInfDesc nftInfBox">
                                    <label>Minted With</label>
                                    <p>WNFT</p>
                                </div>
                            ) : (
                                <></>
                            )*/}
                            {native?.name && (
                                <div className="nftInfDesc nftInfBox">
                                    <label>Collection Name</label>
                                    <p>
                                        {nftInf.collectionName || native?.name}
                                    </p>
                                </div>
                            )}
                            <div className="nftInfDesc nftInfBox">
                                <label>Collection Identifier</label>
                                <div className="coll-ident">
                                    <p>
                                        {nftInf.collectionIdent?.length > 30
                                            ? StringShortener(
                                                  nftInf.collectionIdent,
                                                  10
                                              )
                                            : nftInf.collectionIdent}
                                    </p>
                                    <Tooltip text={nftInf.collectionIdent} />
                                </div>
                            </div>
                            {symbol && (
                                <div className="nftInfDesc nftInfBox">
                                    <label>Symbol</label>
                                    <p>{symbol}</p>
                                </div>
                            )}
                            {description && (
                                <div className="nftInfDesc nftInfBox">
                                    <label>Description</label>
                                    <p>{description}</p>
                                </div>
                            )}

                            {attrs &&
                                Array.isArray(attrs) &&
                                attrs
                                    .filter(
                                        (n) =>
                                            typeof n.value === "string" ||
                                            typeof n.value === "number"
                                    )
                                    .map((n, i) => (
                                        <Attribute
                                            {...n}
                                            key={`attribute-${i}`}
                                            contract={native?.contract}
                                        />
                                    ))}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
NFTdetails.propTypes = {
    nftInf: PropTypes.object,
    claimables: PropTypes.bool,
    details: PropTypes.any,
};
export default NFTdetails;

function Attribute(props) {
    const { display_type, value } = props;

    const trait_type =
        props.trait_type || props.name || props.label || props.attribute;

    return (
        <div className="nftToken nftInfBox">
            <label>
                {trait_type
                    ? trait_type
                          .split("_")
                          .map(
                              (n) =>
                                  n.charAt(0).toUpperCase() +
                                  n.slice(1).toLowerCase()
                          )
                          .join(" ")
                    : "-"}
            </label>
            <p>
                {trait_type === "Original Chain" && (
                    <img
                        alt="#"
                        style={{ marginRight: "4px", width: "29px" }}
                        src={
                            chains.find(
                                (chain) =>
                                    chain.key.toLowerCase() ===
                                    value.toLowerCase()
                            )?.image.src
                        }
                    />
                )}
                {display_type === "date"
                    ? moment(new Date(value * 1000)).format("MM-DD-YYYY")
                    : display_type === "boolean"
                    ? value === true
                        ? "True"
                        : "False"
                    : value}
            </p>
        </div>
    );
}
Attribute.propTypes = {
    trait_type: PropTypes.any,
    name: PropTypes.any,
    label: PropTypes.any,
    attribute: PropTypes.any,
    display_type: PropTypes.any,
    value: PropTypes.any,
};
