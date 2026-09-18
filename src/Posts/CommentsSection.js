import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  CircleUserRound,
  Trash2,
  Send,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { ClipLoader } from "react-spinners";
import { getComments, createComment, deleteComment } from "../api/comments";
import { sendVerificationCode, verifyEmail } from "../api/auth";
import { useUserStore } from "../store";
import styles from "./Comments.module.css";

const MOCK_COMMENTS = {
  "mock-1": [
    {
      _id: "mock-c1",
      text: "Great insights on engineering workflows! Looking forward to the next update.",
      creationDate: "2026-09-17T16:20:00",
      author: {
        _id: "user-sarah",
        name: "Dr. Sarah Jenkins",
        username: "sarahj",
        pfp_url:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
      },
    },
    {
      _id: "mock-c2",
      text: "Completely agree with this perspective. Well explained!",
      creationDate: "2026-09-17T17:45:00",
      author: {
        _id: "user-alex",
        name: "Alex Rivers",
        username: "arivers",
        pfp_url:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
      },
    },
  ],
  "mock-2": [
    {
      _id: "mock-c3",
      text: "Excited to see the new platform updates rolling out!",
      creationDate: "2026-05-12T10:15:00",
      author: {
        _id: "user-omar",
        name: "Omar Khaled",
        username: "omarkh",
        pfp_url:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
      },
    },
  ],
};

