import "./Slider.css"
import Carousel from 'react-bootstrap/Carousel'
import Slider1 from '../../assets/img/slider/s1.png';
import Slider2 from '../../assets/img/slider/s2.png';
import Slider3 from '../../assets/img/slider/s3.png';
import Slider4 from '../../assets/img/slider/s4.png';

export default function Slider() {
  return (
    <div className="slider__wrapper">
      <Carousel variant="dark">
        <Carousel.Item>
            <img
            className="d-block w-10"
            src={Slider1}
            alt="First slide"
            />
            <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-10"
            src={Slider2}
            alt="Second slide"
            />
            <Carousel.Caption>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-10"
            src={Slider3}
            alt="Third slide"
            />
            <Carousel.Caption>
            <h5>Third slide label</h5>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
    </div>
  )
}
