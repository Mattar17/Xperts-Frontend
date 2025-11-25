import SearchInput from "./SearchInput";

export default function SearchBar() {
  return (
    <div className="flex justify-between left-[20px] items-center">
      <img
        className="w-[135px] h-[150%]"
        src="https://res.cloudinary.com/dus5jhwhc/image/upload/v1763025555/Xperts_Logo__1_ey70sd.png"
        alt="Logo"
      ></img>
      <SearchInput />
    </div>
  );
}
