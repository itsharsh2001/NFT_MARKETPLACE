import React from "react";
import classes from "./TopCollection.module.css";

function TopCollection() {
  return (
    <div className={classes.topcollection}>
        <h3>Top Collection in 7 Days!</h3>
        <span>
            <p>We collected all the trending artworks for best creators in the last 7 days!</p>
            <h6>See All Collections</h6>
        </span>
    </div>
  );
}

export default TopCollection;
