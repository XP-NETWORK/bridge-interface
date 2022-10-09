import React from "react";
import "./PageNotFound.css";
import image from "../assets/img/404.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PageNotFound() {
    const testnet = useSelector((state) => state.general.testNet);
    return (
        <div className="page-nt-found">
            <div className="page-nt-found__img">
                <img src={image} alt="" />
            </div>
            <div className="page-nt-found__header">Oops!</div>
            <div className="page-nt-found__txt">It’s just a 404 error.</div>
            <div className="page-nt-found__txt">
                The page you are looking for is not available.
            </div>
            <Link
                to={testnet ? "/testnet" : "/"}
                className="page-nt-found__back-btn"
            >
                Home
            </Link>
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
