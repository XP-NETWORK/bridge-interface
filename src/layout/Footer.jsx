import React from 'react'
import XpNetwork from '../assets/img/foot/xp-network.svg';
import Quigon from '../assets/img/foot/Quigon.svg';
import Linkedin from '../assets/img/social/linkedin.svg';
import Redit from '../assets/img/social/redit.svg';
import Telegram from '../assets/img/social/telegram.svg';
import Twitter from '../assets/img/social/twitter.svg';

function Footer() {
    return (
        <footer id="footer">
            <div className="footContainer">
                <div className="footLeft">
                    <ul className="socialLInks">
                        <li><a href="https://www.linkedin.com/company/quigon/mycompany" target="_blank" className="socliLink"><img src={Linkedin} alt="" /></a></li>
                        <li><a href="https://t.me/QuigonNetwork" target="_blank" className="socliLink"><img src={Telegram} alt="" /></a></li>
                        <li><a href="https://twitter.com/QuigonCOM" target="_blank" className="socliLink"><img src={Twitter} alt="" /></a></li>
                        <li><a href="https://www.reddit.com/r/XP_network/" target="_blank" className="socliLink"><img src={Redit} alt="" /></a></li>
                    </ul>
                </div>
                <div className="footRight">
                    <div className="powerBy">
                        <a href="https://xp.network/" target="_blank" rel="noreferrer" className="PowerLink">
                            Powered by
                            <img src={Quigon} alt="Powered by" />
                        </a>
                    </div>
                    {/* <div className="priPoli">
                        <a href="https://xp.network/privacy-policy/" target="_blank" className="pripolink">Privacy Policy</a>
                    </div> */}
                </div>
            </div>
        </footer>
    )
}

export default Footer
