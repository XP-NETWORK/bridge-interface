import React, { useEffect } from "react";
import icon from "../../assets/img/wallet/unstoppable.svg";
import { connectUnstoppable } from "./ConnectWalletHelper";
import UAuth from "@uauth/js";

export default function Unscopables() {
    const handleConnect = async () => {
        // connectUnstoppable();
    };

    const uauth = new UAuth({
        clientID: "f909d011-195c-4688-92b4-2cab4c550dcc",
        redirectUri: "http://localhost:3000",
        scope: "openid wallet",
    });

    useEffect(() => {
        window.login = async () => {
            try {
                const authorization = await uauth.loginWithPopup();
                console.log(authorization);
            } catch (error) {
                console.error(error);
            }
        };
    }, []);

    return (
        <li
            // style={getStyle()}
            onClick={handleConnect}
            className="wllListItem"
            data-wallet="Sync2"
        >
            <img src={icon} alt="#" />
            <p>Unstoppable domains</p>
        </li>
    );
}
