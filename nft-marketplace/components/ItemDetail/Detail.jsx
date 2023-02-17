import React from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState } from 'react';

import classes from './Detail.module.css'

const Detail = () => {
    let image = `url(/signin.jpg)`
    let image1 = `url(/face.jpg)`

  return (
    <header className={classes.header}>
            <Swiper className={classes.slider}
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide>
                    {/* <span> */}
                    <div className={classes.imgdiv} style={{ background: image }}>
                        <span>

                            <h3>Abstract Plain Waves</h3>
                            <h3>Premium #001</h3>
                            <div>
                                <p>Current Bid</p>
                                <p>End In</p>
                            </div>
                            <div>
                                <h6>50ETH</h6>
                                <h6>22h 50m 22s</h6>
                            </div>
                            <div className={classes.greenbutton}>
                                {/* <div style={{ background: image1 }}></div> */}
                                <section>
                                    <span className={classes.smallimg1} style={{ background: image1 }}></span>
                                    <div>
                                        <p>Owner</p>
                                        <h6>Harsh</h6>
                                    </div>
                                </section>
                                <button>Place Bid</button>
                            </div>
                        </span>
                    </div>
                    {/* </span> */}
                </SwiperSlide>
                <SwiperSlide>
                    {/* <span> */}
                    <div className={classes.imgdiv} style={{ background: image1 }}>
                        <span>

                            <h3>Abstract Plain Waves</h3>
                            <h3>Premium #001</h3>
                            <div>
                                <p>Current Bid</p>
                                <p>End In</p>
                            </div>
                            <div>
                                <h6>50ETH</h6>
                                <h6>22h 50m 22s</h6>
                            </div>
                            <div className={classes.greenbutton}>
                                {/* <div style={{ background: image1 }}></div> */}
                                <section>
                                    <span className={classes.smallimg1} style={{ background: image1 }}></span>
                                    <div>
                                        <p>Owner</p>
                                        <h6>Harsh</h6>
                                    </div>
                                </section>
                                <button>Place Bid</button>
                            </div>
                        </span>
                    </div>
                    {/* </span> */}
                </SwiperSlide>
                <SwiperSlide>
                    {/* <span> */}
                    <div className={classes.imgdiv} style={{ background: image }}>
                        <span>

                            <h3>Abstract Plain Waves</h3>
                            <h3>Premium #001</h3>
                            <div>
                                <p>Current Bid</p>
                                <p>End In</p>
                            </div>
                            <div>
                                <h6>50ETH</h6>
                                <h6>22h 50m 22s</h6>
                            </div>
                            <div className={classes.greenbutton}>
                                {/* <div style={{ background: image1 }}></div> */}
                                <section>
                                    <span className={classes.smallimg1} style={{ background: image1 }}></span>
                                    <div>
                                        <p>Owner</p>
                                        <h6>Harsh</h6>
                                    </div>
                                </section>
                                <button>Place Bid</button>
                            </div>
                        </span>
                    </div>
                    {/* </span> */}
                </SwiperSlide>
            </Swiper>
            <section>
                <h1>Abstrack Plain Waves Premium #001</h1>
                <p>This NFT Card will give you Access to Special Airdrops. To learn more about picko please visit https://picko.net</p>
                <main></main>

                
            </section>
        </header>
  );
};

export default Detail;
