import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import classes from './LoginRegister.module.css'
import { getURL } from 'next/dist/shared/lib/utils';
import { URL } from 'next/dist/compiled/@edge-runtime/primitives/url';
import image from '../../public/signin.jpg'
function LoginRegister() {
    return (
        <header className={classes.header}>
            {/* <span>
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
                <div>
                    <img src="" alt="" />
                    <section></section>
                    <button>Place Bid</button>
                </div>
            </span> */}

            <Swiper className={classes.slider}
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide>
                    <span>
                        <span style={{backgroundImage: image}}>
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
                            <div>
                                <img src="" alt="" />
                                <section></section>
                                <button>Place Bid</button>
                            </div>
                        </span>
                        </span>
                        </SwiperSlide>
                <SwiperSlide><span style={{ backgroundImage: '/signin2.jpg' }}>
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
                    <div>
                        <img src="" alt="" />
                        <section></section>
                        <button>Place Bid</button>
                    </div>
                </span></SwiperSlide>

            </Swiper>
            <section>
                <h1>Welcome Back to Enfty.</h1>
                <p>This is our dedication in serving customers, so that we can find out which customers are really interested in</p>
                <label htmlFor="">User ID</label>
                <input type="text" name="" id="" placeholder='Input your ID' />
                <label htmlFor="">Password</label>
                <input type="password" name="" id="" placeholder='Input your password' />
                
                <label htmlFor="">Confirm Password</label>
                <input type="password" name="" id="" placeholder='Input your password' />
                
                <div>
                    <p>Don't have account? <b className={classes.bold}>Register</b></p>
                    <button>Login</button>
                </div>
            </section>
        </header>
    )
}

export default LoginRegister