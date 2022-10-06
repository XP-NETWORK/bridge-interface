import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import diamon from "../../assets/img/icons/bluediamond.svg";
import { setDiscountOn } from "../../store/reducers/discountSlice";
import { useDidUpdateEffect } from "../Settings/hooks";
import Fee from "./Fee";

export default function DiscountRlzBtn({ fees }) {
    const dispatch = useDispatch();
    const from = useSelector((state) => state.general.from);
    const useDiscount = useSelector((state) => state.discount.useDiscount);
    const [total, setTotal] = useState(0);

    const selectedNFTList = useSelector(
        (state) => state.general.selectedNFTList
    );

    const fee = () => {
        // debugger;
        let temp = Number(new BigNumber(fees));
        switch (true) {
            case selectedNFTList.length > 0:
                return temp * selectedNFTList.length - total;

            default:
                return temp - temp * 0.4;
        }
    };

    useEffect(() => {
        // debugger;
        let total = 0;
        let temp = Number(new BigNumber(fees));
        if (selectedNFTList.length > 0) {
            selectedNFTList.forEach(() => {
                total += temp * 0.4;
            });
        }
        setTotal(total);
    }, [selectedNFTList, fees]);

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
                <Fee fees={fee()} />
            </div>
        </>
    );
}
