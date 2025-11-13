import SearchBar from "./Navbar_components/SearchBar";
import UserSpace from "./Navbar_components/UserSpace";

export default function Navbar({ isWritingPost }) {
  return (
    <nav className="h-[70px] w-full flex justify-between items-center">
      <SearchBar />
      <div className="user-center--icons flex items-center">
        <UserSpace isWritingPost={isWritingPost} />
      </div>
    </nav>
  );
}
