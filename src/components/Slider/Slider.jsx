import "./Slider.css"
// import image from '../../assets/img/slider/s3.png';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { setStep } from "../../store/reducers/sliderSlice";


export default function Slider() {
  const dispatch = useDispatch()
  const nfts = useSelector(state => state.slider.nfts)
  const step = useSelector(state => state.slider.step)
  const [one, setOne] = useState(false)
  const [two, setTwo] = useState(false)
  const [three, setThree] = useState(false)

  const bgStyle = {
    backgroundImage: `url(${nfts[step].image})`,
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    transition: "2s",
    transitionTimingFunction: "ease-in-out"
  }

  useEffect(() => {
    switch (step) {
        case 0:
          setTwo(false)
          setThree(false)
          setOne(true)
            break;
        case 1:
        setTwo(true)
            break;
        case 2:
        setThree(true)
        setOne(false)
        setTwo(false)
            break;
        default:
            break;
    }
}, [step])

  const clickHandler = (index, setCount) => {
    setCount(0)
    dispatch(setStep(index))
  }

  return (
    <div style={bgStyle} className="slider__wrapper">
      <div className="slider__pagination">
        <Pagination start={one} click={clickHandler} index={0}></Pagination>
        <Pagination start={two} click={clickHandler} index={1}></Pagination>
        <Pagination start={three} click={clickHandler} index={2}></Pagination>
        {/* <SliderPagination start={one} />
        <SliderPagination start={two} />
        <SliderPagination start={three} /> */}
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
