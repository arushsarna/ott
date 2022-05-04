import Link from "next/link";
import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { useEffect } from "react";
export default function Body() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [msg]
  const [loginStatus, setLoginStatus] = useState(false);
  //  const [loginstatus, setLoginStatus] = useState(false);
  const noLoginMenu =
    " hidden absolute left-1/4 top-1/4 bg-white h-1/2 w-1/2  ";
  const yesLoginMenu = "  absolute left-1/4 top-1/4 bg-white h-1/2 w-1/2  ";
  const [secret, setSecret] = useState("");
  const [loginMenu, setLoginMenu] = useState(noLoginMenu);
  async function submitForm() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((t) => t.json());
    async function fetchData() {
      const user = await fetch("/api/user").then((t) => t.json());

      console.log(user.data);
      if (user.data) {
        setLoginMenu(noLoginMenu);
        setLoginStatus(true);
      }
    }
    fetchData();
  }
  useEffect(() => {
    async function fetchData() {
      const user = await fetch("/api/user").then((t) => t.json());

      console.log(user.data);
      if (user.data) {
        setLoginMenu(noLoginMenu);
        setLoginStatus(true);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <div>
        <div className={loginMenu}>
          login
          <div className="flex justify-center mt-20 ">
            <form>
              <input
                className=" border-4 border-black"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br></br>
              <input
                className=" border-4 border-black"
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br></br>
              <input type="button" value="Login" onClick={submitForm} />
            </form>
          </div>
        </div>
      </div>
      <div className=" flex justify-end ">
        <div className=" p-20 w-1/2">
          <div className=" text-white text-6xl font-bold">KGF</div>
          <div className=" text-white text-4xl mt-3 font-bold">CHAPTER 2</div>
          <div className=" text-white text-2xl mt-4 antialiased">
            Rocky kills heir apparent Virat and takes over the Kolar Gold Fields
            (K.G.F), keeping Reena hostage to ensure the cooperation of Guru
            Pandian, Andrews and Rajendra Desai, and kills Kamal when he
            protests. He issues orders to start work in eight hidden mines.
            Meanwhile, Adheera resurfaces and kills all guards at an outpost. In
            a ruse to bring Rocky to Adheera, Andrews kills Desai to lure Reena
            outside K.G.F, and John captures Reena. Adheera shoots Rocky but
            spares his life, while his men roadblock all gold exports from
            K.G.F.
          </div>
          {loginStatus && (
            <Link href="/video">
              <button className=" bg-black text-white font bold px-4 p-3 rounded-3xl mt-4 ">
                Watch Trailer
              </button>
            </Link>
          )}
          {!loginStatus && (
            <button
              onClick={() => {
                setLoginMenu(yesLoginMenu);
              }}
              className=" bg-black text-white font-bold px-4 p-3 rounded-3xl mt-4 "
            >
              Watch Trailer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
