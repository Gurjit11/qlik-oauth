import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [apps, setApps] = useState(null);

  useEffect(() => {
    // 1. Grab token from URL if present
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("access_token");
    if (tokenFromUrl) {
      localStorage.setItem("qlik_token", tokenFromUrl);
      // Clean up URL
      window.history.replaceState({}, "", window.location.pathname);
    }

    // 2. Get token from storage
    const token = localStorage.getItem("qlik_token");
    if (!token) {
      // not logged in → start OAuth
      window.location.href =
        "https://qlik-oauth-web-backend.onrender.com/login";
      return;
    }

    // 3. Send token on all axios requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // 4a. fetch user
    axios
      .get("https://qlik-oauth-web-backend.onrender.com/api/user")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("User fetch error:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("qlik_token");
          window.location.href =
            "https://qlik-oauth-web-backend.onrender.com/login";
        }
      });

    // 4b. fetch apps
    axios
      .get("https://qlik-oauth-web-backend.onrender.com/api/apps")
      .then((res) => {
        setApps(res.data);
      })
      .catch((err) => {
        console.error("Apps fetch error:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("qlik_token");
          window.location.href =
            "https://qlik-oauth-web-backend.onrender.com/login";
        }
      });
  }, []);

  if (!user || !apps) {
    return <p>Loading…</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.name || user.email}</h1>
      <h2>Your Apps</h2>
      <ul>
        {apps.data.map((app) => (
          <li key={app.resourceId}>{app.name}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          localStorage.removeItem("qlik_token");
          window.location.href =
            "https://qlik-oauth-web-backend.onrender.com/login";
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default App;
