import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import moment from "moment";
import brockenurl from "../../assets/img/brockenurl.png";
import ModalImage from "react-modal-image";
import zoomIn from "../../assets/img/icons/zoomInWhite.png";

import { ReactComponent as CloseComp } from "../../assets/img/icons/close.svg";

import { ReactComponent as INFComp } from "../../assets/img/icons/Inf.svg";
import { setupURI } from "../../wallet/helpers";
import { getFactory, isValidHttpUrl } from "../../wallet/helpers";
import { chainsConfig, CHAIN_INFO } from "../values";
import { getUrl } from "./NFTHelper";
import VideoOrImage from "./VideoOrImage";
import { useSelector } from "react-redux";

function NFTdetails({ nftInf, claimables, details }) {
    const widget = new URLSearchParams(window.location.search).get("widget");
    const {
        name,
        description,
        attributes,
        uri,
        native,
        wrapped,
        image,
        animation_url,
    } = nftInf;

    const isOriginUriExist =
        Array.isArray(attributes) &&
        attributes?.some((e) => {
            const values = Object.values(e);
            return values?.some((v) => v === "Original URI");
        });
    const isOriginChainExist =
        Array.isArray(attributes) &&
        attributes?.some((e) => {
            const values = Object.values(e);
            return values?.some((v) => v === "Original Chain");
        });

    const original_uri = wrapped && wrapped.original_uri;
    const origin =
        wrapped &&
        Object.keys(CHAIN_INFO).find(
            (e) => CHAIN_INFO[e].nonce.toString() === wrapped.origin
        );

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
    const toKey = useSelector((state) => state.general.to.key);
    const fromKey = useSelector((state) => state.general.from.key);
    const [minted, setMinted] = useState();

    const getMintedWith = async () => {
        let mintWidth;
        const toNonce = CHAIN_INFO[toKey].nonce;
        const fromNonce = CHAIN_INFO[fromKey].nonce;
        const contract = native?.contract?.toLowerCase();
        const factory = await getFactory();
        try {
            mintWidth = await factory.getVerifiedContract(
                contract,
                toNonce,
                fromNonce
            );
        } catch (error) {
            console.log(error);
        }
        if (mintWidth) {
            setMinted(mintWidth);
        }
    };

    useEffect(() => {
        if (!claimables) {
            //getMintedWith();
        }
    }, []);

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
                                large={setupURI(image)}
                                hideDownload={true}
                                hideZoom={true}
                            />

                            {(image || animation_url) &&
                            (uri || image) &&
                            isValidHttpUrl(uri || image) ? (
                                animation_url ? (
                                    <video
                                        controls={false}
                                        playsInline={true}
                                        autoPlay={true}
                                        loop={true}
                                        src={setupURI(animation_url)}
                                    />
                                ) : (
                                    <img alt="NFTss" src={setupURI(image)} />
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
                                <p>{name}</p>
                            </div>
                            <div className="nftToken nftInfBox">
                                <label>Token ID</label>
                                <p>{native.tokenId}</p>
                            </div>
                            {original_uri && !isOriginUriExist && (
                                <div className="nftInfDesc nftInfBox">
                                    <label>Original uri</label>
                                    <p>{original_uri}</p>
                                </div>
                            )}
                            {origin && !isOriginChainExist && (
                                <div className="nftInfDesc nftInfBox">
                                    <label>Original Chain</label>
                                    <div style={{ display: "flex" }}>
                                        <img
                                            style={{
                                                marginRight: "4px",
                                                width: "29px",
                                            }}
                                            src={chainsConfig[origin]?.img}
                                            alt={origin}
                                        />
                                        <p>{origin}</p>
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
                            {native.name && (
                                <div className="nftInfDesc nftInfBox">
                                    <label>Collection Name</label>
                                    <p>
                                        {nftInf.collectionName || native.name}
                                    </p>
                                </div>
                            )}
                            <div className="nftInfDesc nftInfBox">
                                <label>Symbol</label>
                                <p>{nftInf.symbol || native.symbol}</p>
                            </div>
                            {description && (
                                <div className="nftInfDesc nftInfBox">
                                    <label>Description</label>
                                    <p>{description}</p>
                                </div>
                            )}
                            {attributes &&
                                Array.isArray(attributes) &&
                                attributes
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

export default NFTdetails;

function Attribute(props) {
    const { display_type, value } = props;
    const trait_type = props.trait_type || props.name || props.label;
    if (trait_type === "Original Chain") {
    }
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
                            chainsConfig[value]?.img ||
                            chainsConfig[
                                Object.keys(chainsConfig)?.find((key) =>
                                    chainsConfig[key]?.variants?.includes(value)
                                )
                            ]?.img
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
