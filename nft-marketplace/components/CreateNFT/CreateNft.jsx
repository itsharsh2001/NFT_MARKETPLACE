import React from "react";
import { useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Switch } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DiamondIcon from "@mui/icons-material/Diamond";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { create } from "ipfs-http-client";

import ipfsClient from "ipfs-http-client";
import classes from "./CreateNft.module.css";
import { abi } from "../../../contracts/artifacts/contracts/NFT.sol/BtechProejctNFT.json";
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

const CreateNft = () => {
  const user = useSelector((state) => state.user);
  const web3 = useSelector((state) => state.web3);

  let provider = null;
  if (user !== null && user.walletAddress !== "") {
    // if the user is logged in.
    provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_WEB3_URL
    );
  }
  console.log({ provider });

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

  async function mint() {
    let cont = new ethers.Contract(address, abi, data);
    // setContract(new ethers.Contract(address,abi,data))

    try {
      let tx = await cont.safeMint(
        account.address,
        "https://gateway.pinata.cloud/ipfs/QmeVXFqj78KRLc5du5ffQKBtzsUTXVbn7PfV8aFL2LaYSP"
      );
      console.log(tx);
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
    console.log("description : ");
    setName(event.target.value);
  };
  const handledesChange = (event) => {
    console.log("description : ");
    setDescription(event.target.value);
  };

  const submitItems = async () => {
    // set the object
    let ob = {
      name: "",
      description: "",
      image: "",
    };

    ob.name = name;
    ob.description = description;
    ob.image = assetUrl;

    // try {
    //   let final_url; // GETTING ERROR HERE
    //   client.add(ob).then((res) => {
    //     let last_url = res.path.toString();
    //     setassetUrl(init_url + last_url);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    const body = {
      walletAddress: user.walletAddress,
      ownerId: user._id,
      name,
      description,
      imageLinks: [assetUrl],
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

  console.log("The Item url is : ", assetUrl);

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
        <button onClick={submitItems}>Create Item</button>
      </div>
    </div>
  );
};

export default CreateNft;
