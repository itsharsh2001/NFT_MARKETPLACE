import React from "react";
import classes from "./Card.module.css";
import Link from "next/link";

let image = `url(/signin.jpg)`;
let image2 = `url(/signin2.jpg)`;

const Card = ({ data }) => {
  return (
    <>
      <Link href='/creators/[id]' as={`/creators/${data ? data._id : ""}`}>
        <span className={classes.card}>
          {/* <img src={image} alt="cardimage" /> */}
          <span
            style={{
              background: data.backgroundPic
                ? `url(${data.backgroundPic})`
                : image,
            }}
          ></span>
          <div>
            <span
              style={{
                background: data.profilePic
                  ? `url(${data.profilePic})`
                  : image2,
              }}
            ></span>
            <span>
              <h4>{data ? data.userName : "Username"}</h4>
              <p>@{data ? data._id : "Handle"}</p>
            </span>
          </div>
          <section>
            <span>
              <p>Collections</p>
              <h4>{data ? data.collections.length : 0}</h4>
            </span>
            <button>Profile</button>
          </section>
          <section className={classes.imgspan}>
            <span style={{ background: image }}></span>
            <span style={{ background: image2 }}></span>
            <span style={{ backgroundImage: image }}>+55</span>
          </section>
        </span>
      </Link>
    </>
  );
};

export default Card;
