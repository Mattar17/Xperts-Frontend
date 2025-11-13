import { useState } from "react";
import "./index.css";
import Navbar from "./Navbar";
import Posts from "./Posts";
import WritePost from "./WritePost";

function App() {
  const [isWritingPost, setIsWritingPost] = useState(false);

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
        <WritePost closeWritingPost={handleCloseWritingPost} />
      ) : null}
      <Posts />
    </div>
  );
}

export default App;
