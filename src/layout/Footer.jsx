import React from "react";
//import Linkedin from '../assets/img/footer/linkedin.svg';
import { ReactComponent as Reddit } from "../assets/img/footer/redit.svg";
import { ReactComponent as Telegram } from "../assets/img/footer/telegram.svg";
import { ReactComponent as Twitter } from "../assets/img/footer/twitter.svg";
import xpsince from "../assets/img/XP-NETWORK.svg";

import { ReactComponent as Linkedin } from "../assets/img/footer/linkedin.svg";

import "./Footer.css";

function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer id="footer">
            <div className="footContainer">
                <div className="footLeft">
                    <ul className="socialLInks">
                        <li className="socliLink">
                            <a
                                rel="noreferrer"
                                href="https://www.linkedin.com/company/xpnetwork/mycompany/"
                                target="_blank"
                            >
                                <Linkedin
                                    className="svgWidget"
                                    alt="linkedin"
                                />
                            </a>
                        </li>
                        <li className="socliLink">
                            <a
                                rel="noreferrer"
                                href="https://t.me/xp_network"
                                target="_blank"
                            >
                                <Telegram
                                    className="svgWidget"
                                    alt="telegram"
                                />
                            </a>
                        </li>
                        <li className="socliLink">
                            <a
                                href="https://twitter.com/xpnetwork_"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Twitter className="svgWidget" alt="twitter" />
                            </a>
                        </li>
                        <li className="socliLink">
                            <a
                                href="https://www.reddit.com/user/XP_network/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Reddit className="svgWidget" alt="reddit" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footRight">
                    <div className="xp-since__container">
                        <div>
                            <img
                                style={{ marginBottom: "2px" }}
                                src={xpsince}
                            />
                        </div>
                        <div> &copy; {year}</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
