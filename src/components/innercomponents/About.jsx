import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { setShowAbout } from "../../store/reducers/generalSlice";

export default function About() {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.general.about);

  function handleClose() {
    dispatch(setShowAbout(false));
  }

  return (
    <Modal className="about-nft__modal" show={show} animation={false} onHide={() => handleClose()}>
      <Modal.Header className="border-0">
        <div className="tron-PopUp__header">
          <Modal.Title>What is NFT?</Modal.Title>
          <span className="CloseModal" onClick={() => handleClose()}>
            <Close className="svgWidget" />
          </span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="about__text">
          <p>
            NFT stands for Non-Fungible Tokens representing unique or scarce,
            physical or digital assets and collectibles.
          </p>
          <p>
            NFTs emerged as a digital representation of ownership for art,
            music, domain names, virtual worlds, trading cards, stamps,
            admission tickets, university diplomas, professional licenses and
            permits, insurance contracts, and much more.
          </p>
          <p>
            NFTs are gradually becoming the key component of the digital
            economies used as assets for trading or investment. The price of an
            NFT gets higher if art connoisseurs or collectors recognize the
            artistic, historical, or gaming ecosystem value in the asset it
            represents.
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}
