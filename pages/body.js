import Link from "next/link";
import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { useEffect } from "react";
import Signup from "./components/signup";
import { useDispatch, useSelector } from "react-redux";
import { yesLogin } from "../slices/loginMenuSlice";
import { noLogin } from "../slices/loginMenuSlice";
import { login } from "../slices/loginStatusSlice";

export default function Body() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneno] = useState();
  const [otp, setOtp] = useState();
  const [pin, setPin] = useState();
  const [session, setSession] = useState(false);
  const [wrongotp, setWrongotp] = useState(false);

  const loginStatus = useSelector((state) => state.loginStatus.loginStatus);

  const noLoginMenu =
    " hidden absolute left-1/4 top-1/4 bg-white h-1/2 w-1/2  ";
  const yesLoginMenu = "  absolute left-1/4 top-1/4 bg-white h-1/2 w-1/2  ";
  const [secret, setSecret] = useState("");

  const loginMenu = useSelector((state) => state.loginMenu.loginMenu);

  useEffect(() => {
    async function fetchData() {
      const user = await fetch("/api/user").then((t) => t.json());
      //*console.log(user.phoneno);
      if (user.data) {
        function xd() {
          dispatch(login());
          dispatch(noLogin());
        }
        xd();
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <div>
        <div className={loginMenu}>
          <Signup />
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
              onClick={() => dispatch(yesLogin())}
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
