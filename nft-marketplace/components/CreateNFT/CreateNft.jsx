import React from "react";
import { useState, useEffect } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DiamondIcon from "@mui/icons-material/Diamond";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { create } from "ipfs-http-client";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, log } from "@web3auth/base";
import classes from "./CreateNft.module.css";
import { factoryABI } from "../../utils";
import { contractABI } from "../../utils";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { setUserState } from "../../slices/userReducer";
import { useRouter } from "next/router";

const projectId = "296iTBim8eN48PB5QsQeyRPBzoF";
const projectSecret = "76bfd111bd80b8380f4f5528034c4db9";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const init_url = "https://cloudflare-ipfs.com/ipfs/";

const CreateNft = () => {
  const [collections, setCollections] = useState([]);
  const [obj, setObj] = useState({
    user: null,
    web3provider: null,
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const [assetUrl, setassetUrl] = useState("");
  const [finalUrl, setFinalUrl] = useState("");
  const [receiver, setReciever] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");

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
        let bal = await provider.getBalance(Uaddress);
        bal = bal.toString();

        fetchCollections(Uaddress);
        setObj({ ...obj, user: Uaddress, web3provider: web3auth });
      } catch (err) {
        // Error when user close the pop up window
        console.log("error");
        console.log(err);
      }
    } else {
      console.log("You are on the server,Cannot execute");
    }
  }

  async function fetchCollections(address) {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/collection/getAll`,
        {
          address: address,
        }
      );
      setCollections(data.data);
    } catch (error) {
      console.log("User Doesn't have any collection.");
    }
  }

  useEffect(() => {
    const connect = async () => {
      await initWallet();
    };
    connect();
  }, []);

  // function to filter address
  function filter_address(address) {
    let addr = "0x";
    for (let i = 0; i < address.length; ++i) {
      if (address[i] !== "0" && address[i] !== "x") {
        let temp = address.slice(i, address.length);
        addr += temp;
        break;
      }
    }

    return addr;
  }
  async function createNewCollection() {
    if (collectionName === "" || collectionDescription === "") {
      return;
    }
    const provider = new ethers.providers.Web3Provider(
      obj.web3provider.provider
    );
    const signer = provider.getSigner();
    let contractAddress = "0xb6e4a7e11E9Aceb17a87EFf565787C3515324939";
    const userAddress = await signer.getAddress();
    let FactoryObj = new ethers.Contract(contractAddress, factoryABI, signer);
    console.log(FactoryObj);
    console.log("Impl : ", await FactoryObj.implementationContract());
    console.log(userAddress);
    // create new contract
    let txn;
    try {
      txn = await FactoryObj.createContract(
        "Harsh", // this will be the collection name send by user
        "HSH", // this will be collection symbol send by the user
        userAddress // wallet address of the connected wallet
      );

      const receipt = await txn.wait();
      let new_collection_address = filter_address(receipt.logs[0].topics[1]);
      console.log("created contract address : ", new_collection_address);

      const payload = {
        name: collectionName,
        description: collectionDescription,
        address: obj.user,
        contractAddress: new_collection_address,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/collection/create`,
        payload
      );
      if (res.data.success) {
        fetchCollections(obj.user);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function mint(url, id) {
    try {
      const provider = new ethers.providers.Web3Provider(
        obj.web3provider.provider
      );
      const signer = provider.getSigner();
      let contObj = new ethers.Contract(contractAddress, contractABI, signer);
      console.log(await contObj.name());
      console.log(await contObj.symbol());

      // setContract(new ethers.Contract(address,abi,data))
      if (url === "") {
        console.log("asset not uploaded");
        return;
      }

      // mint the NFT
      // check that NFT already doesn't exist
      // if(
      //   await contObj.
      // )

      let tx = await contObj.safeMint(
        receiver,
        id, // Id send or generated for the minting NFT
        url
      );
      console.log(tx);
      return true;
    } catch (error) {
      throw error;
    }
  }

  const handleChange = async (event) => {
    console.log("Working Switch");
    // setFile(event.target.files[0])
    const res = await client.add(event.target.files[0]);
    let last_url = res.path.toString();
    setassetUrl(init_url + last_url);
  };

  const submitItems = async () => {
    // set the object
    let ob = {
      name: "",
      description: "",
      image: "",
      createdAt: "",
    };

    ob.name = name;
    ob.description = description;
    ob.image = assetUrl;
    ob.createdAt = new Date();
    ob = JSON.stringify(ob);

    let last_url = "";
    try {
      const res = await client.add(ob);
      last_url = res.path.toString();
      last_url = init_url + last_url;
      setFinalUrl(last_url);
    } catch (error) {
      console.log("got err");
      console.log(error);
      return;
    }

    // call the mint function to mint the NFT
    let resMint = false;
    let randNum;
    try {
      randNum = new Date().valueOf();
      resMint = await mint(last_url, randNum);
    } catch (err) {
      console.log("Something went wrong while minting.");
    }

    /* @sid save object {ob} into the selected collection of the user with the {finalURL} generated above */

    if (resMint) {
      const body = {
        address: obj.user,
        contractAddress: contractAddress,
        name,
        description,
        imageLinks: [assetUrl],
        finalUrl,
        tokenId: randNum.toString(),
      };
      try {
        let data = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/item/create`,
          body
        );
        console.log({ data });

        data = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/login`,
          { address: obj.user }
        );
        const user = data.data.data.user;

        const userObj = {
          userName: user.userName,
          _id: user._id,
          walletAddress: user.address,
          balance: 0,
        };

        dispatch(setUserState(userObj));
        router.push("/creators");
      } catch (error) {
        console.log(error);
      }
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
        <br />
        <h4>Receiver</h4>
        <input
          type='text'
          name='itemname'
          id='itemname'
          placeholder='Enter receiver wallet address'
          value={receiver}
          onChange={(e) => setReciever(e.target.value)}
        />
        <h5>Items Information</h5>
        <label htmlFor='itemname'>Item Name</label>
        <input
          type='text'
          name='itemname'
          id='itemname'
          placeholder='Ex: Awesome Artwork!'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          name='description'
          id='description'
          placeholder='Ex: After purchasing you will be able to receive the logo'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className={classes.column}>
          <span>
            <label htmlFor='Collection'>Collection</label>
            <select
              name='Collection'
              id='Collection'
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value || "")}
            >
              <option value=''>-- Select an option --</option>
              {collections.map((collection) => {
                return (
                  <option
                    key={collection._id}
                    value={collection.contractAddress || ""}
                  >
                    {collection.name}
                  </option>
                );
              })}
            </select>
          </span>
        </div>
        {contractAddress === "" && (
          <>
            <br />
            <p>OR</p>
            <div className={classes.column}>
              <span>
                <label htmlFor='newcollection'>Create a New Collection</label>
                <input
                  type='text'
                  name='newcollection'
                  id='newcollection'
                  placeholder='Enter Name'
                  value={collectionName}
                  onChange={(e) => setCollectionName(e.target.value)}
                />
                <input
                  type='text'
                  name='newcollection'
                  id='newcollection'
                  placeholder='Enter Description'
                  value={collectionDescription}
                  onChange={(e) => setCollectionDescription(e.target.value)}
                />
                <button
                  onClick={(e) => {
                    if (contractAddress === "") {
                      createNewCollection();
                    }
                  }}
                >
                  Create Collection
                </button>
              </span>
            </div>
          </>
        )}
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
                style={{
                  borderRadius: "20px",
                  height: "480px",
                  width: "100%",
                  position: "center",
                }}
              />
            </div>
          )}
        </div>
        <span>
          <section>
            <h5>{name == "" ? "Item Name" : name}</h5>
          </section>
          {/* <div>
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
          </div> */}
          <span>
            <img src='/signin.jpg' alt='' />
            <h6>@walletAddress</h6>
          </span>
        </span>
        <button onClick={submitItems}>Create Item</button>
      </div>
    </div>
  );
};

export default CreateNft;
