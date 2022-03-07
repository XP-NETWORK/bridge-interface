import "./Slider.css"
// import image from '../../assets/img/slider/s3.png';
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";

export default function Slider() {
  const nft = useSelector(state => state.slider.nft)
  const step = useSelector(state => state.slider.step)

  const bgStyle = {
    backgroundImage: `url(${nft.image})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  useEffect(() => {
    switch (step) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        default:
            break;
    }
}, [])

  return (
    <div style={bgStyle} className="slider__wrapper">
      <div className="slider__pagination">
        <Pagination></Pagination>
        <Pagination></Pagination>
        <Pagination></Pagination>
      </div>
      <div className="slider-nft__info">
        <div className="slider-nft__name">
          {nft?.name}
          <span className="slider-nft__id">#{nft?.id}</span>
        </div>
        <div className="slider-nft__description">{nft?.description}</div>
      </div>
    </div>
  )
}
