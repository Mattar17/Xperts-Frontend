import { useEffect, useState, useRef } from "react";
import { MoonLoader } from "react-spinners";
import Post from "./Post";
import { getPosts } from "../api/posts";

const fallbackPosts = [
  {
    _id: "mock-1",
    category: "Engineering",
    creationDate: "2026-09-17T14:59:25",
    author: {
      name: "User",
      username: "Xperts_user",
      pfp_url:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
    },
    title: "Helllo",
    content: "1898394398 , Lorem It's 3.0",
  },
  {
    _id: "mock-2",
    category: "Engineering",
    creationDate: "2026-05-11T22:31:42",
    author: {
      name: "mattar",
      username: "mattar",
      pfp_url:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=80",
    },
    title: "First Post after update",
    content: "Hallllloosoe, Lorem ipsum dolom sit amet, conse.",
  },
];

export default function Posts({ posts, setPosts }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const fetchedPage = useRef(new Set());
  const scrollIntoIndex = useRef(0);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      if (ignore) return;
      setIsLoading(true);
      if (page > 1) setLoadingMore(true);
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
        setIsLoading(false);
        setLoadingMore(false);
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

  const displayPosts = posts && posts.length > 0 ? posts : fallbackPosts;

  return (
    <div className="w-full">
      {isLoading && (
        <div className="py-4">
          <MoonLoader className="mx-auto" color="#981316" size={32} />
        </div>
      )}

      {displayPosts.map((post, i) => (
        <Post
          id={`post-${i}`}
          key={post._id || i}
          postDetails={post}
          index={i}
        />
      ))}

      {loadingMore && (
        <div className="py-4">
          <MoonLoader className="mx-auto" color="#981316" size={28} />
        </div>
      )}

      <button
        onClick={handleSetPage}
        className="mx-auto my-6 flex items-center justify-center gap-1 text-sm font-semibold text-[#981316] hover:underline"
      >
        <span>Load More Posts</span>
        <span className="text-lg leading-none">&#129171;</span>
      </button>
    </div>
  );
}
