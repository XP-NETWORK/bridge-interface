import "./Slider.css"
import image from '../../assets/img/slider/s3.png';
import { useSelector } from "react-redux";

export default function Slider() {
  const nft = useSelector(state => state.slider.nft)
  console.log("🚀 ~ file: Slider.jsx ~ line 7 ~ Slider ~ nft", nft.image)
  const bgStyle = {
    backgroundImage: `url(${nft.image})`,
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
