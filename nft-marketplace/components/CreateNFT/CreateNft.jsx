import React from "react";
import { useState,useEffect } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Switch } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DiamondIcon from "@mui/icons-material/Diamond";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { create } from "ipfs-http-client";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";

import ipfsClient from "ipfs-http-client";
import classes from "./CreateNft.module.css";
import { factoryABI } from "../../utils";
import { contractABI } from "../../utils";
import { useSelector } from "react-redux";
import { ethers } from "ethers";

const url =
  "https://polygon-mumbai.g.alchemy.com/v2/Sq5Vw5NGLCscYbvOvYbkNTs21q25_IFD";

const address = "0x93CF0E514e4D60D0986a13D0cb95A58ec4eA0197";

const projectId = "296iTBim8eN48PB5QsQeyRPBzoF";
const projectSecret = "76bfd111bd80b8380f4f5528034c4db9";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const init_url = "https://cloudflare-ipfs.com/ipfs/";


/*@sid - When this page load the all collections of connected wallet [obj.user] needs to be fetched */
const CreateNft = () => {
  // const [user,setUser] = useState(null)
  // const web3 = useSelector((state) => state.web3);
  
  const [obj,setObj] = useState({
    user: null,
    web3provider : null
  })

  let image = `url(/signin.jpg)`;
  let image2 = `url(/signin2.jpg)`;

  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });
  // function to mint nft
  const [file, setFile] = useState();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assetUrl, setassetUrl] = useState("");
  const [finalUrl,setFinalUrl] = useState('');

  // function to initiate wallet
  async function initWallet() {
    if (typeof window !== "undefined") {
      console.log("You are on the browser,You are good to go");

      const web3auth = new Web3Auth({
        clientId: process.env.NEXT_PUBLIC_WEB3_CID,
        authMode: process.env.NEXT_PUBLIC_WEB3_MODE,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: process.env.NEXT_PUBLIC_WEB3_CHAIN_ID,
          rpcTarget: process.env.NEXT_PUBLIC_WEB3_URL,
        },
      });

      try {

        await web3auth.initModal();
        await web3auth.connect();

        const provider = new ethers.providers.Web3Provider(web3auth.provider);
        const signer = provider.getSigner();
        const Uaddress = await signer.getAddress();
        console.log("the user is : ",Uaddress)
        let bal = await provider.getBalance(Uaddress);
        bal = bal.toString();
        // setWeb3Provider(web3auth);
        setObj({...obj,user:Uaddress,web3provider:web3auth})


      } catch (err) {
        // Error when user close the pop up window
        console.log("error")
        console.log(err);
      }
    } else {
      console.log("You are on the server,Cannot execute");
    }
  }

  useEffect(() =>{
      const connect = async() =>{
        await initWallet()
        
      }
      connect()
  },[])

  // let provider = null;
  // if (user !== null && user.walletAddress !== "") {
  //   // if the user is logged in.
  //   provider = new ethers.providers.JsonRpcProvider(
  //     process.env.NEXT_PUBLIC_WEB3_URL
  //   );
  // }
  // console.log({ provider });

 // function to filer address
 function filter_address(
  address
){
  let addr = '0x';
      for(let i = 0; i < address.length; ++i){
          if(address[i] !== '0' && address[i] !== 'x'){
              let temp = address.slice(i,address.length)
              addr += temp;
              break;
          }
      }

      return addr;
}
async function createNewCollection(){
  // if(name === '' || description === ''){
  //   console.log("name and description can't be null")

  //   return
  // }
  const provider = new ethers.providers.Web3Provider(obj.web3provider.provider);
  const signer = provider.getSigner();
  let contractAddress = "0xb6e4a7e11E9Aceb17a87EFf565787C3515324939"
  const userAddress = await signer.getAddress()
  let FactoryObj = new ethers.Contract(contractAddress, factoryABI, signer);
  console.log(FactoryObj)
  console.log("Impl : ",await FactoryObj.implementationContract())
  console.log(userAddress)
  // create new contract 
  let txn;
  try{
  txn = await FactoryObj.createContract(
    "Harsh", // this will be the collection name send by user
    "HSH",  // this will be collection symbol send by the user
    userAddress // wallet address of the connected wallet
  )

  const receipt = await txn.wait()
  let new_collection_address = filter_address(receipt.logs[0].topics[1])
  console.log("created contract address : ",new_collection_address);

  /* @sid save new_collection need to be the users DB as the new collection to the user*/

  }catch(err){
    console.log(err)
  }
  
}

  async function mint(url,id) {

    const provider = new ethers.providers.Web3Provider(obj.web3provider.provider);
    const signer = provider.getSigner();
    const Uaddress = await signer.getAddress();
    console.log("the user is : ",Uaddress)
    let contractAddress = "0x727EEad8327b30c17ebff6A46A3cFC27A9405584"
    let contObj = new ethers.Contract(contractAddress, contractABI, signer);
    console.log(await contObj.name())
    console.log(await contObj.symbol())

    // setContract(new ethers.Contract(address,abi,data))
    if(url === ''){
      console.log("asset not uploaded")
      return
    }

    // mint the NFT
    // check that NFT already doesn't exist
    // if(
    //   await contObj.
    // )
    try {
      let tx = await contObj.safeMint(
        Uaddress,
        id, // Id send or generated for the minting NFT
        url
      );
      console.log(tx);

      /* @sid */

    } catch (err) {
      throw err;
    }
  }

  const handleChange = (event) => {
    console.log("Working Switch");
    // setFile(event.target.files[0])
    client.add(event.target.files[0]).then((res) => {
      let last_url = res.path.toString();
      setassetUrl(init_url + last_url);
    });
  };

  const handlenameChange = (event) => {
    console.log("name : ");
    setName(event.target.value);
  };
  const handledesChange = (event) => {
    console.log("description : ");
    setDescription(event.target.value);
  };

  console.log(name)
  console.log(description)

  console.log("asset url : ",assetUrl);
  console.log("final Url asset url : ",finalUrl);

 

  const submitItems = async () => {
    // set the object
    let ob = {
      name: "",
      description: "",
      image: "",
      createdAt :""
    };

    ob.name = name;
    ob.description = description;
    ob.image = assetUrl;
    ob.createdAt = new Date()
    ob = JSON.stringify(ob)

    let last_url = '';
    try {
      client.add(ob).then((res) => {
        last_url = res.path.toString();
        setFinalUrl(init_url + last_url);
      });
    } catch (error) {
      console.log("got err")
      console.log(error);
    }

    // call the mint function to mint the NFT
    try{
        await mint(init_url+last_url)

    }catch(err){
      console.log(err)
    }
    
    /* @sid save object {ob} into the selected collection of the user with the {finalURL} generated above */ 
    /*@sid also add the logic to call mint or createNewCollection from this function based on whether user selects to 
           to mint from existing collection {mint} or create a new collection {createNewCollection} 
    */
    const body = {
      walletAddress: user.walletAddress,
      ownerId: user._id,
      name,
      description,
      imageLinks: [finalUrl],
    };

    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/item/create`,
        body
      );
      console.log({ data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.createnft}>
      <section>
        <h2>Create Your NFT!</h2>
        <p>
          Sign up to our regular newsletter for news, insight, new product
          releases & more.
        </p>
        <h5>Upload File</h5>
        <p>Drag or choose your file to upload</p>
        <span>
          <input
            type='file'
            name=''
            id=''
            placeholder='PNG, GIF, WEBP OR MP4, Max 1Gb'
            onChange={handleChange}
          />
          <UploadFileIcon className={classes.icon} />
          <p className={classes.bottomnegative}>
            PNG, GIF, WEBP OR MP4, Max 1Gb
          </p>
          {/* PNG, GIF, WEBP OR MP4, Max 1Gb */}
        </span>
        <br/>
        <h4>Receiver</h4>
        <input
          type='text'
          name='itemname'
          id='itemname'
          placeholder='Enter receiver wallet address'
          onChange={handlenameChange}
        />
        <h5>Items Information</h5>
        <label htmlFor='itemname'>Item Name</label>
        <input
          type='text'
          name='itemname'
          id='itemname'
          placeholder='Ex: Awesome Artwork!'
          onChange={handlenameChange}
        />
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          name='description'
          id='description'
          placeholder='Ex: After purchasing you will be able to receive the logo'
          onChange={handledesChange}
        />

        <div className={classes.column}>
          <span>
            <label htmlFor='royalty'>Collection</label>
            <select name='Collection' id='Collection'>
              <option value='Choose Collection'>Choose Collection</option>
              <option value='Collection A'>Collection A</option>
              <option value='Collection B'>Collection B</option>
              <option value='Collection C'>Collection C</option>
            </select>
          </span>

          {/* <span>
            <label htmlFor='size'>Size</label>
            <input
              type='text'
              name='size'
              id='size'
              placeholder='Ex: 1000x1000'
            />
          </span>
          <span>
            <label htmlFor='property'>Property</label>
            <input
              type='text'
              name='property'
              id='property'
              placeholder='Ex: property'
            />
          </span> */}
        </div>
        <br />
        <p>OR</p>
        <label htmlFor='newcollection'>Create a New Collection</label>
        <input
          type='text'
          name='newcollection'
          id='newcollection'
          placeholder='Enter New Collection Name'
          onChange = {handlenameChange}
        />
        <input
          type='text'
          name='newcollection'
          id='newcollection'
          placeholder='Enter New Collection Symbol'
          onChange={handledesChange}
        />
        {/* <h5>Put on Sale</h5>
        <section>
          <p>You’ll receive bids on this item</p>
          <Switch
            // checked={checked}
            onChange={handleChange}
            color='warning'
            inputProps={{ "aria-label": "controlled" }}
          />
        </section>
        <h5>Instant sale price</h5>
        <section>
          <p>Enter the price for which the item will be instantly sold</p>
          <Switch
            // checked={checked}
            onChange={handleChange}
            color='warning'
            inputProps={{ "aria-label": "controlled" }}
          />
        </section>

        <h5>Unlock once purchased</h5>
        <section>
          <p>Content will be unlocked after successful transaction</p>
          <Switch
            // checked={checked}
            onChange={handleChange}
            color='warning'
            inputProps={{ "aria-label": "controlled" }}
          />
        </section> */}
      </section>

      <div>
        <h4>PREVIEW ITEM</h4>
        <div className={classes.imgdiv} style={{ background: image }}>
          {assetUrl != "" && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                verticalAlign: "middle",
              }}
            >
              <img
                src={assetUrl}
                alt='Your upload'
                style={{ height: "300px", width: "300px", position: "center" }}
              />
            </div>
          )}
        </div>
        <span>
          <section>
            <h5>{name == "" ? "Item Name" : name}</h5>
            <FavoriteBorderIcon className={classes.icon2} />
          </section>
          <div>
            <section>
              <p>Reserve Price</p>
              <h6>
                <DiamondIcon className={classes.icon3} />O ETH
              </h6>
            </section>
            <section>
              <p>Likes</p>
              <h6>
                <FavoriteIcon className={classes.icon3} />0
              </h6>
            </section>
          </div>
          <span>
            <img src='/signin.jpg' alt='' />
            <h3>@{user?.userName}</h3>
          </span>
        </span>
        <button onClick={createNewNFT}>Create Item</button>
      </div>
    </div>
  );
};

export default CreateNft;
