import React from "react";

import classes from "./JoinTheCommunity.module.css";

function JoinTheCommunity() {
  return (
    <div className={classes.community}>
        <span>
            <img src="/signin.jpg" alt="" />
            <img src="/signin2.jpg" alt="" />
        </span>
        <div>
            <img src="/signin2.jpg" alt="" />
            <h1>Join The Community</h1>
            <img src="/signin.jpg" alt="" />
        </div>
        <p>We have a large scale group to support each other in this game, Join us to get the news as soon as possible and follow our latest announcements.</p>
        <section>
            <img src="/signin.jpg" alt="" />
            <button>Join Community</button>
            <img src="/signin2.jpg" alt="" />
        </section>
        <img className={classes.bigimage} src="/signin.jpg" alt="" />
    </div>
  );
}

export default JoinTheCommunity;
