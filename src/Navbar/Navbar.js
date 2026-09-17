import SearchBar from "./SearchBar";
import UserSpace from "./UserSpace";

export default function Navbar({ isWritingPost }) {
  return (
    <nav
      className="
    h-[56px] sm:h-[64px] lg:h-[70px]
    px-4 sm:px-6 lg:px-[50px]
    flex justify-between items-center
    w-full
  "
    >
      <SearchBar />

      <div
        className="
        flex items-center
        gap-3 sm:gap-6
      "
      >
        <UserSpace isWritingPost={isWritingPost} />
      </div>
    </nav>
  );
}
