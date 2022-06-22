import React, { useEffect, useState } from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import { data } from "autoprefixer";

export default function Admin({ children }) {
  const [newUser, setNewUser] = useState(0);
  const [sales, setSales] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("/api/newUserAnalytics").then((t) => t.json());
      setNewUser(data.newUser);
      const data2 = await fetch("/api/salesAnalytics").then((t) => t.json());
      setSales(data2.sales);
    }
    fetchData();
  }, []);
  const commonProps = { newUser: newUser, sales: sales };
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100  ">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats {...commonProps} />
        <div className="px-4 md:px-10 mx-auto w-full  -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
