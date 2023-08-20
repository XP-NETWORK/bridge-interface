import React, { useEffect, useState } from "react";

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
const sitekey = "6LdHILQnAAAAAM45eajMO7KGpIjtmCaZdDFgQgrr";
const BACKEND_URL = "https://xpnetwork-staging.herokuapp.com";

export const JoinSection = () => {
    const [renderButton, setRenderButton] = useState(true);
    const [captcha, setCaptcha] = useState(false);
    const [success, setSuccess] = useState(false);
    const [validFail, setValid] = useState(false);
    const [email, setEmail] = useState("");

    const onSubscribe = async (email) => {
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            console.log("failed validation");
            setValid(true);
            return;
        }

        setRenderButton(false);
        setCaptcha(true);
        setValid(false);
        window.grecaptcha.render("captcha3", {
            sitekey: sitekey,
            callback: async (token) => {
                token;
                const res = await fetch(`${BACKEND_URL}/subscriber`, {
                    method: "POST",
                    headers: {
                        Accept: "*",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        token,
                    }),
                });

                setCaptcha(false);
                if ((await res.json()).ok) {
                    setSuccess(true);
                }
            },
        });
    };

    useEffect(() => {
        console.log(window.grecaptcha);
    }, []);

    return (
        <>
            <section className="join-section-container">
                <img src={XpLogo} alt={XpLogo} />
                <div className="join-section-left-side">
                    <span>
                        Subscribe to stay updated on our <br /> giveaways and
                        news
                    </span>
                    <div
                        className={`alexdiv ${validFail ? "failed_valid" : ""}`}
                    >
                        <input
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {success && (
                            <button className="success-button">
                                Subscribed!
                            </button>
                        )}
                        {renderButton && (
                            <button onClick={() => onSubscribe(email)}>
                                Subscribe
                            </button>
                        )}
                        <div
                            style={{
                                display: !captcha ? "none" : "initial",
                            }}
                            className="captcha-container"
                            id="captcha3"
                        ></div>
                    </div>
                </div>

                <div className="join-section-right-side">
                    <span>Join our global community</span>
                    <ul>
                        {links.map((k) => {
                            return (
                                <li key={k.name}>
                                    <a
                                        href={k.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
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
