import "./Slider.css";
import { useSelector } from "react-redux";
import SliderPagination from "./SliderPagination";
import React, { useState, useEffect } from "react";

export default function Slider() {
    const nfts = useSelector((state) => state.slider.nfts);
    const [current, setCurrrent] = useState(0);

    const [bgStyle, setStyle] = useState({});

    useEffect(() => {
        (async () => {
            for (const nft of nfts) {
                await new Promise((r) => {
                    const image = new Image();
                    image.src = nft.image;
                    image.onload = () => r(true);
                    image.onerror = () => r(true);
                });
            }
        })();
    }, []);

    useEffect(() => {
        setStyle({
            backgroundImage: `url(${nfts[current].image})`,
            backgroundPosition: "top",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            transition: "1.5s",
            transitionTimingFunction: "ease-in-out",
            borderRadius: "30px",
        });
    }, [current]);

    return (
        <div style={bgStyle} className="slider__wrapper">
            <div className="pagination__wrapper">
                <div className="slider__pagination">
                    {nfts.map((_, index) => (
                        <SliderPagination
                            index={index}
                            current={current}
                            setCurrent={(current) => {
                                setCurrrent(
                                    current >= nfts.length ? 0 : current
                                );
                            }}
                            key={`pagination_${index}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
