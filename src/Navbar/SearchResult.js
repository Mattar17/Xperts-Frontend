import { CircleUser } from "lucide-react";
function SearchResult({ result }) {
  return (
    <div className="flex items-center justify-evenly gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition">
      {result.pfp_url ? (
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={result.pfp_url}
          alt="User Profile"
          width="10px"
        ></img>
      ) : (
        <CircleUser />
      )}
      <a href="#">{result.name}</a>
    </div>
  );
}

export default SearchResult;
