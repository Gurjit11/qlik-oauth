import React, { useState, useEffect } from "react";
import { fetchAllApps } from "../helpers/fetchApps";

function Dashboard() {
  const [apps, setApps] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    fetchAllApps(token).then(setApps).catch(setError);
  }, []);

  if (error) {
    return <div>Error loading apps: {error.message}</div>;
  }
  return (
    <ul>
      {apps.map((app) => (
        <li key={app.id}>{app.name}</li>
      ))}
    </ul>
  );
}

export default Dashboard;
