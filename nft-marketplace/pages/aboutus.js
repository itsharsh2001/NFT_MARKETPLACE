import Footer from "../components/Home/Footer";
import NavBar from "../components/Home/NavBar";

export default function AboutUs() {
  return (
    <>
      <NavBar />
      <iframe
        src='https://docs.google.com/presentation/d/e/2PACX-1vTPqvquIuUH5Z_sGKFBL706jAepayIna4cPP8qlcqgpKrjjxAxEvHX_z69wql8HVtfuT_VanuFcnJul/embed?start=false&loop=false&delayms=3000'
        frameborder='0'
        width='960'
        height='569'
        allowfullscreen='true'
        mozallowfullscreen='true'
        webkitallowfullscreen='true'
      ></iframe>
      <Footer />
    </>
  );
}
