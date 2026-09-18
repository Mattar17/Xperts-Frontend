import { useEffect, useState, useRef } from "react";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";
import { getPosts } from "../api/posts";

export default function Posts({ posts, setPosts }) {
  const [isLoading, setIsLoading] = useState(posts.length === 0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const fetchedPage = useRef(new Set());
  const scrollIntoIndex = useRef(0);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      if (ignore) return;
      if (page === 1) {
        setIsLoading(true);
      } else {
        setLoadingMore(true);
      }

      if (fetchedPage.current.has(page)) {
        setIsLoading(false);
        setLoadingMore(false);
        return;
      }
      fetchedPage.current.add(page);

      try {
        const data = await getPosts({ page });
        const newPosts = data?.posts;
        if (newPosts && newPosts.length > 0) {
          setPosts((current) => {
            scrollIntoIndex.current = current.length;
            return [...current, ...newPosts];
          });
          setTimeout(() => {
            const el = document.getElementById(`post-${scrollIntoIndex.current}`);
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 0);
        }
      } catch (err) {
        console.error("Failed to load posts:", err);
      } finally {
        if (!ignore) {
          setIsLoading(false);
          setLoadingMore(false);
        }
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [page, setPosts]);

  const handleSetPage = function () {
    setPage((p) => p + 1);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts((current) =>
      current.map((p) =>
        (p._id && updatedPost._id && p._id === updatedPost._id) ||
        (p.id && updatedPost.id && p.id === updatedPost.id)
          ? { ...p, ...updatedPost }
          : p
      )
    );
  };

  const handlePostDeleted = (deletedPostId) => {
    setPosts((current) =>
      current.filter((p) => (p._id || p.id) !== deletedPostId)
    );
  };

  return (
    <div className="w-full">
      {/* Initial load skeletons */}
      {isLoading && posts.length === 0 && (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}

      {/* Render loaded posts */}
      {posts.map((post, i) => (
        <Post
          id={`post-${i}`}
          key={post._id || i}
          postDetails={post}
          index={i}
          onPostUpdated={handlePostUpdated}
          onPostDeleted={handlePostDeleted}
        />
      ))}

      {/* Loading more skeleton */}
      {loadingMore && <PostSkeleton />}

      {/* Empty state when loading finished and no posts exist */}
      {!isLoading && posts.length === 0 && (
        <div className="bg-white rounded-2xl p-8 text-center text-gray-500 shadow-sm mb-6">
          <p className="font-semibold text-gray-700">No posts yet</p>
          <p className="text-sm mt-1 text-gray-400">
            Be the first to share something!
          </p>
        </div>
      )}

      {posts.length > 0 && (
        <button
          onClick={handleSetPage}
          disabled={loadingMore}
          className="mx-auto my-6 flex items-center justify-center gap-1 text-sm font-semibold text-[#981316] hover:underline disabled:opacity-50"
        >
          <span>Load More Posts</span>
          <span className="text-lg leading-none">&#129171;</span>
        </button>
      )}
    </div>
  );
}
