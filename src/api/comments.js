import { apiClient } from "./client";

/**
 * Helper to normalize comment payload to an object { text: "..." }.
 *
 * @param {string|Object} data
 * @returns {Object}
 */
function normalizeCommentData(data) {
  if (typeof data === "string") {
    return { text: data };
  }
  return data;
}

/**
 * Fetch all comments for a specific post.
 *
 * @param {string} postId - Post ID.
 * @returns {Promise<{ status: string, data?: Array, message?: string }>}
 */
export async function getComments(postId) {
  return apiClient.get(`/api/posts/${postId}/comments`);
}

/**
 * Add a comment to a post.
 * Only post author or experts matching the post category can comment.
 *
 * @param {string} postId - Post ID.
 * @param {string|{ text: string }} commentData - Comment text or object.
 * @param {string} [token] - Optional explicit JWT token.
 * @returns {Promise<{ status: string, data?: Object, message?: string }>}
 */
export async function createComment(postId, commentData, token) {
  const body = normalizeCommentData(commentData);
  return apiClient.post(`/api/posts/${postId}/comments`, body, { token });
}

/**
 * Update an existing comment on a post.
 *
 * @param {string} postId - Post ID.
 * @param {string} commentId - Comment ID.
 * @param {string|{ text: string }} commentData - Updated comment text or object.
 * @param {string} [token] - Optional explicit JWT token.
 * @returns {Promise<{ status: string, message: string }>}
 */
export async function updateComment(postId, commentId, commentData, token) {
  const body = normalizeCommentData(commentData);
  return apiClient.patch(
    `/api/posts/${postId}/comments/${commentId}`,
    body,
    { token }
  );
}

/**
 * Delete a comment from a post.
 *
 * @param {string} postId - Post ID.
 * @param {string} commentId - Comment ID.
 * @param {string} [token] - Optional explicit JWT token.
 * @returns {Promise<{ status: string, message: string }>}
 */
export async function deleteComment(postId, commentId, token) {
  return apiClient.delete(`/api/posts/${postId}/comments/${commentId}`, { token });
}

const commentsApi = {
  getComments,
  createComment,
  updateComment,
  deleteComment,
};

export default commentsApi;

