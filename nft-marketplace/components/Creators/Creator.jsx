import React, { use, useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DiamondIcon from "@mui/icons-material/Diamond";

import classes from "./Creator.module.css";
import Link from "next/link";
import axios from "axios";

const Creator = ({ data }) => {
  let image = `url(/signin.jpg)`;
  let image2 = `url(/signin2.jpg)`;
  const user = data.user;
  console.log(user);
  const [collections, setCollections] = useState([]);
  const [collectionId, setCollectionId] = useState("");
  const [items, setItems] = useState([]);

  // we obtained this user object. Now obtai getAllCollections
  // {{localUrl}}/api/v1/collection/getAll
  useEffect(() => {
    const getCollections = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/collection/getAll`,
          { address: user.walletAddress }
        );
        setCollections(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCollections();
  }, []);

  useEffect(() => {
    const getItems = async () => {
      try {
        let res;
        let itemsObj = [];
        if (collectionId === "0") {
          for (const ele of user.received) {
            const res = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/item/get`,
              { itemId: ele }
            );
            itemsObj.push(res.data.data);
          }
        } else {
          res = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/collection/get`,
            { collectionId }
          );

          itemsObj = res.data.data.items;
        }

        itemsObj.sort(function (a, b) {
          let A = new Date(a.createdAt),
            B = new Date(b.createdAt);
          return B - A;
        });
        setItems(itemsObj);
      } catch (error) {
        console.log(error);
      }
    };
    if (collectionId !== "") getItems();
    else setItems([]);
  }, [collectionId]);

  return (
    <>
      <header className={classes.header}>
        <div>
          <section>
            <span
              className={classes.smallimg}
              style={{
                background: user.profilePic
                  ? `url(${user.profilePic})`
                  : image2,
              }}
            ></span>
            <div>
              <h4>{user.userName}</h4>
              <p>@{user.walletAddress}</p>
              <Link href={`/edit/${user._id}`}>
                <EditIcon />
              </Link>
            </div>
          </section>
          <h1>
            Create Something Awesome For You{" "}
            <AutoAwesomeIcon style={{ fontSize: "40px", color: "gold" }} />
          </h1>

          {(collections.length > 0 || user.received.length > 0) && (
            <select
              name='Collection'
              id='Collection'
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value || "")}
            >
              <option value=''>-- Choose category --</option>
              {user.received.length > 0 && (
                <option value='0'>received -- ({user.received.length})</option>
              )}
              {collections.map((collection) => {
                return (
                  <option key={collection._id} value={collection._id || ""}>
                    {collection.name} -- ({collection.items.length})
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <span
          className={classes.imgdiv}
          style={{
            background: user.backgroundPic
              ? `url(${user.backgroundPic})`
              : image,
          }}
        >
          <span>
            <div>
              <p>Collections</p>
              <h6>{collections.length}</h6>
            </div>
            <div>
              <p>Itmes</p>
              <h6>{items.length}</h6>
            </div>
            <Link
              href={`https://mumbai.polygonscan.com/address/${user.walletAddress}`}
              target='_blank'
            >
              <CloudUploadIcon className={classes.icon} />
            </Link>
          </span>
        </span>
      </header>

      <hr className={classes.hr} />

      <main className={classes.main}>
        {
          items.map((item, index) => {
            return (
              <div key={index}>
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
