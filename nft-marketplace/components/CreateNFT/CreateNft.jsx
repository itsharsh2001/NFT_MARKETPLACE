import React from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Switch } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DiamondIcon from '@mui/icons-material/Diamond';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import classes from './CreateNft.module.css'

const CreateNft = () => {
  let image = `url(/signin.jpg)`
  let image2 = `url(/signin2.jpg)`
  const handleChange = () => {
    console.log("Working Switch");
  }
  return (
    <div className={classes.createnft}>
      <section>
        <h2>Create Your NFT!</h2>
        <p>Sign up to our regular newsletter for news, insight,
          new product releases & more.</p>
        <h5>Upload File</h5>
        <p>Drag or choose your file to upload</p>
        <span>
          <input type="file" name="" id="" placeholder='PNG, GIF, WEBP OR MP4, Max 1Gb' />
          <UploadFileIcon className={classes.icon} />
          <p className={classes.bottomnegative}>PNG, GIF, WEBP OR MP4, Max 1Gb</p>
          {/* PNG, GIF, WEBP OR MP4, Max 1Gb */}
        </span>
        <h5>Items Information</h5>
        <label htmlFor="itemname">Item Name</label>
        <input type="text" name="itemname" id="itemname" placeholder='Ex: Awesome Artwork!' />
        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" placeholder='Ex: After purchasing you will be able to receive the logo' />

        <div className={classes.column}>
          <span>
            <label htmlFor="royalty">Royalty</label>
            <select name="royalty" id="royalty">
              <option value="Choose Royalty">Choose Royalty</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="20">20%</option>
            </select>
          </span>
          <span>
            <label htmlFor="size">Size</label>
            <input type="text" name="size" id="size" placeholder='Ex: 1000x1000' />
          </span>
          <span>
            <label htmlFor="property">Property</label>
            <input type="text" name="property" id="property" placeholder='Ex: property' />
          </span>
        </div>

        <h5>Put on Sale</h5>
        <section>
          <p>You’ll receive bids on this item</p>
          <Switch
            // checked={checked}
            onChange={handleChange}
            color="warning"
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </section>
        <h5>Instant sale price</h5>
        <section>
          <p>Enter the price for which the item will be instantly sold</p>
          <Switch
            // checked={checked}
            onChange={handleChange}
            color="warning"
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </section>

        <h5>Unlock once purchased</h5>
        <section>
          <p>Content will be unlocked after successful transaction</p>
          <Switch
            // checked={checked}
            onChange={handleChange}
            color="warning"
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </section>
      </section>

      <div>
        <h4>PREVIEW ITEM</h4>
        <div className={classes.imgdiv} style={{ background: image }}>

        </div>
        <span>
          <section>
            <h5>Item Name</h5>
            <FavoriteBorderIcon className={classes.icon2} />
          </section>
          <div>
            <section>
              <p>Reserve Price</p>
              <h6><DiamondIcon className={classes.icon3} />O ETH</h6>

            </section>
            <section>
              <p>Likes</p>
              <h6><FavoriteIcon className={classes.icon3} />0</h6>
            </section>
          </div>
          <span>
            <img src='/signin.jpg' alt="" />
            <h3>@mikhail</h3>
          </span>
        </span>
        <button>Create Item</button>
      </div>
    </div>
  )
}

export default CreateNft