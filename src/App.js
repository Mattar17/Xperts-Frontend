import { useState } from "react";
import "./index.css";
import Navbar from "./Navbar/Navbar";
import Posts from "./Posts/Posts";
import WritePost from "./Posts/WritePost";
import LeftSidebar from "./Sidebar/LeftSidebar";
import RightSidebar from "./Sidebar/RightSidebar";
import styles from "./App.module.css";

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
    <div className={styles.pageWrapper}>
      <Navbar isWritingPost={handleOpenWritingPost} />

      <main className={styles.mainLayout}>
        <div className={styles.leftColumn}>
          <LeftSidebar />
        </div>

        <div className={styles.centerColumn}>
          {isWritingPost ? (
            <WritePost
              setPosts={setPosts}
              closeWritingPost={handleCloseWritingPost}
            />
          ) : null}
          <Posts posts={posts} setPosts={setPosts} />
        </div>

        <div className={styles.rightColumn}>
          <RightSidebar />
        </div>
      </main>
    </div>
  );
}

export default App;
