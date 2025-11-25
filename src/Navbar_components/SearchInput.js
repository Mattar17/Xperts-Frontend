import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import SearchResult from "./SearchResult";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  //https://xperts-api.vercel.app/api/user?name=${query}

  const handleSetQuery = (e) => {
    console.log(e.target);
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query === "") return;
    let flag = true;
    fetch(`https://xperts-api.vercel.app/api/user?name=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (flag) {
          setSearchResults(data.data);
          console.log(data);
        }
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      console.log(searchResults);
    }, 0);
    return () => {
      flag = false;
    };
  }, [query]);

  return (
    <div className="flex flex-col gap-1 pl-[18px]">
      <div className="flex items-center justify-center">
        <Search className="z-50 relative" size={16} />
        <input
          value={query}
          onChange={(e) => handleSetQuery(e)}
          type="text"
          placeholder="Search something"
          className="relative left-[-16px] text-center w-[250px] focus:outline-none rounded-lg bg-slate-100 placeholder:text-gray-400 placeholder:text-sm placeholder:italic"
        ></input>
      </div>
      {query === "" ? null : (
        <div className="bg-slate-100 w-[250px] absolute top-[50px] z-50 rounded-lg">
          {searchResults?.map((r) => (
            <SearchResult key={r._id} result={r} />
          ))}
        </div>
      )}
    </div>
  );
}
