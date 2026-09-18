import SearchBar from "./SearchBar";
import UserSpace from "./UserSpace";
import styles from "./Navbar.module.css";

export default function Navbar({ isWritingPost, fluid = false }) {
  return (
    <nav className={styles.navbar}>
      <div className={fluid ? styles.navContainerFluid : styles.navContainer}>
        <SearchBar />

        <div className="flex items-center gap-3 sm:gap-6">
          <UserSpace isWritingPost={isWritingPost} />
        </div>
      </div>
    </nav>
  );
}
