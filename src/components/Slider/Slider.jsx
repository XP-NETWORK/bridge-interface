import "./Slider.css"
// import image from '../../assets/img/slider/s3.png';
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";

export default function Slider() {
  const nft = useSelector(state => state.slider.nft)
  const step = useSelector(state => state.slider.step)
  console.log("🚀 ~ file: Slider.jsx ~ line 10 ~ Slider ~ step", step)
  const [one, setOne] = useState(false)
  const [oneFinished, setOneFinished] = useState(false)
  const [two, setTwo] = useState(false)
  const [twoFinished, setTwoFinished] = useState(false)
  const [three, setThree] = useState(false)
  const [threeFinished, setThreeFinished] = useState(false)

  const bgStyle = {
    backgroundImage: `url(${nft.image})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  useEffect(() => {
    switch (step) {
        case 1:
        setOne(true)
            break;
        case 2:
        setTwo(true)
            break;
        case 3:
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
          {nft?.name}
          <span className="slider-nft__id">#{nft?.id}</span>
        </div>
        <div className="slider-nft__description">{nft?.description}</div>
      </div>
    </div>
  )
}