function formatCommentDate(dateStr) {
  if (!dateStr) return "Just now";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Recently";
  return `${date.toLocaleDateString("en-GB")} ${date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

export default function CommentsSection({
  postId,
  onCommentAdded,
  onCommentDeleted,
  onCommentsLoaded,
}) {
  const { user, markEmailVerified } = useUserStore();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Verification flow state
  const [needsVerification, setNeedsVerification] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState("");

  // Determine authentication and current user details
  const token = Cookies.get("token");
  let decodedToken = null;
  if (token) {
    try {
      decodedToken = jwtDecode(token);
    } catch {
      decodedToken = null;
    }
  }

  const isAuthenticated = Boolean(token || user);
  const currentUserId = user?._id || decodedToken?._id;
  const userEmail = user?.email || decodedToken?.email || "";

  // Check email verification status
  const checkEmailVerified = useCallback(() => {
    if (!isAuthenticated) return false;
    if (needsVerification) return false;

    // Check explicitly on user object
    if (user?.isVerified !== undefined) return Boolean(user.isVerified);
    if (user?.is_verified !== undefined) return Boolean(user.is_verified);
    if (user?.emailVerified !== undefined) return Boolean(user.emailVerified);
    if (user?.verified !== undefined) return Boolean(user.verified);

    // Check decoded token
    if (decodedToken?.isVerified !== undefined) return Boolean(decodedToken.isVerified);
    if (decodedToken?.is_verified !== undefined) return Boolean(decodedToken.is_verified);
    if (decodedToken?.emailVerified !== undefined) return Boolean(decodedToken.emailVerified);
    if (decodedToken?.verified !== undefined) return Boolean(decodedToken.verified);

    // Default to true if no flag is set, but if backend returns 403/verification error, we catch it
    return true;
  }, [isAuthenticated, needsVerification, user, decodedToken]);

  const isEmailVerified = checkEmailVerified();

  // Fetch comments on mount
  useEffect(() => {
    let ignore = false;
    async function fetchCommentsList() {
      setIsLoading(true);
      try {
        const res = await getComments(postId);
        if (ignore) return;

        let list = [];
        if (Array.isArray(res)) {
          list = res;
        } else if (res && Array.isArray(res.data)) {
          list = res.data;
        } else if (res && Array.isArray(res.comments)) {
          list = res.comments;
        } else if (MOCK_COMMENTS[postId]) {
          list = MOCK_COMMENTS[postId];
        }
        console.log(list)
        setComments(list);
        if (onCommentsLoaded) {
          onCommentsLoaded(list.length);
        }
      } catch (err) {
        if (ignore) return;
        console.warn("Could not load comments from API, using fallback:", err);
        const fallback = MOCK_COMMENTS[postId] || [];
        setComments(fallback);
        if (onCommentsLoaded) {
          onCommentsLoaded(fallback.length);
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    fetchCommentsList();
    return () => {
      ignore = true;
    };
  }, [postId, onCommentsLoaded]);

  // Request verification code
  const handleRequestVerificationCode = async () => {
    setIsSendingCode(true);
    setVerificationError("");
    setVerificationSuccess("");
    try {
      const res = await sendVerificationCode();
      if (res?.status === "error") {
        setVerificationError(res.message || "Failed to send verification code.");
      } else {
        setCodeSent(true);
        setVerificationSuccess("Verification code sent to your email!");
      }
    } catch (err) {
      setVerificationError(err.message || "Error sending code. Please try again.");
    } finally {
      setIsSendingCode(false);
    }
  };

  // Submit verification code
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    if (!verificationCode.trim()) return;

    setIsVerifyingCode(true);
    setVerificationError("");
    try {
      const res = await verifyEmail(verificationCode.trim());
      if (res?.status === "success") {
        markEmailVerified?.();
        setNeedsVerification(false);
        setVerificationSuccess("Email verified successfully! You can now comment.");
      } else {
        setVerificationError(res?.message || "Invalid or expired verification code.");
      }
    } catch (err) {
      setVerificationError(err.message || "Verification failed. Please try again.");
    } finally {
      setIsVerifyingCode(false);
    }
  };

  // Submit comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const trimmed = commentText.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await createComment(postId, { text: trimmed });

      // Handle verification error response from backend
      if (
        res?.status === "error" &&
        (res.message?.toLowerCase().includes("verif") ||
          res.message?.toLowerCase().includes("email"))
      ) {
        setNeedsVerification(true);
        setErrorMessage(res.message);
        setIsSubmitting(false);
        return;
      }

      if (res?.status === "error") {
        setErrorMessage(res.message || "Failed to post comment. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Successful comment from API or mock fallback
      const newComment = res?.data || res || {
        _id: `comment-${Date.now()}`,
        text: trimmed,
        creationDate: new Date().toISOString(),
        author: {
          _id: currentUserId,
          name: user?.name || "Anonymous User",
          username: user?.username || "user",
          pfp_url: user?.pfp_url,
        },
      };

      setComments((prev) => [...prev, newComment]);
      setCommentText("");
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (err) {
      // In mock environment or network failure, add comment optimistically
      const optimisticComment = {
        _id: `comment-${Date.now()}`,
        text: trimmed,
        creationDate: new Date().toISOString(),
        author: {
          _id: currentUserId,
          name: user?.name || "Anonymous User",
          username: user?.username || "user",
          pfp_url: user?.pfp_url,
        },
      };
      setComments((prev) => [...prev, optimisticComment]);
      setCommentText("");
      if (onCommentAdded) {
        onCommentAdded();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      await deleteComment(postId, commentId);
    } catch (err) {
      console.warn("API delete failed, removing locally:", err);
    }

    setComments((prev) => prev.filter((c) => (c._id || c.id) !== commentId));
    if (onCommentDeleted) {
      onCommentDeleted();
    }
  };

  return (
    <div className={styles.commentsContainer}>
      <h3 className={styles.commentsTitle}>Comments ({comments.length})</h3>

      {/* Loading state */}
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <ClipLoader size={24} color="#981316" />
        </div>
      ) : comments.length === 0 ? (
        <div className={styles.emptyState}>
          No comments yet. Be the first to share your thoughts!
        </div>
      ) : (
        <div className={styles.commentsList}>
          {comments.map((comment, index) => {
            const commentId = comment._id || comment.id || index;
            const author = comment.author || comment.user || {};
            const isAuthor =
              currentUserId &&
              author._id &&
              String(author._id) === String(currentUserId);

            return (
              <div key={commentId} className={styles.commentItem}>
                {author.pfp_url ? (
                  <img
                    src={author.pfp_url}
                    alt={author.name || "User"}
                    className={styles.avatar}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <CircleUserRound size={22} />
                  </div>
                )}

                <div className={styles.commentBody}>
                  <div className={styles.commentHeader}>
                    <div className={styles.authorMeta}>
                      <span className={styles.authorName}>
                        {author.name || "Anonymous User"}
                      </span>
                      {author.username && (
                        <span className={styles.authorHandle}>
                          @{author.username}
                        </span>
                      )}
                      <span className={styles.commentDate}>
                        &bull; {formatCommentDate(comment.creationDate || comment.createdAt)}
                      </span>
                    </div>

                    {isAuthor && (
                      <button
                        type="button"
                        onClick={() => handleDeleteComment(commentId)}
                        className={styles.deleteBtn}
                        title="Delete comment"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>

                  <p className={styles.commentContent}>
                    {comment.text || comment.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Authorization & Comment Input Area */}
      {!isAuthenticated ? (
        /* Unauthenticated visitor */
        <div className={styles.authPrompt}>
          <span className={styles.authPromptText}>
            Log in or sign up to join the conversation and post a comment.
          </span>
          <div className={styles.authPromptActions}>
            <NavLink to="/login" className={styles.authLinkLogin}>
              Log In
            </NavLink>
            <NavLink to="/register" className={styles.authLinkRegister}>
              Sign Up
            </NavLink>
          </div>
        </div>
      ) : !isEmailVerified ? (
        /* Authenticated but email NOT verified */
        <div className={styles.unverifiedBanner}>
          <div className={styles.unverifiedHeader}>
            <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className={styles.unverifiedText}>
                <strong>Email verification required:</strong> You must verify
                your email address ({userEmail || "your account email"}) before
                you can write comments.
              </p>

              {!codeSent ? (
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={handleRequestVerificationCode}
                    disabled={isSendingCode}
                    className={styles.verifyBtn}
                  >
                    {isSendingCode ? (
                      <ClipLoader size={14} color="#FFFFFF" />
                    ) : (
                      "Send Verification Code"
                    )}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleVerifyEmail}
                  className={styles.verifyCodeSection}
                >
                  <div className={styles.verifyInputRow}>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="6-digit code"
                      maxLength={6}
                      className={styles.verifyInput}
                      required
                    />
                    <button
                      type="submit"
                      disabled={isVerifyingCode}
                      className={styles.verifyBtn}
                    >
                      {isVerifyingCode ? (
                        <ClipLoader size={14} color="#FFFFFF" />
                      ) : (
                        "Verify"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleRequestVerificationCode}
                      disabled={isSendingCode}
                      className={styles.resendBtn}
                    >
                      Resend
                    </button>
                  </div>
                </form>
              )}

              {verificationError && (
                <div className={styles.feedbackError}>{verificationError}</div>
              )}
              {verificationSuccess && (
                <div className={styles.feedbackSuccess}>
                  <CheckCircle2 size={14} className="inline mr-1" />
                  {verificationSuccess}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Authenticated and email verified */
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmitComment}>
            <div className={styles.inputRow}>
              {user?.pfp_url ? (
                <img
                  src={user.pfp_url}
                  alt={user.name || "You"}
                  className={styles.avatar}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  <CircleUserRound size={22} />
                </div>
              )}

              <div className={styles.inputWrapper}>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  rows={2}
                  className={styles.textarea}
                  disabled={isSubmitting}
                  required
                />

                {errorMessage && (
                  <div className={styles.feedbackError}>{errorMessage}</div>
                )}

                <div className={styles.actionsRow}>
                  <button
                    type="submit"
                    disabled={isSubmitting || !commentText.trim()}
                    className={styles.submitBtn}
                  >
                    {isSubmitting ? (
                      <ClipLoader size={14} color="#FFFFFF" />
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Comment</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

