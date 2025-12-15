import { useEffect, useState, useRef } from "react";
import { MoonLoader } from "react-spinners";
import Post from "./Post";

export default function Posts({ posts, setPosts }) {
  const [isLoading, setIsLoading] = useState(true);
  const [Page, setPage] = useState(1);
  const fetchedPage = useRef(new Set());

  const api_url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      if (fetchedPage.current.has(Page)) return;
      fetchedPage.current.add(Page);

      const response = await fetch(`${api_url}/api/posts?page=${Page}`);
      const { posts } = await response.json();
      if (!posts) return;
      setPosts((current) => {
        const combined = [...current, ...posts];
        const firstIndex = current.length;

        setTimeout(() => {
          const el = document.getElementById(`post-${firstIndex}`);
          el?.scrollIntoView(true);
        }, 0);

        return combined;
      });
      setIsLoading(false);
    }

    fetchData();
  }, [Page]);

  const handleSetPage = function () {
    setPage((page) => page + 1);
  };

  return (
    <div className="relative mt-[40px]">
      {isLoading ? (
        <MoonLoader className="mx-auto" color="#981316" />
      ) : (
        posts?.map((post, i) => (
          <Post id={`post-${i}`} key={post._id} postDetails={post} />
        ))
      )}

      {isLoading && Page > 1 ? (
        <MoonLoader className="mx-auto" color="#981316" />
      ) : (
        <button
          onClick={handleSetPage}
          className="relative mx-auto flex justify-center items-center"
        >
          <span>Load More Posts</span>
          <span className="text-xl mt-[13px] ml-[2px]">&#129171;</span>
        </button>
      )}
    </div>
  );
}
