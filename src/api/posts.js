import { apiClient } from "./client";

/**
 * Fetch a paginated list of posts with optional category filter.
 *
 * @param {Object} [params] - Query options.
 * @param {number} [params.page=1] - Page number.
 * @param {string} [params.filter] - Optional category filter.
 * @returns {Promise<{ status: string, posts?: Array, message?: string }>}
 */
export async function getPosts({ page = 1, filter } = {}) {
  const params = { page };
  if (filter) params.filter = filter;
  return apiClient.get("/api/posts", { params });
}

/**
 * Create a new post.
 * Requires authenticated and verified user.
 *
 * @param {Object} postData - { title, content, category, ... }
 * @param {string} [token] - Optional explicit JWT token.
 * @returns {Promise<{ status: string, data?: Object, message?: string }>}
 */
export async function createPost(postData, token) {
  return apiClient.post("/api/posts", postData, { token });
}

/**
 * Update an existing post by ID.
 *
 * @param {string} id - Post ID.
 * @param {Object} postData - Updated post fields.
 * @param {string} [token] - Optional explicit JWT token.
 * @returns {Promise<{ status: string, data?: Object, message?: string }>}
 */
export async function updatePost(id, postData, token) {
  return apiClient.patch(`/api/posts/${id}`, postData, { token });
}

/**
 * Delete a post by ID.
 *
 * @param {string} id - Post ID.
 * @param {string} [token] - Optional explicit JWT token.
 * @returns {Promise<{ status: string, message?: string }>}
 */
export async function deletePost(id, token) {
  return apiClient.delete(`/api/posts/${id}`, { token });
}

const postsApi = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};

export default postsApi;

