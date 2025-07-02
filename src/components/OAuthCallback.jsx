import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function OAuthCallback({ setAuthTokens }) {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    async function fetchTokens() {
      const params = new URLSearchParams(search);
      const code = params.get("code");
      const verifier = sessionStorage.getItem("pkce_verifier");
      const body = JSON.stringify({
        grant_type: "authorization_code",
        client_id: import.meta.env.VITE_QLIK_CLIENT_ID,
        code_verifier: verifier,
        code,
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
      });
      console.log({
        grant_type: "authorization_code",
        client_id: import.meta.env.VITE_QLIK_CLIENT_ID,
        code_verifier: verifier,
        code,
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
      });
      const response = await fetch(
        `${import.meta.env.VITE_TENANT_URI}/oauth/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        }
      );
      const data = await response.json();
      setAuthTokens(data);
      navigate("/", { replace: true });
    }
    fetchTokens();
  }, [search, setAuthTokens, navigate]);

  return <div>Authenticating...</div>;
}

export default OAuthCallback;
