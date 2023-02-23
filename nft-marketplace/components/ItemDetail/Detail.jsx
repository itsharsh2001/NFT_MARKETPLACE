import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import classes from "./Detail.module.css";
import { ethers } from "ethers";

const url =
  "https://polygon-mumbai.g.alchemy.com/v2/Sq5Vw5NGLCscYbvOvYbkNTs21q25_IFD";
const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "token_id",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_NFTname",
        type: "string",
      },
      {
        internalType: "string",
        name: "_NFTsymbol",
        type: "string",
      },
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const Detail = ({ data }) => {
  async function handleVerify(event) {
    const address = data.contractAddress;
    const provider = new ethers.providers.Web3Provider(url);
    const contract = new ethers.Contract(address, abi, url);
    let owner = await contract.ownerOf(token_id);
    if (owner === connected_user) {
      alert("Real owner");
    } else {
      alert("Not real owner");
    }
  }

  return (
    <header className={classes.header}>
      <Swiper
        className={classes.slider}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data.imageLinks.map((link) => {
          console.log({ link });
          let img = `url(${link})`;
          return (
            <SwiperSlide>
              {/* <span> */}
              <div className={classes.imgdiv} style={{ background: img }}></div>
              {/* </span> */}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <section>
        <main>
          <span>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <p>
              <strong>Owner :</strong> {data.ownerAddress}
            </p>
            <p>
              <strong>Collection :</strong> {data.contractAddress}
            </p>
            <p>
              <strong>Created at :</strong> {data.createdAt}
            </p>

            <div className={classes.greenbutton}>
              <button onClick={(e) => handleVerify(e)}>Verify</button>
            </div>
          </span>
        </main>
      </section>
    </header>
  );
};

export default Detail;
