import React from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DiamondIcon from '@mui/icons-material/Diamond';

import classes from './Collector.module.css'

const Collector = ({ data }) => {
  let image = `url(/signin.jpg)`
  let image2 = `url(/signin2.jpg)`
  // console.log(data);
  return (<>
    <header className={classes.header}>
      <div>
        <section>
          <span className={classes.smallimg} style={{ background: image2 }}></span>
          <div>
            <h4>Wanda</h4>
            <p>@wanda</p>
          </div>
        </section>
        <h1>Create Something Awesome For You <AutoAwesomeIcon style={{ fontSize: '40px', color: 'gold' }} /></h1>
        <section>
          <button>Follow</button>
          <button>...</button>
        </section>
      </div>
      <span className={classes.imgdiv} style={{ background: image }} >
        <span>
          <div>
            <p>Followers</p>
            <h6>160</h6>
          </div>
          <div>
            <p>Following</p>
            <h6>345</h6>
          </div>
          <CloudUploadIcon className={classes.icon} />
        </span>
      </span>
    </header>


    <ul className={classes.ul}>
      <li>Created 57</li>
      <li>Collected 20</li>
      <li>Split 1</li>
      <li>Offers Received 4</li>
      <li>Offers Made 3</li>
    </ul>


    <hr className={classes.hr} />


    <main className={classes.main}>
      {
        // data.map((item , index)=>{
        // console.log(item); 
        data[0].items.map((item, index) => {
          console.log(item);
          return <div id={item._id}>
            <div className={classes.imgdiv1} style={{ background: `url(${item.imageLinks[0]})` }}>

            </div>
            <span>

              <h3>{item.description}
              </h3>
              <div>
                <p>Current Bid</p>
                <p>End In</p>
              </div>
              <div>
                <h6><DiamondIcon />{item.price} ETH</h6>
                <h6>22h 50m 22s</h6>
              </div>
              <div className={classes.greenbutton}>
                {/* <div style={{ background: image1 }}></div> */}
                <section>
                  <span className={classes.smallimg1} style={{ background: image2 }}></span>
                  <div>
                    <p>Owner</p>
                    <h6>{item.name}</h6>
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
  </>
  )
}

export default Collector