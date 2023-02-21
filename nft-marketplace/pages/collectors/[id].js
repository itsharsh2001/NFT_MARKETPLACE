import React from "react";
import Collector from "../../components/Collectors/Collector";
import Footer from "../../components/Home/Footer";
import NavBar from "../../components/Home/NavBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CollectorDetailPage() {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (router.query.id) {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/getAllItems`,
            {
              userId: router.query.id,
            }
          );
          setData(data);
          // console.log(data);
        } catch (error) {
          console.log(error.response.data);
        }
      }
    })();
  }, [router.query.id]);

  return (
    <>
      <NavBar />
      {data && <Collector data={data.data} />}
      <Footer />
    </>
  );
}
