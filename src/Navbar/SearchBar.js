import { NavLink } from "react-router-dom";
import SearchInput from "./SearchInput";

export default function SearchBar() {
  return (
    <div className="flex justify-between left-[20px] items-center">
      <NavLink to="/">
        <img
          className="sm:w-[135px] sm:h-[150%] w-[90px] h-[100%]"
          src="https://res.cloudinary.com/dus5jhwhc/image/upload/v1763025555/Xperts_Logo__1_ey70sd.png"
          alt="Logo"
        ></img>
      </NavLink>
      <SearchInput className="search_input" />
    </div>
  );
}
