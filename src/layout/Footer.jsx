import React from 'react'
import powered from "../assets/img/icons/poweredByXp.svg"
import Linkedin from '../assets/img/footer/linkedin.svg';
import Reddit from '../assets/img/footer/redit.svg';
import Telegram from '../assets/img/footer/telegram.svg';
import Twitter from '../assets/img/footer/twitter.svg';
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
                    <a href="#">Terms</a>
                    <a href="#">Privacy Policy</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
