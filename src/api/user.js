import { apiClient } from "./client";

/**
 * View user profile by ID.
 *
 * @param {string} id - User ID.
 * @returns {Promise<{ status: string, data?: Object, message?: string }>}
 */
export async function getUserProfile(id) {
  return apiClient.get(`/api/user/profile/${id}`);
}

/**
 * Search users by name prefix.
 *
 * @param {string} name - Search query.
 * @returns {Promise<{ status: string, data?: Array, message?: string }>}
 */
export async function searchUsers(name) {
  return apiClient.get("/api/user", { params: { name } });
}

/**
 * Update user information (name, bio).
 *
 * @param {Object} info - { name, bio }
 * @param {string} [token] - Optional explicit JWT token.
 * @returns {Promise<{ status: string, data?: Object, message?: string }>}
 */
export async function updateUserInfo(info, token) {
  return apiClient.patch("/api/user/update_user", info, { token });
}

/**
 * Upload and set a new profile picture.
 * Accepts a File/Blob instance or a prepared FormData instance.
 *
 * @param {File|Blob|FormData} picture - Image file or FormData.
 * @param {string} [token] - Optional explicit JWT token.
 * @returns {Promise<{ status: string, data?: string, message?: string }>}
 */
export async function setProfilePicture(picture, token) {
  let body = picture;
  if (typeof FormData !== "undefined" && !(picture instanceof FormData)) {
    const formData = new FormData();
    formData.append("picture", picture);
    body = formData;
  }
  return apiClient.patch("/api/user/set-profile-picture", body, { token });
}

/**
 * Reset user password with verification code.
 *
 * @param {Object} payload - { code, newPassword }
 * @param {string} [token] - Optional explicit JWT token.
 * @returns {Promise<{ status: string, message: string }>}
 */
export async function resetPassword(payload, token) {
  return apiClient.patch("/api/user/reset-password", payload, { token });
}

/**
 * Apply to become an expert.
 * Accepts either a FormData instance directly or an object/params with files and category.
 *
 * @param {FormData|{ documents: File[], category: string }} applicationData
 * @param {string} [token] - Optional explicit JWT token.
 * @returns {Promise<{ status: string, documents?: Array, message?: string }>}
 */
export async function applyAsExpert(applicationData, token) {
  let body = applicationData;
  if (typeof FormData !== "undefined" && !(applicationData instanceof FormData)) {
    const formData = new FormData();
    if (applicationData.category) {
      formData.append("category", applicationData.category);
    }
    if (Array.isArray(applicationData.documents)) {
      applicationData.documents.forEach((doc) => {
        formData.append("documents", doc);
      });
    }
    body = formData;
  }
  return apiClient.post("/api/user/expert-application", body, { token });
}

const userApi = {
  getUserProfile,
  searchUsers,
  updateUserInfo,
  setProfilePicture,
  resetPassword,
  applyAsExpert,
};

export default userApi;

