import { useSelector, React } from "react-redux";
import PropTypes from "prop-types";

export default function SelectedNFTs({ show, on }) {
    const selected = useSelector((state) => state.general.selectedNFTList);

    return (
        <div onClick={show} className="selected-nfts__button">
            <span className="selected-nfts__title">
                {!on ? "Selected" : "Back"}
            </span>
            <span className="selected-nfts__selected">{`/ ${
                selected ? selected.length : ""
            } `}</span>
        </div>
    );
}

SelectedNFTs.propTypes = {
    show: PropTypes.bool,
    on: PropTypes.bool,
};
