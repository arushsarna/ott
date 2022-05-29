import React, { useState } from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import { useEffect } from "react";
// layout for page
import Admin from "layouts/Admin.js";
import { useRouter } from "next/router";
export default function Dashboard() {
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
  {
    if (login) {
      return (
        <>
          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
              <CardLineChart />
            </div>
            <div className="w-full xl:w-4/12 px-4">
              <CardBarChart />
            </div>
          </div>
          <div className="flex flex-wrap mt-4">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
              <CardPageVisits />
            </div>
            <div className="w-full xl:w-4/12 px-4">
              <CardSocialTraffic />
            </div>
          </div>
        </>
      );
    }
  }
}

Dashboard.layout = Admin;
