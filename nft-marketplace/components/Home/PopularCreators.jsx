import React from "react";

import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import Card from '../UI/Card';

import classes from "./PopularCreators.module.css";

function PopularCreators() {
  let image = `url(/signin.jpg)`
  let image2 = `url(/signin2.jpg)`

  const arr = [1,2,3,4,5,6,7,8,9,10]
  return (
    <section>
        <div>
            <h2>Weekly Popular 
            Creators!</h2>
            <p>Find the best creators of the week, ranked creators filtered by creator popularity in creating digital art.</p>
        </div>
        <div>
            <section>
                <WestIcon/>
                <EastIcon/>
            </section>
            <main>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </main>
        </div>
    </section>
  );
}

export default PopularCreators;
