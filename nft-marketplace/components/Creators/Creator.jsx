import React, { use, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DiamondIcon from "@mui/icons-material/Diamond";

import classes from "./Creator.module.css";
import Link from "next/link";

const Creator = ({ data }) => {
  const { user, collections } = data;
  const items = collections.map((collection) => collection.items).flat();
  items.sort(function (a, b) {
    let A = new Date(a.createdAt),
      B = new Date(b.createdAt);
    return B - A;
  });

  let image = `url(/signin.jpg)`;
  let image2 = `url(/signin2.jpg)`;

  return (
    <>
      <header className={classes.header}>
        <div>
          <section>
            <span
              className={classes.smallimg}
              style={{ background: image2 }}
            ></span>
            <div>
              <h4>{user.userName}</h4>
              <p>@{user.walletAddress}</p>
            </div>
          </section>
          <h1>
            Create Something Awesome For You{" "}
            <AutoAwesomeIcon style={{ fontSize: "40px", color: "gold" }} />
          </h1>
        </div>
        <span className={classes.imgdiv} style={{ background: image }}>
          <span>
            <div>
              <p>Collections</p>
              <h6>{collections.length}</h6>
            </div>
            <div>
              <p>Itmes</p>
              <h6>{items.length}</h6>
            </div>
            <CloudUploadIcon className={classes.icon} />
          </span>
        </span>
      </header>

      <hr className={classes.hr} />

      <main className={classes.main}>
        {
          items.map((item, index) => {
            return (
              <div id={item._id}>
                <div
                  className={classes.imgdiv1}
                  style={{ background: `url(${item.imageLinks[0]})` }}
                ></div>
                <span>
                  <div className={classes.greenbutton}>
                    {/* <div style={{ background: image1 }}></div> */}
                    <section>
                      <span
                        className={classes.smallimg1}
                        style={{ background: image2 }}
                      ></span>
                      <div>
                        <h6>{item.name}</h6>
                      </div>
                    </section>

                    <button>
                      <Link href='/item/[id]' as={`/item/${item._id}`}>
                        View
                      </Link>
                    </button>
                  </div>
                </span>
              </div>
            );
          })
          // })
        }
      </main>
    </>
  );
};

export default Creator;
