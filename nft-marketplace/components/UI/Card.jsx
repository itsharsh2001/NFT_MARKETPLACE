import React from "react";
import classes from "./Card.module.css";
import Link from "next/link";

let image = `url(/signin.jpg)`;
let image2 = `url(/signin2.jpg)`;

const Card = ({ data }) => {
  const { userName, walletAddress, _id, collections } = data;
  return (
    <>
      <Link href='/creators/[id]' as={`/creators/${_id}`}>
        <span className={classes.card}>
          {/* <img src={image} alt="cardimage" /> */}
          <span style={{ background: image }}></span>
          <div>
            <span style={{ background: image2 }}></span>
            <span>
              <h4>{userName}</h4>
              <p>@{_id}</p>
            </span>
          </div>
          <section>
            <span>
              <p>Collections</p>
              <h4>{collections.length}</h4>
            </span>
            <span>
              <p>Followers</p>
              <h4>1.000</h4>
            </span>
            <button>Follow</button>
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
