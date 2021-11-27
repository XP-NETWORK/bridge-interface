import React from 'react'
import XpNetwork from '../assets/img/foot/xp-network.svg';

// Social
import Linkedin from '../assets/img/social/linkedin.svg';
import Redit from '../assets/img/social/redit.svg';
import Telegram from '../assets/img/social/telegram.svg';
import Twitter from '../assets/img/social/twitter.svg';

function Footer() {
    return (
        <footer>
            <div className="footContainer">
                <div className="footLeft">
                    <ul className="socialLInks">
                        <li><a href="#" target="_blank" className="socliLink"><img src={Linkedin} alt="" /></a></li>
                        <li><a href="#" target="_blank" className="socliLink"><img src={Telegram} alt="" /></a></li>
                        <li><a href="#" target="_blank" className="socliLink"><img src={Twitter} alt="" /></a></li>
                        <li><a href="#" target="_blank" className="socliLink"><img src={Redit} alt="" /></a></li>
                    </ul>
                </div>
                <div className="footRight">
                    <div className="powerBy">
                        <a href="" className="PowerLink">
                            Powered by
                            <img src={XpNetwork} alt="Powered by" />
                        </a>
                    </div>
                    <div className="priPoli">
                        <a href="#" className="pripolink">Terms</a>
                        <a href="#" className="pripolink">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
