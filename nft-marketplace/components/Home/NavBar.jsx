import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {useState} from 'react';
import classes from "./NavBar.module.css";
import Link from "next/link";
import { ethers } from "ethers";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { useSelector, useDispatch } from "react-redux";
import { setUserState } from "../../slices/userReducer";
import { setWeb3State } from "../../slices/web3Reducer";
import axios from "axios";

function NavBar() {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);

  const [obj,setObj] = useState({
    user: null,
    web3provider : null
  })

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
        setObj({...obj,user:Uaddress,web3provider:web3auth})
        // let { data } = await axios.post(
        //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/login`,
        //   {
        //     address: Uaddress,
        //   }
        // );
        // data = data.data;

        const network = await provider.getNetwork();
        // const web3Obj = {
        //   network: {
        //     ...network,
        //   },
        // };

        // const userObj = {
        //   userName: data.user.userName,
        //   _id: data.user._id,
        //   walletAddress: Uaddress,
        //   balance: bal,
        // };
        // dispatch(setUserState(userObj));
        // dispatch(setWeb3State(web3Obj));
      } catch (err) {
        // Error when user close the pop up window
        console.log("error")
        console.log(err);
      }
    } else {
      console.log("You are on the server,Cannot execute");
    }
  }

  let image = `url(/signin.jpg)`;

  async function disconnect() {
    try {
      // dispatch(setUserState(null));
      // dispatch(setWeb3State(null));
      await obj.web3provider.logout()
      setObj({...obj,user:null})
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <nav className={classes.nav}>
      <h6>Certifiable.</h6>

      {(obj.user != null && obj.user.walletAddress) !== "" && (
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
      )}
      <span>
        <input type='text' placeholder='Search Artwork/Creator Name' />
        <SearchIcon className={classes.icon} />
      </span>

      {obj.user != null && obj.user.walletAddress !== "" ? (
        <>
          <button onClick={() => disconnect()}>Disconnect</button>
          <section>
            <img src='/signin.jpg' alt='' />
            <a href='/'>{obj.user != null && obj.user.userName}</a>
          </section>
        </>
      ) : (
        <button onClick={() => initWallet()}>Connect</button>
      )}
    </nav>
  );
}

export default NavBar;
