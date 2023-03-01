import React from "react";
import { useSelector } from "react-redux";
import { withServices } from "../../App/hocs/withServices";
import { connectHashPack } from "./hederaConnections";

function HigherHEDERA(OriginalComponent) {
    function updatedComponent({ serviceContainer }) {
        const { bridge } = serviceContainer;

        const network = useSelector((state) => state.general.testNet);

        const getStyles = () => {};

        const connectWallet = async (wallet, connector) => {
            let resp;
            switch (wallet) {
                case "HashPack":
                    resp = await connectHashPack(connector, network);
                    break;

                default:
                    break;
            }
            console.log({ resp });
        };

        return (
            <OriginalComponent
                styles={getStyles}
                connect={connectWallet}
                bridge={bridge}
            />
        );
    }

    return withServices(updatedComponent);
}
export default HigherHEDERA;
