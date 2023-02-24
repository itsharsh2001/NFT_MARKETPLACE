import React, { useEffect, useState } from "react";
import AppsIcon from "@mui/icons-material/Apps";
import TuneIcon from "@mui/icons-material/Tune";
import Card from "../UI/Card";
import classes from "./Creators.module.css";
import axios from "axios";

const Creators = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/getAllUsers`
      );
      const users = res.data.data.users;
      users.sort(function (a, b) {
        let A = new Date(a.createdAt),
          B = new Date(b.createdAt);
        return A - B;
      });
      setData(users);
    };
    getData();
  }, []);

  return (
    <>
      <h1 className={classes.creatorsh1}>Meet Our Great Creators</h1>
      <span className={classes.creatorspan}></span>

      <section className={classes.creatorsection}>
        {data &&
          data.map((user, index) => {
            return <Card data={user} key={index} />;
          })}
      </section>
    </>
  );
};

export default Creators;
