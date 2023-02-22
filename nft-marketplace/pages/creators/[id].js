import React from "react";
import Creator from "../../components/Creators/Creator";
import Footer from "../../components/Home/Footer";
import NavBar from "../../components/Home/NavBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CreatorPage() {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (router.query.id) {
        try {
          const addressRegex = /^0x[a-fA-F0-9]{40}$/;
          let res;
          if (router.query.id.match(addressRegex)) {
            console.log("regex provided");
            res = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/get`,
              {
                address: router.query.id,
              }
            );
          } else {
            res = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/getById`,
              {
                userId: router.query.id,
              }
            );
          }

          if (res.data.data.user) setData(res.data.data);
          else {
            router.replace("/creators");
          }
        } catch (error) {
          console.log(error.response.data);
        }
      }
    })();
  }, [router.query.id]);

  return (
    <>
      <NavBar />
      {data && <Creator data={data} />}
      <Footer />
    </>
  );
}
