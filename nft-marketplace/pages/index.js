import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import NavBar from "../components/Home/NavBar";
import Footer from "../components/Home/Footer";
import TopCollection from "../components/Home/TopCollection";
import Carousal from "../components/Home/Carousal";
import PopularCreators from "../components/Home/PopularCreators";
import NewItems from "../components/Home/NewItems";
import Banner from "../components/Home/Banner";
import JoinTheCommunity from "../components/Home/JoinTheCommunity";
import Updates from "../components/Home/Updates";
import Creators from "./creators";

export default function Home() {
  return (
    <>
      <Creators />
      {/* <NavBar />
      <TopCollection/>
      <Carousal/>
      <PopularCreators/>
      <NewItems/>
      <Banner/>
      <JoinTheCommunity/>
      <Updates/>
      <Footer /> */}
    </>
  );
}
