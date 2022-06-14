import React from "react";
import { useSelector } from "react-redux";

export default function UnwrapWegld() {
    const wrappedEGold = useSelector((state) => state.general.wrappedEGold);

    const handleClick = () => {
        console.log("click");
    };

    return wrappedEGold ? (
        <div onClick={handleClick} className="unwrapWegld">
            Unwrap eGold
        </div>
    ) : (
        ""
    );
}
