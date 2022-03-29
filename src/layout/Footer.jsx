import React from 'react'
import powered from "../assets/img/icons/poweredByXp.svg"
import Linkedin from '../assets/img/footer/linkedin.svg';
import Reddit from '../assets/img/footer/redit.svg';
import Telegram from '../assets/img/footer/telegram.svg';
import Twitter from '../assets/img/footer/twitter.svg';
import xpsince from "../assets/img/xpsince.svg"
import "./Footer.css"

function Footer() {
    return (
        <footer id="footer">
            <div className="footContainer">
                <div className="footLeft">
                    <ul className="socialLInks">
                        <li className="socliLink">
                            <a rel="noreferrer" href="https://www.linkedin.com/company/xpnetwork/mycompany/" target="_blank" >
                                <div className="linkedin"></div>
                            </a>
                        </li>
                        <li className="socliLink">
                            <a rel="noreferrer" href="https://t.me/xp_network" target="_blank" >
                                <div className="telegram"></div>
                            </a>
                        </li>
                        <li className="socliLink">
                            <a href="https://twitter.com/xpnetwork_" target="_blank" rel="noreferrer">
                                <div className="twitter"></div>
                            </a>
                        </li>
                        <li className="socliLink">
                            <a href="https://www.reddit.com/user/XP_network/" target="_blank" rel="noreferrer">
                                <div className="reddit"></div>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footRight">
                    <img src={xpsince} />
                </div>
            </div>
        </footer>
    )
}

export default Footer
