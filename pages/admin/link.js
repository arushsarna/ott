import React, { useEffect, useState } from "react";

import Admin from "../../layouts/Admin.js";
import { useRouter } from "next/router";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
export default function Link() {
  const [login, setLogin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      const auth = await fetch("/api/authAdmin").then((t) => t.json());
      if (auth.data == false) {
        router.push("/admin");
      } else {
        setLogin(true);
      }
    }
    fetchData();
  }, []);
  const [type, setType] = useState("Movie");
  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState(true);
  const [streamlink, setStreamlink] = useState();
  const [episode, setEpisode] = useState(false);
  const [episodeno, setEpisodeno] = useState();
  const [privacy, setPrivacy] = useState(false);
  const [form, setForm] = useState(true);
  const handleChange = (event) => {
    setType(event.target.value);
  };
  var status;
  async function submitForm() {
    const res = await fetch("/api/createStreamlink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, streamlink, type, episode }),
    }).then((t) => t.json().then((status = t.status)));

    if (status === "400") {
      setSuccess(false);
    }
    console.log(status);
    console.log(success);

    setForm(false);
  }
  return (
    <>
      <div className="container mx-auto px-4 h-full mb-20">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {!form && !success && (
                  <div>
                    <div className=" mt-4">Form is Submitted!</div>
                    <button
                      onClick={() => {
                        setForm(true);
                        setPrivacy(false);
                      }}
                      className=" mt-3  px-5 py-2  bg-blue-700 text-white rounded-2xl"
                    >
                      Submit New Episode/Movie
                    </button>
                  </div>
                )}
                {!form && success && (
                  <div>
                    <div className=" mt-4">
                      Title Not found , Please first Create Content!
                    </div>
                    <button
                      onClick={() => {
                        setForm(true), setPrivacy(false);
                      }}
                      className=" mt-3  px-5 py-2  bg-blue-700 text-white rounded-2xl"
                    >
                      Search a different Title?
                    </button>
                  </div>
                )}

                {form && (
                  <form>
                    <div className="relative w-full mb-3 mt-10">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Title
                      </label>
                      <input
                        value={title}
                        onChange={() => {
                          setTitle(event.target.value);
                        }}
                        type="title"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Title"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Streamlink
                      </label>
                      <input
                        value={streamlink}
                        onChange={() => {
                          setStreamlink(event.target.value);
                        }}
                        type="Streamlink"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Streamlink"
                      />
                    </div>

                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small">Age</InputLabel>

                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={type}
                        label="Age"
                        onChange={handleChange}
                      >
                        <MenuItem
                          onClick={() => {
                            setEpisode(false);
                          }}
                          value={"Movie"}
                        >
                          Movie
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setEpisode(true);
                          }}
                          value={"Webseries"}
                        >
                          Webseries
                        </MenuItem>
                      </Select>
                    </FormControl>
                    {episode && (
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Episode No.
                        </label>
                        <input
                          onChange={() => {
                            setEpisodeno(event.target.value);
                          }}
                          type="number"
                          value={episodeno}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Episode No."
                        />
                      </div>
                    )}
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          onClick={() => {
                            setPrivacy(!privacy);
                          }}
                          id="customCheckLogin"
                          type="checkbox"
                          className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        />
                        <span className="ml-2 text-sm font-semibold text-blueGray-600">
                          I agree with the{" "}
                          <a href="#pablo" className="text-lightBlue-500">
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>

                    <div className="text-center mt-6">
                      <button
                        onClick={submitForm}
                        disabled={!privacy}
                        className=" disabled:bg-gray-300 bg-blue-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                      >
                        Add the {type}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
Link.layout = Admin;
