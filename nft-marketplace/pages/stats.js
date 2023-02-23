import Footer from "../components/Home/Footer";
import NavBar from "../components/Home/NavBar";
import { UsersChart, ItemsChart } from "../components/Home/canvas";

export default function CreateNFT() {
  return (
    <>
      <NavBar />
      <UsersChart />
      <ItemsChart />
      <Footer />
    </>
  );
}
