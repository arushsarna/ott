import Link from "next/link";
import React, { useState } from "react";
import jwt from "jsonwebtoken";
import { useEffect } from "react";
export default function Body() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneno] = useState();
  const [otp, setOtp] = useState();
  const [pin, setPin] = useState();
  const [session, setSession] = useState(false);
  const [wrongotp, setWrongotp] = useState(false);

  function enterotp() {
    const newpin = Math.floor(Math.random() * 1000000 + 1);
    setPin(newpin);
    setSession(true);
    console.log(newpin);
  }
  function verifyOTP() {
    console.log(pin);
    console.log(otp);
    if (pin == otp) {
      submitForm();

      setWrongotp(false);

      console.log("Logged In");
    } else {
      setWrongotp(true);
    }
  }
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
          <div>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <div>
                  <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Or
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {" "}
                      start your 14-day free trial{" "}
                    </a>
                  </p>
                </div>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="mt-8 space-y-6"
                  action="#"
                  method="POST"
                >
                  <input type="hidden" name="remember" value="true" />
                  <div className="rounded-md shadow-sm -space-y-px">
                    {!session && (
                      <div>
                        <label for="phone" className="sr-only">
                          Phone No.
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="phone"
                          autocomplete="phone"
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Phone No."
                          value={phoneno}
                          onChange={(e) => setPhoneno(e.target.value)}
                        />
                      </div>
                    )}
                    {session && (
                      <div>
                        <label for="otp" className="sr-only">
                          OTP
                        </label>
                        <input
                          id="otp"
                          name="otp"
                          type="number"
                          autocomplete="otp"
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </div>
                    )}

                    {/* <div>
                <label for="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div> */}
                  </div>
                  {wrongotp && session && (
                    <div className=" text-red-600 text-sm ">Wrong OTP</div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label
                        for="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        {" "}
                        Remember me{" "}
                      </label>
                    </div>

                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {" "}
                        Forgot your password?{" "}
                      </a>
                    </div>
                  </div>

                  <div>
                    {!session && (
                      <button
                        onClick={() => {
                          setSession(true);
                          enterotp();
                        }}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <svg
                            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                        Sign in
                      </button>
                    )}
                    {session && (
                      <button
                        onClick={() => {
                          verifyOTP();
                        }}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <svg
                            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                        Verify OTP
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
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
