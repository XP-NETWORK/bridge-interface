import React, { Component } from "react";
import Slider from "react-slick";

import Slider1 from '../assets/img/slider/s1.png';
import Slider2 from '../assets/img/slider/s2.png';
import Slider3 from '../assets/img/slider/s3.png';
import Slider4 from '../assets/img/slider/s4.png';

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
            infinite: false,
            dots: true,
            arrows: false,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: false,
                        dots: false,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        initialSlide: 1,
                        arrows: false,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 1,
                        arrows: false,
                        infinite: true,
                    }
                }
            ]
        };
        return (
            <div className="collecSlideCont container">
                <Slider {...settings}>
                    <div className="slideItem">
                        <div className="nftSlideBox">
                            <div className="nfgSlidImg">
                                <img src={Slider2} alt="" />
                            </div>
                            <div className="nftSlidImg">
                                <p className="nftSlidNumber">Crypto Stamp</p>
                                {/* <div className="nftAut"><a className="">Dima_U</a></div> */}
                            </div>
                        </div>
                    </div>
                    <div className="slideItem">
                        <div className="nftSlideBox">
                            <div className="nfgSlidImg">
                                <img src={Slider2} alt="" />
                            </div>
                            <div className="nftSlidImg">
                                <p className="nftSlidNumber">Academy</p>
                                {/* <div className="nftAut"><a className="">Dima_U</a></div> */}
                            </div>
                        </div>
                    </div>
                    <div className="slideItem">
                        <div className="nftSlideBox">
                            <div className="nfgSlidImg">
                                <img src={Slider3} alt="" />
                            </div>
                            <div className="nftSlidImg">
                                <p className="nftSlidNumber">Troop Item Space Dog</p>
                                {/* <div className="nftAut"><a className="">Dima_U</a></div> */}
                            </div>
                        </div>
                    </div>
                    <div className="slideItem">
                        <div className="nftSlideBox">
                            <div className="nfgSlidImg">
                                <img src={Slider4} alt="" />
                            </div>
                            <div className="nftSlidImg">
                                <p className="nftSlidNumber">PandaClub #1050</p>
                                {/* <div className="nftAut"><a className="">Dima_U</a></div> */}
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        );
    }
}
