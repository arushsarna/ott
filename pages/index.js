import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "./components/navbar";
import kgf from "./assets/kgf.jpg";
import Body from "./body";
export default function Home() {
  return (
    <div className="h-screen">
      <div className="absolute -z-10">
        <Image className=" object-cover" src={kgf} />
      </div>
      <Navbar />
      <Body />
    </div>
  );
}
