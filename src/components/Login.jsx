import React from "react";
import { generateCodeVerifier, generateCodeChallenge } from "../helpers/oauth";

function Login() {
  const handleLogin = async () => {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    sessionStorage.setItem("pkce_verifier", verifier);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: import.meta.env.VITE_QLIK_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_REDIRECT_URI,
      scope: "openid profile email",
      code_challenge: challenge,
      code_challenge_method: "S256",
      state: Math.random().toString(36).substring(2),
    });
    console.log({
      response_type: "code",
      client_id: import.meta.env.VITE_QLIK_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_REDIRECT_URI,
      scope: "openid profile email",
      code_challenge: challenge,
      code_challenge_method: "S256",
      state: Math.random().toString(36).substring(2),
    });
    window.location = `${
      import.meta.env.VITE_TENANT_URI
    }/oauth/authorize?${params}`;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Login to Qlik Cloud</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
