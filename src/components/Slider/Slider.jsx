import "./Slider.css"
// import image from '../../assets/img/slider/s3.png';
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";

export default function Slider() {
  const nfts = useSelector(state => state.slider.nfts)
  const step = useSelector(state => state.slider.step)
  const [one, setOne] = useState(false)
  const [oneFinished, setOneFinished] = useState(false)
  const [two, setTwo] = useState(false)
  const [twoFinished, setTwoFinished] = useState(false)
  const [three, setThree] = useState(false)
  const [threeFinished, setThreeFinished] = useState(false)

  const bgStyle = {
    backgroundImage: `url(${nfts[step].image})`,
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    transition: "2s",
  }

  // const bgStyle = {left: 0}

  useEffect(() => {
    switch (step) {
        case 0:
        setOne(true)
            break;
        case 1:
        setTwo(true)
            break;
        case 2:
        setThree(true)
            break;
        default:
            break;
    }
}, [step])

  return (
    <div style={bgStyle} className="slider__wrapper">
      <div className="slider__pagination">
        <Pagination start={one}></Pagination>
        <Pagination start={two}></Pagination>
        <Pagination start={three}></Pagination>
      </div>
      <div className="slider-nft__info">
        <div className="slider-nft__name">
          {nfts[step]?.name}
          <span className="slider-nft__id">#{nfts[step]?.id}</span>
        </div>
        <div className="slider-nft__description">{nfts[step]?.description}</div>
      </div>
    </div>
  )
}
