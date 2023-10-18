import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { withServices } from "../../App/hocs/withServices";
import { connectHashPack } from "./hederaConnections";
import { Chain } from "xp.network";
import { setAccount } from "../../../store/reducers/generalSlice";
import { ethers } from "ethers";

function HigherHEDERA(OriginalComponent) {
    function updatedComponent({ serviceContainer }) {
        const { bridge } = serviceContainer;
        const dispatch = useDispatch();
        const network = useSelector((state) => state.general.testNet);

        const getStyles = () => {};

        const connectWallet = async (wallet) => {
            switch (wallet) {
                case "HashPack":
                    await connectHashPack(network);
                    break;
                case "MM": {
                    const chainWrapper = await bridge.getChain(Chain.HEDERA);
                    const provider = window.ethereum;
                    if (!provider) return;

                    const upgradedProvider = new ethers.providers.Web3Provider(
                        provider
                    );

                    const accounts = await provider.request({
                        method: "eth_requestAccounts",
                    });

                    const signer = upgradedProvider.getSigner(accounts[0]);
                    signer.address = await signer.getAddress();
                    chainWrapper.setSigner(signer);
                    dispatch(setAccount(accounts[0]));
                    bridge.setCurrentType(chainWrapper);
                    break;
                }

                default:
                    break;
            }
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
