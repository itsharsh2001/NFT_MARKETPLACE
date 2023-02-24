import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

import { useState } from "react";

import classes from "./Auth.module.css";

function Auth({ data }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");
  const [background, setBackground] = useState("");
  const handleEdit = () => {
    const edit = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/edit`,
          {
            userId: data._id,
            userName: username,
            profilePic: profile,
            backgroundPic: background,
          }
        );
        router.replace(`/creators/${data._id}`);
      } catch (error) {
        console.log("Some error occurred while editing.");
        console.log(error);
      }
    };
    edit();
  };

  return (
    <header className={classes.header}>
      <section>
        <h1>Give your profile some personal touches.</h1>
        <p>
          This is our dedication in serving customers, so that we can find out
          which customers are really interested in
        </p>
        <label htmlFor=''>User Name</label>
        <input
          type='text'
          name=''
          value={username}
          placeholder='Input your username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor=''>Profile Pic Url (Public)</label>
        <input
          type='text'
          name=''
          id=''
          placeholder='Input your url'
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
        />
        <label htmlFor=''>Background</label>
        <input
          type='text'
          name=''
          id=''
          placeholder='Input your url'
          value={background}
          onChange={(e) => setBackground(e.target.value)}
        />
        <div>
          <button onClick={handleEdit}>Edit</button>
        </div>
      </section>
    </header>
  );
}

export default Auth;
