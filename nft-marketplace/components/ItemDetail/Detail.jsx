import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import classes from "./Detail.module.css";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import Link from "next/link";
const url =
  "https://polygon-mumbai.infura.io/v3/a2d512999ccc4e8fa4c183b6d1d6ad9a";
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "_ownerOf",
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
  const user = useSelector((state) => state.user);
  // console.log({ data });

  async function handleVerify(event) {
    const provider = new ethers.providers.JsonRpcProvider(url);
    const contract = new ethers.Contract(data.contractAddress, abi, provider);
    let res = await contract.balanceOf(user.walletAddress);
    res = res.toString();
    console.log({ res });
    if (res == "0") alert("You are not the owner. :-(");
    else alert("You are the owner. :-)");

    // console.log(typeof data.tokenId);
    // console.log({ balance: owner.toString() });
    // if (owner === connected_user) {
    //   alert("Real owner");
    // } else {
    //   alert("Not real owner");
    // }
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
            <Link
              href={`https://mumbai.polygonscan.com/address/${data.contractAddress}`}
              target='_blank'
            >
              <CloudUploadIcon />
            </Link>
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

            {data.tokenId && user && (
              <div className={classes.greenbutton}>
                <button onClick={(e) => handleVerify(e)}>Verify</button>
              </div>
            )}
          </span>
        </main>
      </section>
    </header>
  );
};

export default Detail;
