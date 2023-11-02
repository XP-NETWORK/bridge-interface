import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    setChainSearch,
    setSelectedChain,
    toggleChainSelect,
} from "../../store/reducers/generalSlice";
import ChainSearch from "./ChainSearch";
import { chains as defaultChains } from "../values";
import Chain from "./Chain";

const PlainChainListBox = () => {
    const dispatch = useDispatch();
    const [chains, setChains] = useState(defaultChains);
    const { showChainSelect, chainSearch } = useSelector(({ general }) => ({
        showChainSelect: general.showChainSelect,
        chainSearch: general.chainSearch,
    }));

    useEffect(() => {
        if (showChainSelect) {
            dispatch(setSelectedChain(undefined));
            dispatch(setChainSearch(""));
        }
    }, [showChainSelect]);

    useEffect(() => {
        !chainSearch
            ? setChains(defaultChains)
            : setChains(
                  defaultChains.filter(
                      (c) =>
                          c.text
                              ?.toLowerCase()
                              .match(chainSearch.toLowerCase()) ||
                          c.key
                              ?.toLowerCase()
                              .includes(chainSearch.toLowerCase()) ||
                          c.value
                              ?.toLowerCase()
                              .includes(chainSearch.toLowerCase())
                  )
              );
    }, [chainSearch]);

    return (
        <Modal
            animation={false}
            show={showChainSelect}
            onHide={() => dispatch(toggleChainSelect(false))}
            className="ChainModal"
        >
            <Modal.Header className="text-left">
                <Modal.Title>{`Specify the departure chain`}</Modal.Title>
                <span
                    className="CloseModal"
                    onClick={() => dispatch(toggleChainSelect(false))}
                >
                    <div className="close-modal"></div>
                </span>
            </Modal.Header>
            <Modal.Body>
                <div className="nftChainListBox">
                    <ChainSearch />
                    <ul className="nftChainList scrollSty">
                        {chains
                            .filter((c) => c.mainnet || c.testNet)
                            .map((chain) => {
                                const {
                                    image,
                                    text,
                                    key,
                                    coming,
                                    newChain,
                                    maintenance,

                                    updated,
                                    nonce,
                                } = chain;

                                return (
                                    <Chain
                                        chainSelectHandler={(e) =>
                                            dispatch(setSelectedChain(e.nonce))
                                        }
                                        updated={updated}
                                        newChain={newChain}
                                        maintenance={maintenance}
                                        coming={coming}
                                        text={text}
                                        chainKey={key}
                                        filteredChain={chain}
                                        image={image}
                                        key={`chain-plainlist-${key}`}
                                        nonce={nonce}
                                    />
                                );
                            })}
                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default PlainChainListBox;
