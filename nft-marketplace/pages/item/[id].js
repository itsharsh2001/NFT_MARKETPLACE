import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/Home/Footer";
import NavBar from "../../components/Home/NavBar";
import Detail from "../../components/ItemDetail/Detail";

export default function ItemDetail() {
  const router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      if (router.query.id) {
        try {
          const { data } = await axios.post(
            "http://localhost:2100/api/v1/item/get",
            {
              itemId: router.query.id,
            }
          );
          setData(data);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [router.query.id]);

  return (
    <>
      <NavBar />
      {data && <Detail data={data.data} />}
      <Footer />
    </>
  );
}
