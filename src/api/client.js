import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

/**
 * Builds a full URL with optional query parameters.
 *
 * @param {string} endpoint - Relative or absolute endpoint path.
 * @param {Object} [params] - Key-value map of query parameters.
 * @returns {string} Fully resolved URL.
 */
function buildUrl(endpoint, params) {
  const isAbsolute = endpoint.startsWith("http://") || endpoint.startsWith("https://");
  const base = isAbsolute ? "" : API_BASE_URL.replace(/\/+$/, "");
  const path = isAbsolute ? endpoint : `/${endpoint.replace(/^\/+/, "")}`;
  const url = new URL(isAbsolute ? path : `${base}${path}`);

  if (params && typeof params === "object") {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, value);
      }
    });
  }

  return url.toString();
}

/**
 * Centralized fetch wrapper for making API calls.
 * Automatically injects API key and auth token (Bearer) when present.
 *
 * @param {string} endpoint - API path (e.g. '/api/posts').
 * @param {Object} [options] - Fetch configuration options.
 * @param {Object} [options.params] - URL search params.
 * @param {string} [options.token] - Explicit auth token (defaults to Cookies 'token').
 * @param {any} [options.body] - Request body (object, string, or FormData).
 * @returns {Promise<any>} Parsed JSON response.
 */
export async function request(endpoint, options = {}) {
  const {
    params,
    headers: customHeaders = {},
    body,
    token: explicitToken,
    ...customOptions
  } = options;

  const url = buildUrl(endpoint, params);
  const token = explicitToken || Cookies.get("token");
  const apiKey = process.env.REACT_APP_API_KEY;

  const headers = { ...customHeaders };

  if (apiKey && !headers["x-api-key"]) {
    headers["x-api-key"] = apiKey;
  }

  if (token && !headers["Authorization"] && !headers["authorization"]) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  if (!isFormData && !headers["Content-Type"] && !headers["content-type"]) {
    headers["Content-Type"] = "application/json";
  }

  let formattedBody = body;
  if (body && !isFormData && typeof body !== "string") {
    formattedBody = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, {
      ...customOptions,
      headers,
      body: formattedBody,
    });

    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }
    }

    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message || "Network error occurred",
    };
  }
}

export const apiClient = {
  get: (endpoint, options = {}) => request(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options = {}) => request(endpoint, { ...options, method: "POST", body }),
  patch: (endpoint, body, options = {}) => request(endpoint, { ...options, method: "PATCH", body }),
  put: (endpoint, body, options = {}) => request(endpoint, { ...options, method: "PUT", body }),
  delete: (endpoint, options = {}) => request(endpoint, { ...options, method: "DELETE" }),
};

export default apiClient;

