import { useEffect, useState, useRef } from "react";
import { MoonLoader } from "react-spinners";
import Post from "./Post";
import { TEST_BASE_URL, DEV_BASE_URL } from "../Gobal";

export default function Posts() {
  const [Posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Page, setPage] = useState(1);
  const fetchedPage = useRef(new Set());

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      if (fetchedPage.current.has(Page)) return;
      fetchedPage.current.add(Page);

      const response = await fetch(`${DEV_BASE_URL}/api/posts?page=${Page}`);
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
      {isLoading && fetchedPage.length ? (
        <MoonLoader className="mx-auto" color="#981316" />
      ) : (
        Posts?.map((post, i) => (
          <Post id={`post-${i}`} key={post._id} postDetails={post} />
        ))
      )}

      {isLoading ? (
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
