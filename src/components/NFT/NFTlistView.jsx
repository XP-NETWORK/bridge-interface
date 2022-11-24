import { useSelector, React } from "react-redux";
import NFTempty from "../innercomponents/NFTempty";

import NFTlistedCard from "./NFTlistedCard";
import { withSecretAuth } from "../Modals/ImportNFTModal/SecretAuth";

function NFTlistView() {
    const currentsNFTs = useSelector((state) => state.general.currentsNFTs);

    return (
        <div className="nftListBox nftListView">
            <ul className="nftList">
                {currentsNFTs?.length ? (
                    currentsNFTs.map((nft, index) => (
                        <NFTlistedCard
                            nft={nft}
                            index={index}
                            key={index + "listedview"}
                        />
                    ))
                ) : (
                    <NFTempty />
                )}
            </ul>
        </div>
    );
}

export default withSecretAuth(NFTlistView);
