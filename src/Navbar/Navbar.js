import SearchBar from "./SearchBar";
import UserSpace from "./UserSpace";
import { NavLink } from "react-router";

export default function Navbar({ isWritingPost }) {
  return (
    <nav className="h-[70px] px-[50px] w-full flex justify-between items-center">
      <SearchBar />
      {document.cookie === "" ? (
        <NavLink
          className="py-[5px] px-[20px] mr-3 rounded-2xl bg-white text-black tracking-wide"
          onClick={() => console.log("cookies:", document.cookie)}
          to="/login"
        >
          Login
        </NavLink>
      ) : (
        <div className="user-center--icons flex items-center">
          <UserSpace isWritingPost={isWritingPost} />
        </div>
      )}
    </nav>
  );
}
