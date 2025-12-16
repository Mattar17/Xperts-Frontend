import { useEffect, useState, useRef } from "react";
import { MoonLoader } from "react-spinners";
import Post from "./Post";

export default function Posts({ posts, setPosts }) {
  const [isLoading, setIsLoading] = useState(false);
  const [LoadingMore, setLoadingMore] = useState(false);
  const [Page, setPage] = useState(1);
  const fetchedPage = useRef(new Set());
  const scrollIntoIndex = useRef(0);

  const api_url = process.env.REACT_APP_API_URL;

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      if (ignore) return;
      setIsLoading(true);
      if (Page > 1) setLoadingMore(true);
      if (fetchedPage.current.has(Page)) return;
      fetchedPage.current.add(Page);

      const response = await fetch(`${api_url}/api/posts?page=${Page}`);
      const { posts } = await response.json();
      if (!posts) return;
      setPosts((current) => {
        scrollIntoIndex.current = current.length;
        return [...current, ...posts];
      });
      setTimeout(() => {
        const el = document.getElementById(`post-${scrollIntoIndex.current}`);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        console.log("tried to scroll");
      }, 0);
      setIsLoading(false);
      setLoadingMore(false);
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [Page, api_url]);

  const handleSetPage = function () {
    setPage((page) => page + 1);
  };

  return (
    <div className="relative mt-[40px]">
      {isLoading && <MoonLoader className="mx-auto" color="#981316" />}
      {posts?.map((post, i) => (
        <Post id={`post-${i}`} key={post._id} postDetails={post} />
      ))}

      {LoadingMore && <MoonLoader className="mx-auto" color="#981316" />}
      <button
        onClick={handleSetPage}
        className="relative mx-auto flex justify-center items-center"
      >
        <span>Load More Posts</span>
        <span className="text-xl mt-[13px] ml-[2px]">&#129171;</span>
      </button>
    </div>
  );
}
