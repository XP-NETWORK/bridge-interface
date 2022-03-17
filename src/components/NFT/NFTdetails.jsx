import { useState } from "react";
import { Modal} from "react-bootstrap";
import moment from "moment";
import brockenurl from "../../assets/img/brockenurl.png";
import Close from "../../assets/img/icons/close.svg";
import { ReactComponent as CloseComp } from "../../assets/img/icons/close.svg";
import INF from "../../assets/img/icons/Inf.svg";
import { ReactComponent as INFComp } from "../../assets/img/icons/Inf.svg";
import { setupURI } from "../../wallet/oldHelper";
import { isValidHttpUrl } from "../../wallet/helpers";
import { chainsConfig } from "../values";
import { getUrl } from "./NFTHelper";
import VideoOrImage from "./VideoOrImage";

function NFTdetails({ nftInf }) {
  const widget = new URLSearchParams(window.location.search).get("widget");
  const {
    name,
    description,
    attributes,
    uri,
    native,
  } = nftInf;
  // const { video, url, ipfsArr } = getUrl(nftInf);
  const { video, videoUrl, image, imageUrl, ipfsArr } = getUrl(nftInf);



  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [tryVideo, setTryVideo] = useState();

  

  return (
    <>
      <div className="info-icon__container">
        <span className="NFTInf" onClick={handleShow}>
          {widget ? <INFComp className="svgWidget" /> : <img src={INF} />}
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
          <span className="CloseModal" onClick={handleClose}>
            {widget ? (
              <CloseComp className="svgWidget" />
            ) : (
              <img src={Close} alt="" />
            )}
          </span>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <div className="nftDetailBox">
            <div className="nftDetImg">
              {(imageUrl || videoUrl )&& uri && isValidHttpUrl(uri) ? (
                video && videoUrl ? (
                  <video
                    onLoadedData={() => setImageLoaded(true)}
                    controls={false}
                    playsInline={true}
                    autoPlay={true}
                    loop={true}
                    src={setupURI(videoUrl)}
                  />
                ) : (
                  <img
                    onLoad={() => setImageLoaded(true)}
                    alt="NFTss"
                    src={setupURI(imageUrl)}
                  />
                )
              ) : ipfsArr.length ? (
                <VideoOrImage urls={ipfsArr} />
              ) : (
                <div className="brocken-url">
                  <img
                    onLoad={() => setImageLoaded(true)}
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
          {  nftInf.collectionIdent &&  <div className="nftToken nftInfBox">
                <label>Collection ID</label>
                <p>{nftInf.collectionIdent}</p>
              </div>}
              <div className="nftInfDesc nftInfBox">
                <label>Description</label>
                <p>{description}</p>
              </div>
              {attributes &&
                Array.isArray(attributes) &&
                attributes
                  .filter(
                    (n) =>
                      typeof n.value === "string" || typeof n.value === "number"
                  )
                  .map((n, i) => <Attribute {...n} key={`attribute-${i}`} />)}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NFTdetails;

function Attribute(props) {
  const { trait_type, display_type, value } = props;
  console.log("Attribute: ", chainsConfig[value])
  return (
    <div className="nftToken nftInfBox">
      <label>
        {trait_type
          ? trait_type
              .split("_")
              .map((n) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase())
              .join(" ")
          : "-"}
      </label>
      <p>
        {trait_type === "Original Chain" ? (
          <img alt="#"
            style={{ marginRight: "4px", width: "29px" }}
            src={chainsConfig[value]?.img}
          />
        ) : (
          ""
        )}{" "}
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
