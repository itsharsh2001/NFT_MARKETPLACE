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
      setData(res.data.data);
    };
    getData();
  }, []);

  return (
    <>
      <h1 className={classes.creatorsh1}>Meet Our Great Creators</h1>
      <span className={classes.creatorspan}></span>

      <section className={classes.creatorsection}>
        {data &&
          data.users.map((user) => {
            return <Card data={user} />;
          })}
      </section>
    </>
  );
};

export default Creators;
