import { useState } from "react";
import "./index.css";
import Navbar from "./Navbar";
import Posts from "./Posts_components/Posts";
import WritePost from "./Posts_components/WritePost";

function App() {
  const [isWritingPost, setIsWritingPost] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleOpenWritingPost = () => {
    setIsWritingPost(true);
  };

  const handleCloseWritingPost = () => {
    setIsWritingPost(false);
  };

  const handleSetPosts = (newPost) => {
    setPosts((current) => [newPost, ...current]);
    setIsWritingPost(false);
  };

  return (
    <div className="App">
      <Navbar isWritingPost={handleOpenWritingPost} />
      {isWritingPost ? (
        <WritePost
          setPosts={handleSetPosts}
          closeWritingPost={handleCloseWritingPost}
        />
      ) : null}
      <Posts posts={posts} setPosts={setPosts} />
    </div>
  );
}

export default App;
