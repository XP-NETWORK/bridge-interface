import "./Slider.css"
// import image from '../../assets/img/slider/s3.png';
import { useSelector } from "react-redux";

export default function Slider() {
  const nft = useSelector(state => state.slider.nft)

  const bgStyle = {
    backgroundImage: `url(${nft.image})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div style={bgStyle} className="slider__wrapper">
      <div className="slider__pagination">pagination</div>
      <div className="slider__info">
        <div className="slider__title">
          .slider
        </div>
      </div>
    </div>
  )
}
