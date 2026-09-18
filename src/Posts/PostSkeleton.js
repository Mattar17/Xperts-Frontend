import React from "react";
import styles from "./Post.module.css";

export default function PostSkeleton() {
  return (
    <article className={`${styles.card} animate-pulse`}>
      {/* Header: Category Badge & Stacked Date/Time */}
      <div className={styles.headerRow}>
        <div className="h-6 w-28 bg-gray-200 rounded-full"></div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="h-3 w-16 bg-gray-200 rounded"></div>
          <div className="h-3 w-12 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Author Section */}
      <div className={styles.authorRow}>
        <div className="w-11 h-11 rounded-full bg-gray-200 shrink-0"></div>
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-3 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Post Content */}
      <div className={styles.contentArea}>
        <div className="h-5 w-3/4 bg-gray-200 rounded mb-3"></div>
        <div className="space-y-2">
          <div className="h-3.5 w-full bg-gray-200 rounded"></div>
          <div className="h-3.5 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-3.5 w-2/3 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 pt-3.5 border-t border-gray-100">
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
        <div className="h-4 w-1.5 bg-gray-200 rounded"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>
    </article>
  );
}

