import React from 'react'
import powered from "../assets/img/icons/poweredByXp.svg"
import Linkedin from '../assets/img/social/linkedin.svg';
import Reddit from '../assets/img/social/redit.svg';
import Telegram from '../assets/img/social/telegram.svg';
import Twitter from '../assets/img/social/twitter.svg';
import "./Footer.css"

function Footer() {
    return (
        <footer id="footer">
            <div className="footContainer">
                <div className="footLeft">
                    <ul className="socialLInks">
                        <li><a href="https://www.linkedin.com/company/xp-network/" target="_blank" className="socliLink"><img src={Linkedin} alt="" /></a></li>
                        <li><a href="https://t.me/xp_network" target="_blank" className="socliLink"><img src={Telegram} alt="" /></a></li>
                        <li><a href="https://twitter.com/xpnetwork_" target="_blank" className="socliLink"><img src={Twitter} alt="" /></a></li>
                        <li><a href="https://www.reddit.com/user/XP_network/" target="_blank" className="socliLink"><img src={Reddit} alt="" /></a></li>
                    </ul>
                </div>
                <div className="footRight">
                    <div className="powerBy">
                        <a href="https://xp.network/" target="_blank" rel="noreferrer" className="PowerLink">
                            <img style={{height: "40px"}} src={powered} alt="Powered by" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
