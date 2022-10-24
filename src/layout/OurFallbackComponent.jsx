import React from "react";
import image from "../assets/img/404.png";
import "./FallbackComponent.css";

export default function OurFallbackComponent() {
    return (
        <div className="fall-back__component">
            <div className="page-nt-found__img">
                <img src={image} alt="" />
            </div>
            <div className="page-nt-found__header">Oops!</div>
            <div className="page-nt-found__txt">Something went wrong.</div>
            {/* <div className="page-nt-found__txt">
                The page you are looking for is not available.
            </div> */}
            <div
                onClick={() => window.location.reload()}
                className="page-nt-found__back-btn"
            >
                Home
            </div>
            <div className="page-nt-found__help-btn">
                <a
                    target="_blanc"
                    href="https://t.me/XP_NETWORK_Bridge_Support_Bot?start=startwithxpbot"
                >
                    Contact help center -&gt;
                </a>
            </div>
        </div>
    );
}
