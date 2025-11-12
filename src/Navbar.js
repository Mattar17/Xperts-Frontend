import SearchBar from "./Navbar_components/SearchBar";
import UserSpace from "./Navbar_components/UserSpace";

export default function Navbar() {
  return (
    <nav className="absolute h-[70px] w-full flex justify-between items-center">
      <SearchBar />
      <div className="user-center--icons flex items-center">
        <UserSpace />
      </div>
    </nav>
  );
}
