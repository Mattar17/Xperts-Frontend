import React, { useState } from "react";
import { ThumbsUp, MessageSquare, CircleUserRound } from "lucide-react";
import CommentsSection from "./CommentsSection";
import styles from "./Post.module.css";

export default function Post({ postDetails, index = 0, id }) {
  // Hardcoded values for likes & comments as requested
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

  const authorName = postDetails.author?.name || "Elara Vance";
  const authorHandle = postDetails.author?.username
    ? `@${postDetails.author.username}`
    : `@${authorName.replace(/\s+/g, "")}`;

  return (
    <article id={id} className={styles.card}>
      {/* Header: Category Badge & Stacked Date/Time */}
      <div className={styles.headerRow}>
        <div className={styles.categoryBadge}>{category}</div>
        <div className={styles.timestamp}>
          <div>{formattedDate}</div>
          <div>{formattedTime}</div>
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

      {/* Post Content */}
      <div className={styles.contentArea}>
        <h2 className={styles.title}>{postDetails.title}</h2>
        <p className={styles.body}>{postDetails.content}</p>
      </div>

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
