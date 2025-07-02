import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import OAuthCallback from "./components/OAuthCallback";
import Dashboard from "./components/Dashboard";

function App() {
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("authTokens");
    if (stored) {
      setTokens(JSON.parse(stored));
    }
  }, []);

  const handleSetTokens = (data) => {
    sessionStorage.setItem("authTokens", JSON.stringify(data));
    setTokens(data);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/oauth_callback"
          element={<OAuthCallback setAuthTokens={handleSetTokens} />}
        />
        <Route
          path="/"
          element={
            tokens?.accessToken ? (
              <Dashboard token={tokens.accessToken} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
