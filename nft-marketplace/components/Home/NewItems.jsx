import React from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DiamondIcon from '@mui/icons-material/Diamond';

import classes from "./NewItems.module.css";

function NewItems() {
  let image = `url(/signin.jpg)`
  let image2 = `url(/signin2.jpg)`

  const arr = [1,2,3,4,5,6,7,8,9]
  return (
    <>
        <h1>New Items, verified quality!</h1>
        <p>We maintain the quality of the goods sold with strict approval</p>
        <main className={classes.main}>
      {
        // data.map((item , index)=>{
        // console.log(item); 
        arr.map((item, index) => {
          
          return <div id={index}>
            <div className={classes.imgdiv1} style={{ background: image }}>

            </div>
            <span>

              <h3>Hello ji
              </h3>
              <div>
                <p>Current Bid</p>
                <p>End In</p>
              </div>
              <div>
                <h6><DiamondIcon />123 ETH</h6>
                <h6>22h 50m 22s</h6>
              </div>
              <div className={classes.greenbutton}>
                {/* <div style={{ background: image1 }}></div> */}
                <section>
                  <span className={classes.smallimg1} style={{ background: image2 }}></span>
                  <div>
                    <p>Owner</p>
                    <h6>HArsh</h6>
                  </div>
                </section>
                <button>Place Bid</button>
              </div>
            </span>
          </div>

        })
        // })
      }


    </main>
    <a href="/">Show More</a>
    </>
  );
}

export default NewItems;
