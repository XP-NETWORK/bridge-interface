import React from "react";
import { withServices } from "../../App/hocs/withServices";
import { connectHashPack } from "./hederaConnections";

function HigherHEDERA(OriginalComponent) {
    function updatedComponent() {
        const getStyles = () => {};

        const connectWallet = async (wallet, connector) => {
            let resp;
            switch (wallet) {
                case "HashPack":
                    resp = await connectHashPack(connector);
                    break;

                default:
                    break;
            }
            console.log({ resp });
        };

        return <OriginalComponent styles={getStyles} connect={connectWallet} />;
    }

    return withServices(updatedComponent);
}
export default HigherHEDERA;
