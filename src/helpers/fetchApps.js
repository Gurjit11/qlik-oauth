// src/helpers/fetchApps.js

/**
 * Fetches all Qlik Cloud apps via the Items API, handling cursor-based pagination.
 *
 * @param {string} token - OAuth 2.0 access token.
 * @returns {Promise<Array>} - Promise resolving to an array of app items.
 */
export async function fetchAllApps(token) {
  const tenantUrl = import.meta.env.VITE_TENANT_URI;
  let url = `${tenantUrl}/api/v1/items?resourceType=app&limit=100`;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const allApps = [];

  // Loop through pages until no `next` link is provided
  while (url) {
    const response = await fetch(url, { method: "GET", headers });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch apps: ${response.status} ${response.statusText}`
      );
    }
    const result = await response.json();
    allApps.push(...result.data);
    url = result.links?.next?.href;
  }

  return allApps;
}
