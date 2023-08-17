import React from "react";

import XpLogo from "../../assets/joinSection/xpLogo.png";

import "./joinSection.css";

const links = [
  { name: "Telegram", link: "https://t.me/xp_network" },
  { name: "Twitter", link: "https://twitter.com/xpnetwork_" },
  { name: "Reddit", link: "https://www.reddit.com/r/XP_network/" },
  { name: "Discord", link: "https://discord.com/invite/g3vkcsmd38" },
  { name: "BitClout", link: "https://bitclout.com/u/XPnetwork" },
  { name: "Youtube", link: "https://www.youtube.com/@xpnetwork_" },
  { name: "Instagram", link: "https://www.instagram.com/xp_network/" },
];

export const JoinSection = () => {
  return (
    <>
      <section className="join-section-container">
        <img src={XpLogo} alt={XpLogo} />
        <div className="join-section-left-side">
          <span>
            Subscribe to stay updated on our <br /> giveaways and news
          </span>
          <div>
            <input placeholder="Email" />
            <button>Subscribe</button>
          </div>
        </div>

        <div className="join-section-right-side">
          <span>Join our global community</span>
          <ul>
            {links.map((k) => {
              return (
                <li key={k.name}>
                  <a href={k.link} target="_blank" rel="noopener noreferrer">
                    {k.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
