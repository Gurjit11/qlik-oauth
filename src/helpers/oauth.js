// src/helpers/oauth.js

// Convert decimal to hex
const dec2hex = (dec) => ("0" + dec.toString(16)).slice(-2);

export function generateCodeVerifier() {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}

async function sha256(buffer) {
  return await window.crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(buffer)
  );
}

export async function generateCodeChallenge(verifier) {
  const hashed = await sha256(verifier);
  const base64 = btoa(String.fromCharCode(...new Uint8Array(hashed)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
