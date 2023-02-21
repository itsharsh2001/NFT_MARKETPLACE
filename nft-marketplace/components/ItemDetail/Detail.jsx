import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import classes from "./Detail.module.css";

const Detail = ({ data }) => {
  async function handleVerify(event) {
    alert("handle verify.");
  }

  return (
    <header className={classes.header}>
      <Swiper
        className={classes.slider}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data.imageLinks.map((link) => {
          console.log({ link });
          let img = `url(${link})`;
          return (
            <SwiperSlide>
              {/* <span> */}
              <div className={classes.imgdiv} style={{ background: img }}></div>
              {/* </span> */}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <section>
        <main>
          <span>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <p>
              <strong>Owner :</strong> {data.ownerAddress}
            </p>
            <p>
              <strong>Collection :</strong> {data.contractAddress}
            </p>
            <p>
              <strong>Created at :</strong> {data.createdAt}
            </p>

            <div className={classes.greenbutton}>
              <button onClick={(e) => handleVerify(e)}>Verify</button>
            </div>
          </span>
        </main>
      </section>
    </header>
  );
};

export default Detail;
