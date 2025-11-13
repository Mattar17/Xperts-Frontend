import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative flex justify-between left-[20px]">
      <img
        className="w-[135px] h-[150%]"
        src="https://res.cloudinary.com/dus5jhwhc/image/upload/v1763025555/Xperts_Logo__1_ey70sd.png"
        alt="Logo"
      ></img>
      <div className="flex items-center justify-center">
        <Search className="relative left-[17px] z-50" size={16} />
        <input
          type="text"
          placeholder="Search something"
          className="py-[3px] px-[20px] w-[250px] focus:outline-none rounded-lg bg-slate-100 placeholder:text-gray-400 placeholder:text-sm placeholder:italic"
        ></input>
      </div>
    </div>
  );
}
