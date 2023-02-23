import React from "react";

import { useState } from "react";

import classes from "./Auth.module.css";

function Auth() {
  let image = `url(/signin.jpg)`;
  let image1 = `url(/face.jpg)`;

  const [isLogin, setIsLogin] = useState(true);

  const loginRegisterToggler = () => {
    setIsLogin((prevIsLogin) => {
      return !prevIsLogin;
    });
  };

  const loginHandler = () => {
    console.log("login successful");
  };

  const handleEdit = () => {
    console.log("Editing");
  };

  return (
    // <div style={{width:'100px', height:'100px', background:`url(/signin.jpg)`}}>
    // <div style={{width:'100px', height:'100px', background:image}}>

    //  </div>
    <header className={classes.header}>
      <section>
        <h1>Give your profile some personal touches.</h1>
        <p>
          This is our dedication in serving customers, so that we can find out
          which customers are really interested in
        </p>
        <label htmlFor=''>User ID</label>
        <input type='text' name='' id='' placeholder='Input your ID' />
        <label htmlFor=''>Password</label>
        <input
          type='password'
          name=''
          id=''
          placeholder='Input your password'
        />
        <label htmlFor=''>Password</label>
        <input
          type='password'
          name=''
          id=''
          placeholder='Input your password'
        />
        <label htmlFor=''>Password</label>
        <input
          type='password'
          name=''
          id=''
          placeholder='Input your password'
        />

        <div>
          <button onClick={handleEdit}>Edit</button>
        </div>
      </section>
    </header>
  );
}

export default Auth;
