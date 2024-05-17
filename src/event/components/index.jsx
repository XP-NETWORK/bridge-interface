import React from "react";

import { withServices } from "../../components/App/hocs/withServices";

import { HeaderEvent } from "./header";
import { MainSection } from "./mainSection";
import { JoinSection } from "./joinSection";

import "../eventPage.css";

import { Modal } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

import successImage from "../assets/mainSection/CUSTOM xp nft (1) 1-min.png";
import close from "../../assets/img/icons/close.svg";

import { setSuccess } from "../../store/reducers/eventSlice";

import { useNavigate } from "react-router";

export const EventPage = withServices(
  ({
    serviceContainer,
    chains,
    title,
    description,
    headerClass,
    className,
  }) => {
    const { bridge } = serviceContainer;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { success } = useSelector((state) => state.events);

    return (
      <>
        <div className="event-page-wrapper">
          <Modal
            animation={false}
            show={success}
            className="error__modal event_modal_window"
          >
            <div className="event_success_modal">
              <img
                className="closeBtn"
                src={close}
                alt=""
                onClick={() => dispatch(setSuccess(false))}
              />
              <img className="successImg" src={successImage} alt="" />
              <h3>🎉 The NFT is in your wallet</h3>
              <div className="controls">
                <button className="" onClick={() => navigate("/connect")}>
                  Bridge NFT
                </button>
                <button
                  onClick={() => dispatch(setSuccess(false))}
                  className="transparent"
                >
                  Back to Mint
                </button>
              </div>
            </div>
          </Modal>
          <HeaderEvent headerClass={headerClass} />
          <MainSection
            bridge={bridge}
            chains={chains}
            title={title}
            description={description}
            className={className}
          />
          <JoinSection />
        </div>
      </>
    );
  }
);
