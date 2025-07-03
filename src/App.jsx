import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://qlik-oauth-web-backend.onrender.com/api/user", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
  }, []);

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.name || user.email}</h1>
          <pre>{JSON.stringify(user)}</pre>
        </>
      ) : (
        <a href="https://qlik-oauth-web-backend.onrender.com/login">Re-login</a>
      )}
    </div>
  );
}

export default App;
