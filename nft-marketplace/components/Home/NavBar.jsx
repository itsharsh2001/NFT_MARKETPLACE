import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import classes from "./NavBar.module.css";
import Link from "next/link";
import { ethers } from "ethers";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { useSelector, useDispatch } from "react-redux";
import { setUserState } from "../../slices/userReducer";
import { setWeb3State } from "../../slices/web3Reducer";
import axios from "axios";
import { useRouter } from "next/router";

function NavBar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [search, setSearch] = useState("");

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

        let { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/login`,
          {
            address: Uaddress,
          }
        );
        data = data.data;

        const userObj = {
          userName: data.user.userName,
          _id: data.user._id,
          walletAddress: Uaddress,
          balance: bal,
          profilePic: data.user.profilePic,
          backgroundPic: data.user.backgroundPic,
        };

        dispatch(setUserState(userObj));
      } catch (err) {
        // Error when user close the pop up window
        console.log(err);
      }
    } else {
      console.log("You are on the server,Cannot execute");
    }
  }

  let image = `url(/signin.jpg)`;

  async function disconnect() {
    try {
      dispatch(setUserState(null));
      dispatch(setWeb3State(null));
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSearch(event) {
    if (search === "") {
      alert("Search address can't be empty!");
      return;
    }

    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/get`,
        { address: search }
      );
      const user = data.data.data.user;
      console.log({ data });
      if (user) router.push(`/creators/${user._id}`);
      else router.replace("/creators");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className={classes.nav}>
      <h6>Certifiable</h6>

      {(user != null && user.walletAddress) !== "" && (
        <ul>
          <Link href='/'>
            <li>DISCOVER</li>
          </Link>
          <Link href='/creators'>
            <li>CREATORS</li>
          </Link>
          <Link href='/stats'>
            <li>STATS</li>
          </Link>
          {user && (
            <Link href={`/creators/${user._id}`}>
              <li>SPACE</li>
            </Link>
          )}
        </ul>
      )}
      <span>
        <SearchIcon className={classes.icon} onClick={handleSearch} />
        <input
          type='text'
          value={search}
          placeholder='Search Creator by address'
          onChange={(e) => setSearch(e.target.value)}
        />
      </span>

      {user != null && user.walletAddress !== "" ? (
        <>
          <button onClick={() => disconnect()}>Disconnect</button>
          <Link href='/creators/[id]' as={`/creators/${user._id}`}>
            <section>
              <img
                src={user.profilePic ? user.profilePic : "/signin.jpg"}
                alt=''
              />
              {user != null && user.userName}
            </section>
          </Link>
        </>
      ) : (
        <button onClick={() => initWallet()}>Connect</button>
      )}
    </nav>
  );
}

export default NavBar;
