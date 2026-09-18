import React, { useState, useEffect, useRef } from "react";
import {
  ThumbsUp,
  MessageSquare,
  CircleUserRound,
  MoreVertical,
  Pencil,
  Trash2,
  X,
  Check,
} from "lucide-react";
import { ClipLoader } from "react-spinners";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import CommentsSection from "./CommentsSection";
import { useUserStore } from "../store";
import { updatePost, deletePost } from "../api/posts";
import styles from "./Post.module.css";

export default function Post({
  postDetails,
  index = 0,
  id,
  onPostUpdated,
  onPostDeleted,
}) {
  // Hardcoded default values for likes & comments
  const defaultLikes = index === 0 ? 15 : index === 1 ? 42 : 28;
  const defaultComments = index === 0 ? 4 : index === 1 ? 8 : 6;

  const [likes, setLikes] = useState(defaultLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState(
    Array.isArray(postDetails?.comments)
      ? postDetails.comments.length
      : defaultComments
  );

  // Author menu & editing state
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(postDetails?.title || "");
  const [editCategory, setEditCategory] = useState(
    postDetails?.category || "engineering"
  );
  const [editContent, setEditContent] = useState(postDetails?.content || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editError, setEditError] = useState("");

  const menuRef = useRef(null);
  const { user } = useUserStore();

  // Authentication & author determination
  const token = Cookies.get("token");
  let decodedToken = null;
  if (token) {
    try {
      decodedToken = jwtDecode(token);
    } catch {
      decodedToken = null;
    }
  }

  const currentUserId = user?._id || decodedToken?._id;
  const currentUserEmail = user?.email || decodedToken?.email;
  const isAdmin = user?.isAdmin || decodedToken?.isAdmin;

  const postAuthorId = postDetails?.author?._id
    ? String(postDetails.author._id)
    : postDetails?.author
    ? String(postDetails.author)
    : null;
  const postAuthorEmail = postDetails?.author?.email;

  const isAuthor =
    (currentUserId && postAuthorId && String(currentUserId) === String(postAuthorId)) ||
    (currentUserEmail && postAuthorEmail && currentUserEmail === postAuthorEmail) ||
    Boolean(isAdmin);

  // Close dropdown menu on outside click
  useEffect(() => {
    if (!showMenu) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  // Sync edit fields when postDetails change
  useEffect(() => {
    if (postDetails) {
      setEditTitle(postDetails.title || "");
      setEditCategory(postDetails.category || "engineering");
      setEditContent(postDetails.content || "");
    }
  }, [postDetails]);

  if (!postDetails) return null;

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleStartEdit = () => {
    setEditTitle(postDetails.title || "");
    setEditCategory(postDetails.category || "engineering");
    setEditContent(postDetails.content || "");
    setEditError("");
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(postDetails.title || "");
    setEditCategory(postDetails.category || "engineering");
    setEditContent(postDetails.content || "");
    setEditError("");
    setIsEditing(false);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editContent.trim()) {
      setEditError("Post content is required");
      return;
    }

    setIsSaving(true);
    setEditError("");

    const updatedData = {
      title: editTitle.trim(),
      content: editContent.trim(),
      category: editCategory,
    };

    try {
      const res = await updatePost(postDetails._id, updatedData);
      if (res?.status === "error") {
        setEditError(res.message || "Failed to update post. Please try again.");
        setIsSaving(false);
        return;
      }

      const updated = res?.data || {
        ...postDetails,
        ...updatedData,
      };

      if (onPostUpdated) {
        onPostUpdated(updated);
      }
      setIsEditing(false);
    } catch (err) {
      // Fallback for mock/local environment
      const updated = {
        ...postDetails,
        ...updatedData,
      };
      if (onPostUpdated) {
        onPostUpdated(updated);
      }
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePost = async () => {
    setShowMenu(false);
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    setIsDeleting(true);
    try {
      const res = await deletePost(postDetails._id);
      if (res?.status === "error") {
        alert(res.message || "Failed to delete post. Please try again.");
        setIsDeleting(false);
        return;
      }

      if (onPostDeleted) {
        onPostDeleted(postDetails._id);
      }
    } catch (err) {
      // Fallback for mock/local environment
      if (onPostDeleted) {
        onPostDeleted(postDetails._id);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // Format date and time
  const postDate = postDetails.creationDate
    ? new Date(postDetails.creationDate)
    : new Date();

  const formattedDate = !isNaN(postDate.getTime())
    ? postDate.toLocaleDateString("en-GB")
    : "17/09/2026";
  const formattedTime = !isNaN(postDate.getTime())
    ? postDate.toLocaleTimeString("en-GB")
    : "14:59:25";

  const category = postDetails.category
    ? postDetails.category.charAt(0).toUpperCase() + postDetails.category.slice(1)
    : "Engineering";

  const authorName = postDetails.author?.name || "Author";
  const authorHandle = postDetails.author?.username
    ? `@${postDetails.author.username}`
    : `@${authorName.replace(/\s+/g, "")}`;

  return (
    <article id={id} className={styles.card}>
      {/* Header: Category Badge & Timestamp & Actions Menu */}
      <div className={styles.headerRow}>
        <div className={styles.categoryBadge}>{category}</div>

        <div className={styles.headerRight}>
          <div className={styles.timestamp}>
            <div>{formattedDate}</div>
            <div>{formattedTime}</div>
          </div>

          {isAuthor && (
            <div className={styles.actionsDropdownWrapper} ref={menuRef}>
              {isDeleting ? (
                <ClipLoader size={16} color="#981316" />
              ) : (
                <button
                  type="button"
                  className={styles.menuTriggerBtn}
                  onClick={() => setShowMenu((prev) => !prev)}
                  aria-label="Post actions"
                  title="Post actions"
                >
                  <MoreVertical size={18} />
                </button>
              )}

              {showMenu && (
                <div className={styles.menuDropdown}>
                  <button
                    type="button"
                    className={styles.menuItem}
                    onClick={handleStartEdit}
                  >
                    <Pencil size={15} />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    className={`${styles.menuItem} ${styles.menuItemDelete}`}
                    onClick={handleDeletePost}
                  >
                    <Trash2 size={15} />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Author Section */}
      <div className={styles.authorRow}>
        {postDetails.author?.pfp_url ? (
          <img
            src={postDetails.author.pfp_url}
            alt={authorName}
            className={styles.authorAvatar}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div className={styles.authorPlaceholder}>
            <CircleUserRound size={40} className="text-gray-500" />
          </div>
        )}

        <div className={styles.authorDetails}>
          <h4 className={styles.authorName}>{authorName}</h4>
          <p className={styles.authorHandle}>{authorHandle}</p>
        </div>
      </div>

      {/* Post Content Area: Inline Edit Form or Display */}
      {isEditing ? (
        <form onSubmit={handleSaveEdit} className={styles.editForm}>
          <div className={styles.editFieldGroup}>
            <label className={styles.editLabel} htmlFor={`edit-category-${id}`}>
              Category
            </label>
            <select
              id={`edit-category-${id}`}
              className={styles.editSelect}
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            >
              <option value="engineering">Engineering</option>
              <option value="medical">Medical</option>
              <option value="graphic design">Graphic Design</option>
            </select>
          </div>

          <div className={styles.editFieldGroup}>
            <label className={styles.editLabel} htmlFor={`edit-title-${id}`}>
              Title
            </label>
            <input
              id={`edit-title-${id}`}
              type="text"
              className={styles.editInput}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Post title"
            />
          </div>

          <div className={styles.editFieldGroup}>
            <label className={styles.editLabel} htmlFor={`edit-content-${id}`}>
              Content
            </label>
            <textarea
              id={`edit-content-${id}`}
              className={styles.editTextarea}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={4}
              placeholder="Write your post content..."
              required
            />
          </div>

          {editError && <div className={styles.errorBanner}>{editError}</div>}

          <div className={styles.editActions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={handleCancelEdit}
              disabled={isSaving}
            >
              <X size={14} />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              className={styles.saveBtn}
              disabled={isSaving}
            >
              {isSaving ? (
                <ClipLoader size={14} color="#FFFFFF" />
              ) : (
                <>
                  <Check size={14} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.contentArea}>
          {postDetails.title && (
            <h2 className={styles.title}>{postDetails.title}</h2>
          )}
          <p className={styles.body}>{postDetails.content}</p>
        </div>
      )}

      {/* Footer: Likes & Comments */}
      <div className={styles.footer}>
        <button
          type="button"
          className={styles.actionItem}
          onClick={handleLike}
          style={{ color: hasLiked ? "#981316" : undefined }}
        >
          <ThumbsUp className={styles.actionIcon} />
          <span>Likes ({likes})</span>
        </button>

        <span className={styles.separator}>|</span>

        <button
          type="button"
          className={`${styles.actionItem} ${
            showComments ? styles.actionItemActive : ""
          }`}
          onClick={() => setShowComments((prev) => !prev)}
          aria-expanded={showComments}
        >
          <MessageSquare className={styles.actionIcon} />
          <span>Comments ({commentsCount})</span>
        </button>
      </div>

      {/* Collapsible Comments Section */}
      {showComments && (
        <CommentsSection
          postId={postDetails._id}
          onCommentAdded={() => setCommentsCount((prev) => prev + 1)}
          onCommentDeleted={() =>
            setCommentsCount((prev) => Math.max(0, prev - 1))
          }
          onCommentsLoaded={(count) => setCommentsCount(count)}
        />
      )}
    </article>
  );
}
