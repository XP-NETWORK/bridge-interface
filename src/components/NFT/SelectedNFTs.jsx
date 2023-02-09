import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { cleanSelectedNFTList } from "../../store/reducers/generalSlice";
import { useDispatch } from "react-redux";
import Selected from "./Selected";

function SelectedNFTs() {
    const dispatch = useDispatch();
    let _selectedNFTs = useSelector((state) => state.general.selectedNFTList);
    let nfts = useSelector((state) => state.general.NFTList);
    const OFF = { opacity: 0.6, pointerEvents: "none" };
    const handleClear = () => {
        dispatch(cleanSelectedNFTList());
    };

    useEffect(() => {}, [_selectedNFTs]);

    return (
        <div className="selected-nfts-list">
            <div className="selected-nfts__header">
                <span className="desktop__header">
                    Selected NFTs{" "}
                    {/* <span>
                        {_selectedNFTs.length} / {nfts?.length}
                    </span> */}
                    {nfts?.length ? (
				<>
					<span className="selected-nfts__selected">
						{_selectedNFTs?.length} / {nfts?.length}
					</span>
				</>
			) : (
				<span className="selected-nfts__selected">0 / 0</span>
			)}
                </span>
                {_selectedNFTs.length > 0 && (
                    <div
                        style={_selectedNFTs.length ? {} : OFF}
                        onClick={() => handleClear()}
                        className="clear-selected"
                    >
                        Clear all
                    </div>
                )}
            </div>
            <ul className="selected-nfts__body">
                {_selectedNFTs
                    ? _selectedNFTs.map((nft, index) => (
                          <Selected key={index} index={index} nft={nft} />
                          //   <li
                          //       key={`selected-nft-${index}`}
                          //       onClick={() => handleRemove(nft)}
                          //       className="selected-nfts-item"
                          //   >
                          //       <ListedView nft={nft} key={`nft-n-${index}`} />
                          //       <span className="nfts-item__name">
                          //           {nft.data?.name ||
                          //               nft.name ||
                          //               nft.native.name}
                          //       </span>
                          //       <span className="selected-nfts__delete">
                          //           {widget ? (
                          //               <CloseComp className="svgWidget" />
                          //           ) : (
                          //               <img alt="" src={Close} />
                          //           )}
                          //       </span>
                          //   </li>
                      ))
                    : ""}
            </ul>
        </div>
    );
}

export default SelectedNFTs;
