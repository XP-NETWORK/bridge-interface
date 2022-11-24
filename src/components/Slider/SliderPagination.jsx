import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../store/reducers/sliderSlice";
import PropTypes from "prop-types";
// import { useLocation } from "react-router-dom";

export default function SliderPagination({ index }) {
    const length = useSelector((state) => state.slider.nfts.length);
    const dispatch = useDispatch();
    const step = useSelector((state) => state.slider.step);
    // const location = useLocation();
    const [width, setWidth] = useState(0);

    const handleClick = () => {
        if (index === step) return;
        setTimeout(() => dispatch(setStep(index)));
    };

    useEffect(() => {
        if (step === index) {
            if (width < 100) {
                setTimeout(() => setWidth(width + 0.1), 3);
            } else if (width >= 100 && step + 1 < length) {
                setWidth(0);
                setTimeout(() => dispatch(setStep(step + 1)));
            } else {
                setWidth(0);
                dispatch(setStep(0));
            }
        }
        // if (location.pathname !== "/" && location.pathname !== "/connect")
        // return () => clearTimeout(tm);
    });

    useEffect(() => {
        let tm;
        if (step === index) {
            tm = setTimeout(() => setWidth(width + 0.1));
        }
        if (step !== index) {
            tm = setTimeout(() => setWidth(0), 20);
        }

        return () => clearTimeout(tm);
    }, [step]);

    return (
        <span className="pagination__bg" onClick={handleClick}>
            <span
                style={{ width: `${width}%` }}
                className="pagination__progress"
            ></span>
        </span>
    );
}
SliderPagination.propTypes = {
    index: PropTypes.number,
};
