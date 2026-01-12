import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import SearchResult from "./SearchResult";
import styles from "./Navbar.module.css";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  //https://xperts-api.vercel.app/api/user?name=${query}

  const handleSetQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleOpenSearch = () => {
    setSearchOpen(!searchOpen);
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
    <div className="flex flex-col gap-1 pl-2 sm:pl-[18px] relative">
      <div className="flex items-center justify-center">
        <button onClick={handleOpenSearch} className={`${styles.search}`}>
          <Search
            className="z-50 relative left-1 text-white md:text-black"
            size={18}
          />
        </button>
        {searchOpen && (
          <div className="">
            <input
              value={query}
              onChange={(e) => handleSetQuery(e)}
              type="text"
              className=" relative left-[-14px]
                          top-8  
                          text-center
                          w-[180px]
                          py-1
                          focus:outline-none
                          rounded-lg
                          bg-slate-100
                          placeholder:text-gray-400
                          placeholder:text-xs
                          placeholder:italic"
            />
          </div>
        )}

        <input
          value={query}
          onChange={(e) => handleSetQuery(e)}
          type="text"
          placeholder="Search something"
          className={`
        ${styles.search_input}
        relative left-[-14px]
        text-center
        w-[180px]
        py-1
        focus:outline-none
        rounded-lg
        bg-slate-100
        placeholder:text-gray-400
        placeholder:text-xs
        placeholder:italic
      `}
        />
      </div>

      {!searchResults || query === "" ? null : (
        <div
          className="
        bg-slate-100
        w-[180px] sm:w-[220px] md:w-[250px]
        absolute
        top-[65px] sm:top-[50px]
        z-50
        rounded-lg
        p-1
      "
        >
          {searchResults?.map((r) => (
            <SearchResult key={r._id} result={r} />
          ))}
        </div>
      )}
    </div>
  );
}
