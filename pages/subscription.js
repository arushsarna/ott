import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import YouTube from "react-youtube";
import streamlink from "./admin/link";
export default function Subscription() {
  const [phoneno, setPhone] = useState();
  const [subscription, setSubscription] = useState("free");
  const [data, setData] = useState([]);
  const [video, setVideo] = useState(
    "hidden w-[300px] h-[200px]  ease-in-out hover:ease-in-out"
  );
  const [promo, setPromo] = useState(" hidden w-[500px] h-[300px]");
  const [image, setImage] = useState(
    " ease-in-out transition hover:ease-in-out relative overflow-visible duration-300 "
  );

  useEffect(() => {
    // async function checkAuth() {
    //   //*console.log(user.phoneno);

    // }
    // checkAuth();
    async function fetchData() {
      const auth = await fetch("/api/auth").then((t) => t.json());
      setPhone(auth.phoneno);
      const res = await fetch("/api/checkSubscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneno: auth.phoneno }),
      }).then((t) => t.json());
      if (res == "free") {
        setSubscription("free");
      } else {
        setSubscription("paid");
        const content = await fetch("/api/getContent").then((t) => t.json());
        setData(content);
        console.log(data);
      }
      //   if (subscription.data) {
      //   }
    }
    fetchData();
  }, []);
  async function Subscribe() {
    if (subscription == "free") {
      const data = await fetch("/api/setSubscriptionPaid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneno: phoneno }),
      }).then((t) => t.json());
      setSubscription("paid");
      const content = await fetch("/api/getContent").then((t) => t.json());
      setData(content);
      console.log(data);
    } else {
      const data = await fetch("/api/setSubscriptionFree", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneno: phoneno }),
      }).then((t) => t.json());
      setSubscription("free");
      setData([]);
    }
  }

  return (
    <div>
      <div>{subscription}</div>

      <button
        on
        onClick={() => {
          Subscribe();
        }}
      >
        {" "}
        Subscribe
      </button>
      <div className="flex ">
        {data.map((xd) => (
          <div key={xd.id} className="mt-10">
            Title : {xd.title}
            <br></br>
            Genere : {xd.genere}
            <br></br>
            Description : {xd.description}
            <br></br>
            Type : {xd.type}
            <br />
            <div
              key={xd.id}
              className="w-[300px] h-[200px]  m-2 overflow-visible "
            >
           
              <video
                key={xd.id}
                className={
                  "  w-[300px] h-[200px]  ease-in-out hover:ease-in-out"
                }
                src={xd.streamlink}
                onMouseEnter={(event) => event.target.play()}
                onMouseOut={(event) => event.target.pause()}
                poster={xd.thumbnail}

                // muted
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
