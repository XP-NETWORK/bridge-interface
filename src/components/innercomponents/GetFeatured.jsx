import React from "react";
import { Modal } from "react-bootstrap";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { useDispatch, useSelector } from "react-redux";
import "./GetFeatured.css";
import { setGetFeaturedModal } from "../../store/reducers/generalSlice";
import twitter from "../../assets/img/icons/twitter.svg";
import instagram from "../../assets/img/icons/instagram.svg";

export default function GetFeatured() {
  const dispatch = useDispatch();
  const featuredModal = useSelector((state) => state.general.featuredModal);

  const handleClose = () => {
    dispatch(setGetFeaturedModal(false));
  };

  const off = { pointerEvents: "none" };

  return (
    <Modal
      className="get-featured-modal"
      animation={false}
      show={featuredModal}
      onHide={handleClose}
    >
      <Modal.Header className="border-0">
        <span className="close-ts-modal" onClick={handleClose}>
          <Close className="svgWidget" />
        </span>
        <Modal.Title className="get-featured__title">
          Get your NFT featured
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="border-1 ger-featured__body">
        <ol className="get-featured-action-list">
          <li>Follow @xpnetwork_ in Twitter and Instagram</li>
          <li>
            Tweet or make an Insta post with a link to your NFT and tag
            @xpnetwork_
          </li>
        </ol>
        <div className="">
          We’ll review all the posts that tagged us and feature the best NFTs.{" "}
        </div>
        <div className="follow-us">
          <div className="follow-us__title">Follow us</div>
          <div className="follow-us__buttons">
            <a
              href="https://twitter.com/xpnetwork_"
              target="_blank"
              className="follow-us__btn"
            >
              Twitter
              <img src={twitter} alt="" />
            </a>
            <a
              className="follow-us__btn"
              href="https://www.instagram.com/xp_network/"
              target="_blank"
            >
              Instagram
              <img src={instagram} alt="" />
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
