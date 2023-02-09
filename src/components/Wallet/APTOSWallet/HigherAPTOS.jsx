import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    setAccount,
    setConnectedWallet,
    setWalletsModal,
} from "../../../store/reducers/generalSlice";
// import { setSigner } from "../../../store/reducers/signersSlice";
import { getRightPath } from "../../../wallet/helpers";
import { connectMartian, connectPetra, connectPontem } from "./AptosConnectors";
import { withServices } from "../../App/hocs/withServices";
import { Chain } from "xp.network";
import { HexString, AptosClient, TokenClient } from "aptos";

export default function HigherAPTOS(OriginalComponent) {
    const updatedComponent = withServices((props) => {
        const { serviceContainer, close } = props;
        const { bridge } = serviceContainer;
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const { from, testNet, to } = useSelector((state) => state.general);

        const navigateToAccountRoute = () => {
            if (from && to) navigate(getRightPath());
        };

        const getStyles = () => {
            let styles = {};
            if (!testNet) return { display: "none" };
            else if (from && from.type !== "APTOS") {
                styles = {
                    pointerEvents: "none",
                    opacity: "0.6",
                };
            }
            return styles;
        };

        const connectWallet = async (wallet) => {
            // eslint-disable-next-line no-debugger
            debugger;
            let connected;
            // let signer;

            switch (wallet) {
                case "Martian":
                    connected = await connectMartian();
                    dispatch(setWalletsModal(false));
                    dispatch(setConnectedWallet("Martian"));
                    // signer = connected;
                    break;
                case "Petra":
                    connected = await connectPetra();
                    dispatch(setWalletsModal(false));
                    dispatch(setConnectedWallet("Petra"));
                    // signer = connected;
                    break;
                case "Pontem":
                    connected = await connectPontem();
                    dispatch(setWalletsModal(false));
                    dispatch(setConnectedWallet("Pontem"));
                    // signer = connected;
                    break;
                default:
                    break;
            }
            const chainWrapper = await bridge.getChain(Chain.APTOS);

            const _signer = await window.petra.account();
            _signer.address = function() {
                return HexString.ensure(connected.address);
            };
            const client = new AptosClient(
                "https://fullnode.devnet.aptoslabs.com"
            );
            const tokenClient = new TokenClient(client);
            const options = {
                name: "Name",
                collection: "XPNFT",
                description: "description",
                uri:
                    "https://assets.polkamon.com/images/Unimons_T06C02H10B04G00.jpg'",
                royalty_payee_address: connected.address,
            };
            const resp = await tokenClient.createToken(connected, options);
            console.log(
                "🚀 ~ file: HigherAPTOS.jsx:86 ~ connectWal ~ resp",
                resp
            );
            const acc = await client.getAccount(connected.address);

            const hexAcc = HexString.ensure(connected.address);
            console.log(
                "🚀 ~ file: HigherAPTOS.jsx:77 ~ connectWal ~ hexAcc",
                hexAcc
            );
            acc.address = function() {
                return HexString.ensure(connected.address);
            };
            console.log({ acc });
            chainWrapper.setSigner(acc);
            bridge.setCurrentType(chainWrapper);
            dispatch(setAccount(connected.address));
            dispatch(setWalletsModal(false));
            close();
            4;
            navigateToAccountRoute();
        };

        return (
            <OriginalComponent
                styles={getStyles}
                connectWallet={connectWallet}
            />
        );
    });
    return updatedComponent;
}
