import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Auth from "../../components/Edit/Auth";
import Footer from "../../components/Home/Footer";
import NavBar from "../../components/Home/NavBar";

export default function Edit() {
  const router = useRouter();
  const user = useSelector((state) => state.user);

  if (!user || user._id !== router.query.id) {
    router.replace("/creators");
    return;
  }
  return (
    <>
      <NavBar />
      {user && user._id === router.query.id && <Auth data={user} />}
      <Footer />
    </>
  );
}
