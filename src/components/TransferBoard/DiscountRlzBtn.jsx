import BigNumber from "bignumber.js";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import diamon from "../../assets/img/icons/bluediamond.svg";
import { setDiscountOn } from "../../store/reducers/discountSlice";
import { useDidUpdateEffect } from "../Settings/hooks";
import Fee from "./Fee";

export default function DiscountRlzBtn({ fees }) {
    const dispatch = useDispatch();
    const useDiscount = useSelector((state) => state.discount.useDiscount);
    const [total, setTotal] = useState();
    console.log(
        "🚀 ~ file: DiscountRlzBtn.jsx ~ line 13 ~ DiscountRlzBtn ~ total",
        total
    );

    const selectedNFTList = useSelector(
        (state) => state.general.selectedNFTList
    );

    useDidUpdateEffect(() => {
        // debugger;
        let total = 0;
        let temp = Number(new BigNumber(fees));
        if (selectedNFTList.length > 0) {
            selectedNFTList.forEach(() => {
                total += temp * 0.25;
            });
        }
        setTotal(total);
    }, [selectedNFTList]);

    const handleClick = () => {
        dispatch(setDiscountOn(true));
    };
    return !useDiscount ? (
        <div onClick={handleClick} className="checkout__discount__btns">
            <img src={diamon} alt="icon" />
            <span>Use your XPNET discount</span>
            <span>40%</span>
        </div>
    ) : (
        <>
            <div className="checkout__discount checkout-row">
                <span>Discount</span>
                <span>40%</span>
            </div>
            <div className="checkout__total checkout-row">
                <span>Total</span>
                <Fee
                    fees={
                        Number(new BigNumber(fees) * selectedNFTList.length) -
                        total
                    }
                />
            </div>
        </>
    );
}
