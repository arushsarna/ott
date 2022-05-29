import React from "react";

export default function Navbar() {
  return (
    <nav className="flex justify-between px-20 text-white p-8">
      {/* nav  */}
      <div className=" flex space-x-20">
        <div>Movies</div>
        <div>Tv Shows</div>
        <div>Documentaries</div>
      </div>
      {/* tittle */}
      <div>Tittle</div>
      {/* search sign it etc */}
      <div className=" flex   space-x-10 ">
        <div>search</div>
        <div>icon</div>
        <div>Sign up</div>
      </div>
    </nav>
  );
}
