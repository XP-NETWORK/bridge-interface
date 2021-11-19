import React from 'react'
import Slider1 from '../assets/img/slider/slider_1.png';
import Slider2 from '../assets/img/slider/slider_2.png';
import Slider3 from '../assets/img/slider/slider_3.png';
import Slider4 from '../assets/img/slider/slider_4.png';

function NftSlider() {
    return (
        <div className="NftSlider">
            <div className="sliderContainer">
                <div className="row">
                    <div className="col-3">
                        <div className="nftSlideBox">
                            <div className="nfgSlidImg">
                                <img src={Slider1} alt="" />
                            </div>
                            <div className="nftSlidImg">
                                <p className="nftSlidNumber">#8945</p>
                                <div className="nftAut"><a href="#" className="">Dima_U</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="nftSlideBox">
                            <div className="nfgSlidImg">
                                <img src={Slider2} alt="" />
                            </div>
                            <div className="nftSlidImg">
                                <p className="nftSlidNumber">#8945</p>
                                <div className="nftAut"><a href="#" className="">Dima_U</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="nftSlideBox">
                            <div className="nfgSlidImg">
                                <img src={Slider3} alt="" />
                            </div>
                            <div className="nftSlidImg">
                                <p className="nftSlidNumber">#8945</p>
                                <div className="nftAut"><a href="#" className="">Dima_U</a></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="nftSlideBox">
                            <div className="nfgSlidImg">
                                <img src={Slider4} alt="" />
                            </div>
                            <div className="nftSlidImg">
                                <p className="nftSlidNumber">#8945</p>
                                <div className="nftAut"><a href="#" className="">Dima_U</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NftSlider
