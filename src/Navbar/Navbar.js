import SearchBar from "./SearchBar";
import UserSpace from "./UserSpace";
import { NavLink } from "react-router";
import { useEffect } from "react";

export default function Navbar({ isWritingPost }) {
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify({ pfp_url: "" }));
  }, []);
  return (
    <nav
      className="
    h-[56px] sm:h-[64px] lg:h-[70px]
    px-4 sm:px-6 lg:px-[50px]
    w-screen
    flex justify-between items-center
  "
    >
      <SearchBar />

      {document.cookie === "" ? (
        <NavLink
          className="
        py-1 sm:py-[5px]
        px-4 sm:px-[20px]
        mr-2 sm:mr-3
        rounded-2xl
        bg-white text-black
        text-sm sm:text-base
        tracking-wide
      "
          onClick={() => console.log("cookies:", document.cookie)}
          to="/login"
        >
          Login
        </NavLink>
      ) : (
        <div
          className="
        flex items-center
        gap-2 sm:gap-8
      "
        >
          <UserSpace isWritingPost={isWritingPost} />
        </div>
      )}
    </nav>
  );
}
