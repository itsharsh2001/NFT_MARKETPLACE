import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import classes from "./NavBar.module.css";
import Link from "next/link";
import { ethers } from "ethers";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { useSelector, useDispatch } from "react-redux";
import {
  setId,
  setUserName,
  setWalletAddress,
  setBalance,
} from "../../slices/userReducer";
import axios from "axios";

function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  async function initWallet() {
    if (typeof window !== "undefined") {
      console.log("You are on the browser,You are good to go");

      const web3auth = new Web3Auth({
        clientId: process.env.NEXT_PUBLIC_WEB3_CID,
        authMode: process.env.NEXT_PUBLIC_WEB3_CID,
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: process.env.NEXT_PUBLIC_WEB3_CHAIN_ID,
          rpcTarget: process.env.NEXT_PUBLIC_BASE_URL,
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

        dispatch(setUserName(data.user.userName));
        dispatch(setId(data.user._id));
        dispatch(setWalletAddress(Uaddress));
        dispatch(setBalance(bal));
      } catch (err) {
        // Error when user close the pop up window
        console.log(err);
      }
    } else {
      console.log("You are on the server,Cannot execute");
    }
  }

  let image = `url(/signin.jpg)`;
  // const [address, setAddress] = useState("");
  // const { account } = useAccount();
  // const { data, error, isLoading } = useSigner("80001");
  // if (error) {
  //   throw error;
  // }

  async function disconnect() {
    try {
      dispatch(setUserName(""));
      dispatch(setId(""));
      dispatch(setWalletAddress(""));
      dispatch(setBalance(""));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <nav className={classes.nav}>
      <h6>Enefty.</h6>

      {user.walletAddress !== "" && (
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

      {user.walletAddress !== "" ? (
        <button onClick={() => disconnect()}>Disconnect</button>
      ) : (
        <button onClick={() => initWallet()}>Connect</button>
      )}
      <section>
        <img src='/signin.jpg' alt='' />
        <a href='/'>Profile</a>
      </section>
    </nav>
  );
}

export default NavBar;
