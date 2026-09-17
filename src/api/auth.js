import { apiClient } from "./client";

/**
 * Log in a user.
 *
 * @param {Object} credentials - { email, password }
 * @returns {Promise<{ status: string, token?: string, message?: string }>}
 */
export async function login(credentials) {
  return apiClient.post("/api/auth/login", credentials);
}

/**
 * Register a new user account.
 *
 * @param {Object} userData - { name, email, password, ... }
 * @returns {Promise<{ status: string, data?: Object, message?: string }>}
 */
export async function register(userData) {
  return apiClient.post("/api/auth/register", userData);
}

/**
 * Send an email verification code to the authenticated user.
 *
 * @param {string} [token] - Optional explicit JWT token (defaults to cookie).
 * @returns {Promise<{ status: string, message: string }>}
 */
export async function sendVerificationCode(token) {
  return apiClient.post("/api/auth/send-verification-code", null, { token });
}

/**
 * Verify user email using the received verification code.
 *
 * @param {string} code - The 6-digit verification code.
 * @param {string} [token] - Optional explicit JWT token (defaults to cookie).
 * @returns {Promise<{ status: string, message: string }>}
 */
export async function verifyEmail(code, token) {
  return apiClient.patch("/api/auth/verify-email", { code }, { token });
}

const authApi = {
  login,
  register,
  sendVerificationCode,
  verifyEmail,
};

export default authApi;

