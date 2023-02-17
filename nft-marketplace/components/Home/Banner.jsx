import React from "react";

import classes from "./Banner.module.css";

function Banner() {
  return (
    <div className={classes.banner}>
        <span>
            <h1>Create Your Own NFT!</h1>
            <p>We have a large scale group to support each other in this game, Join us to get the news as soon as possible and follow our latest announcements!</p>
        </span>
        <button>Create NFT</button>
    </div>
  );
}

export default Banner;
