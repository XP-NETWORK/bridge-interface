import "./Slider.css"
import { useSelector } from "react-redux";
import SliderPagination from "./SliderPagination"
import React from 'react'

export default function Slider() {
  const nfts = useSelector(state => state.slider.nfts)
  const step = useSelector(state => state.slider.step)
  const x = useSelector(state => state.slider.position)
  const [bgStyle, setStyle] = React.useState({})


React.useEffect(() => {
  setStyle({
    backgroundImage: `url(${nfts[step].image})`,
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    transition: "2s",
    transitionTimingFunction: "ease-in-out",
    borderRadius: "30px"
  })
}, [step])


  return (
    <div style={bgStyle} className="slider__wrapper">
      <div className="pagination__wrapper">
        <div style={{left: `${x}px`}} className="slider__pagination">
        { nfts.map((pagination, index) => <SliderPagination start={pagination.action} index={index} key={`pagination_${index}`} />) }
        </div>
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
