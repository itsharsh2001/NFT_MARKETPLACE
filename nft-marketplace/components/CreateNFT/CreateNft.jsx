import React from 'react'
import {useState} from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Switch } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DiamondIcon from '@mui/icons-material/Diamond';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ethers } from 'ethers';
import { Web3Button, 
  useAccount,
  useContract,
  useSignMessage,
  useContractWrite,
  useProvider,
  useSigner,
  Web3Modal} from '@web3modal/react';
import { create } from 'ipfs-http-client'

import ipfsClient from 'ipfs-http-client';
import classes from './CreateNft.module.css'
import {abi} from '../../../contracts/artifacts/contracts/NFT.sol/BtechProejctNFT.json';
const url ='https://polygon-mumbai.g.alchemy.com/v2/Sq5Vw5NGLCscYbvOvYbkNTs21q25_IFD';

const address = "0x93CF0E514e4D60D0986a13D0cb95A58ec4eA0197"

const projectId = '296iTBim8eN48PB5QsQeyRPBzoF';
const projectSecret = '76bfd111bd80b8380f4f5528034c4db9';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const init_url = 'https://cloudflare-ipfs.com/ipfs/';

const CreateNft = () => {
  let image = `url(/signin.jpg)`
  let image2 = `url(/signin2.jpg)`

const client = create({
  host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
})
  // function to mint nft
  const { account } = useAccount()
  const { data, error, isLoading } = useSigner('80001')
  const [file,setFile] = useState()

  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [assetUrl, setassetUrl] = useState('');


  async function mint(){
    let cont = new ethers.Contract(address,abi,data)
    // setContract(new ethers.Contract(address,abi,data))
    
    try{
      let tx = await cont.safeMint(account.address,
        "https://gateway.pinata.cloud/ipfs/QmeVXFqj78KRLc5du5ffQKBtzsUTXVbn7PfV8aFL2LaYSP")
      console.log(tx)
    }catch(err){
      throw err
    }
  }

  const handleChange = (event) => {
    console.log("Working Switch");
    // setFile(event.target.files[0])
    client.add(event.target.files[0]).then((res) => {
      let last_url = res.path.toString()
      setassetUrl(init_url+last_url)
  });
  
  }

  const handlenameChange = (event) => {
    console.log("description : ");
    setName(event.target.value)
  
  }
  const handledesChange = (event) => {
    console.log("description : ");
    setDescription(event.target.value)
  
  }

  const submitItems = async () => {
      // set the object
      let ob = {
        name : '',
        description : '',
        image : ''
      }

      ob.name = name
      ob.description = description
      ob.image = assetUrl

      console.log(ob)
    //   let final_url;
      client.add(ob).then((res) => {
        let last_url = res.path.toString()
        setassetUrl(init_url+last_url)
    });

  }

  console.log("The Item url is : ",assetUrl)

  return (
    <div className={classes.createnft}>
      <section>
        <h2>Create Your NFT!</h2>
        <p>Sign up to our regular newsletter for news, insight,
          new product releases & more.</p>
        <h5>Upload File</h5>
        <p>Drag or choose your file to upload</p>
        <span>
          <input type="file" name="" id="" placeholder='PNG, GIF, WEBP OR MP4, Max 1Gb' onChange={handleChange}/>
          <UploadFileIcon className={classes.icon} />
          <p className={classes.bottomnegative}>PNG, GIF, WEBP OR MP4, Max 1Gb</p>
          {/* PNG, GIF, WEBP OR MP4, Max 1Gb */}
        </span>
        <h5>Items Information</h5>
        <label htmlFor="itemname">Item Name</label>
        <input type="text" name="itemname" id="itemname" placeholder='Ex: Awesome Artwork!' onChange={handlenameChange}/>
        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" placeholder='Ex: After purchasing you will be able to receive the logo' 
          onChange={handledesChange}
        />

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
        <button onClick={submitItems}>Create Item</button>
      </div>
    </div>
  )
}

export default CreateNft