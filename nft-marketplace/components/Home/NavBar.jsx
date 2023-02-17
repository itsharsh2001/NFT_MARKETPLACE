import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import classes from "./NavBar.module.css";
import Link from "next/link";
import axios from "axios";
import {
  Web3Button,
  useAccount,
  useContract,
  useSignMessage,
  useContractWrite,
  useProvider,
  useSigner,
  Web3Modal,
} from "@web3modal/react";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

function NavBar() {
  // let [web3Modal, setWeb3Modal] = useState(null);
  // const [provider, setProvider] = useState(null);
  // const [contract, setContract] = useState(null);
  let image = `url(/signin.jpg)`
  const [address, setAddress] = useState("");
  const { account } = useAccount();
  const { data, error, isLoading } = useSigner("80001");
  if (error) {
    throw error;
  }

  const handleClick = () => {
    if (account.isConnected) {
      setAddress(account.address);
      const body = {
        address: account.address,
      };
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/login`, body)
        .then((res) => console.log({ res }))
        .catch((err) => console.log(err));
    }
  };

  return (
    <nav className={classes.nav}>
      <h6>Enefty.</h6>
      <ul>
        <Link href='/'>
          <li>DISCOVER</li>
        </Link>
        <Link href='/'>
          <li>CREATORS</li>
        </Link>
        <Link href='/'>
          <li>COLLECTORS</li>
        </Link>
        <Link href='/'>
          <li>STATS</li>
        </Link>
      </ul>
      <span>
        <input type='text' placeholder='Search Artwork/Creator Name' />
        <SearchIcon className={classes.icon} />
      </span>

      <Web3Button />
      <button onClick={() => handleClick()}>Handle Click</button>
      {/* <section>
        <img src="/signin.jpg" alt="" />
        <a href="/">Profile</a>
      </section> */}
    </nav>
  );
}

export default NavBar;
