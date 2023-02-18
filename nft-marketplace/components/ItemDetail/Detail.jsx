import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import classes from "./Detail.module.css";

const Detail = ({ data }) => {
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
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <p>
            <strong>owner :</strong> {data.ownerId}
          </p>
          <p>
            <strong>collection :</strong> {data.collectionId}
          </p>
        </main>
      </section>
    </header>
  );
};

export default Detail;
