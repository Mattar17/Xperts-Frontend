import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import SearchResult from "./SearchResult";
import { searchUsers } from "../api/user";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const handleSetQuery = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query === "") {
      setSearchResults(null);
      return;
    }
    let flag = true;
    searchUsers(query)
      .then((data) => {
        if (flag) {
          setSearchResults(data.data);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      flag = false;
    };
  }, [query]);

  return (
    <div className="flex flex-col gap-1 pl-2 sm:pl-4 relative">
      <div className="flex items-center bg-white rounded-xl px-3 py-1.5 gap-2 shadow-sm w-[170px] sm:w-[220px]">
        <Search size={16} className="text-gray-400 shrink-0" />
        <input
          value={query}
          onChange={handleSetQuery}
          type="text"
          placeholder="Search something"
          className="bg-transparent outline-none text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 placeholder:italic w-full"
        />
      </div>

      {searchResults && query !== "" && (
        <div
          className="
        bg-white
        w-[180px] sm:w-[220px] md:w-[250px]
        absolute
        top-[42px]
        z-50
        rounded-lg
        shadow-lg
        p-1
        border border-gray-100
      "
        >
          {searchResults.map((r) => (
            <SearchResult key={r._id} result={r} />
          ))}
        </div>
      )}
    </div>
  );
}
