import React from 'react'
import CollectionsIcon from '@mui/icons-material/Collections';
import AppsIcon from '@mui/icons-material/Apps';
import TuneIcon from '@mui/icons-material/Tune';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LayersIcon from '@mui/icons-material/Layers';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DiamondIcon from '@mui/icons-material/Diamond';

import classes from './DiscoverPage.module.css'

function Discover() {
  const arr = [1,2,3,4,5,6,7,8,9]
  let image = `url(/signin.jpg)`
  let image2 = `url(/signin2.jpg)`

  return (
    <div className={classes.discover}>
        <h1>Find Your Incredible Art!</h1>
        <nav>
            <div>
                <span><AppsIcon/>Category</span>
                <span><CollectionsIcon/>Collections</span>
                <span><AttachMoneyIcon/>Sale Type</span>
                <span><LayersIcon/>Price Range</span>
            </div>
            <span><TuneIcon/>Sort By</span>
        </nav>

        <main className={classes.main}>

        {arr.map((item, index) => {
          console.log(item);
          return <div id={index}>
            <div className={classes.imgdiv1} style={{ background: image }}>

            </div>
            <span>

              <h3>heading
              </h3>
              <div>
                <p>Current Bid</p>
                <p>End In</p>
              </div>
              <div>
                <h6><DiamondIcon />120 ETH</h6>
                <h6>22h 50m 22s</h6>
              </div>
              <div className={classes.greenbutton}>
                {/* <div style={{ background: image1 }}></div> */}
                <section>
                  <span className={classes.smallimg1} style={{ background: image2 }}></span>
                  <div>
                    <p>Owner</p>
                    <h6>Harsh</h6>
                  </div>
                </section>
                <button>Place Bid</button>
              </div>
            </span>
          </div>
        
        })}
        </main>
    </div>
  )
}

export default Discover