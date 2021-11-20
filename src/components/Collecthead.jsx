import React, { Component } from "react";
import Slider from "react-slick";


export default class Collecthead extends Component {
    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            centerPadding: 100,
            slidesToShow: 4,
            slidesToScroll: 2,
            initialSlide: 0,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                }
            ]
        };
        return (
            <div className="collecSlideCont">
                <div class="slideTitle"><h3>HEAD</h3></div>
                <Slider {...settings}>
                    <div className="slideItem">
                        asdf asdfa sdf asdf
                    </div>
                    <div className="slideItem">
                        asdf asdfa sdf asdf
                    </div>
                    <div className="slideItem">
                        asdf asdfa sdf asdf
                    </div>
                    <div className="slideItem">
                        asdf asdfa sdf asdf
                    </div>
                    <div className="slideItem">
                        asdf asdfa sdf asdf
                    </div>
                    <div className="slideItem">
                        asdf asdfa sdf asdf
                    </div>
                    <div className="slideItem">
                        asdf asdfa sdf asdf
                    </div>
                    <div className="slideItem">
                        asdf asdfa sdf asdf
                    </div>
                </Slider>
            </div>
        );
    }
}
