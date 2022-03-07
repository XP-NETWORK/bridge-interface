import "./Slider.css"
// import image from '../../assets/img/slider/s3.png';
import { useSelector } from "react-redux";

export default function Slider() {
  const image = useSelector(state => state.slider.nft.image)

  const bgStyle = {
    backgroundImage: `url(${image})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <div style={bgStyle} className="slider__wrapper">
      <div className="pagination">pagination</div>

    </div>
  )
}
