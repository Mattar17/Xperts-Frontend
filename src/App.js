import { useState } from "react";
import "./index.css";
import Navbar from "./Navbar/Navbar";
import Posts from "./Posts/Posts";
import WritePost from "./Posts/WritePost";

function App() {
  const [isWritingPost, setIsWritingPost] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleOpenWritingPost = () => {
    setIsWritingPost(true);
  };

  const handleCloseWritingPost = () => {
    setIsWritingPost(false);
  };

  return (
    <div className="App">
      <Navbar isWritingPost={handleOpenWritingPost} />
      {isWritingPost ? (
        <WritePost
          setPosts={setPosts}
          closeWritingPost={handleCloseWritingPost}
        />
      ) : null}
      <Posts posts={posts} setPosts={setPosts} />
    </div>
  );
}

export default App;
