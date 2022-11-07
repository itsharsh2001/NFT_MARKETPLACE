import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState } from 'react';

import classes from './Auth.module.css'

function Auth() {
    let image = `url(/signin.jpg)`
    let image1 = `url(/face.jpg)`

    const [isLogin, setIsLogin] = useState(true)

    const loginRegisterToggler = () => {
        setIsLogin((prevIsLogin)=>{return !prevIsLogin})
    }

    const loginHandler = () => {
        console.log("login successful");
    }

    const registerHandler = () => {
        console.log("register successful");
    }

    return (
        // <div style={{width:'100px', height:'100px', background:`url(/signin.jpg)`}}>
        // <div style={{width:'100px', height:'100px', background:image}}>

        //  </div>
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
                <h1>Welcome Back to Enfty.</h1>
                <p>This is our dedication in serving customers, so that we can find out which customers are really interested in</p>
                <label htmlFor="">User ID</label>
                <input type="text" name="" id="" placeholder='Input your ID' />
                <label htmlFor="">Password</label>
                <input type="password" name="" id="" placeholder='Input your password' />

                {!isLogin && <>
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" name="" id="" placeholder='Input your password' />
                </>}

                {isLogin && <div>
                    <p>Don't have account? <b onClick={loginRegisterToggler} className={classes.bold}>Register</b></p>
                    <button onClick={loginHandler}>Login</button>
                </div>}
                {!isLogin && <div>
                    <p>Already have a account? <b onClick={loginRegisterToggler} className={classes.bold}>Login</b></p>
                    <button onClick={registerHandler}>Register</button>
                </div>}
            </section>
        </header>
    )
}

export default Auth