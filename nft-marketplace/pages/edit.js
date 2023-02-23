import { useSelector } from "react-redux";
import Auth from "../components/Edit/Auth";
import Footer from "../components/Home/Footer";
import NavBar from "../components/Home/NavBar";

export default function LoginRegister() {
  const user = useSelector((state) => state.user);

  return (
    <>
      <NavBar />
      {user && <Auth />}
      <Footer />
    </>
  );
}
